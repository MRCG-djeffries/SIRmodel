<template>
  <div>
    <div class="text-lg">
      <div>
        Python/JS app running in the
        <span class="text-red-700">BROWSER</span>
      </div>
      <div>Downloads Pyodide and python libraries scipy and matplotlib.</div>
      <div>This takes a few seconds, graph will appear when ready.</div>
    </div>

    <div class="mt-4">
      <img
        v-if="graphSrc"
        id="graph"
        class="rounded drop-shadow"
        :src="graphSrc"
        alt="Pyodide graph"
      />
      <SvgGraph
        v-else
        class="max-h-[460px] max-w-[640px] rounded bg-white drop-shadow"
      />
    </div>
  </div>
</template>

<script>
import SvgGraph from './icons/SvgGraph.vue'

export default {
  name: 'ShowGraph',
  components: { SvgGraph },
  props: {
    settings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      graphSrc: null,
      pyodide: null,
    }
  },
  watch: {
    settings: {
      handler() {
        this.getGraph()
      },
      deep: true,
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.pyodide = await this.getPyodide()
      await this.getGraph()
    },
    async getPyodide() {
      // eslint-disable-next-line no-undef
      let pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/',
      })

      await pyodide.loadPackage(['matplotlib', 'numpy', 'scipy', 'pandas'])

      return pyodide
    },
    async getGraph() {
      const { infectiousStart, infectiousContacts, recoveryPeriod } =
        this.settings

      await this.pyodide.runPython(`
import io
import base64
import pandas as pd
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# Save memory by closing any previously created figures
plt.close('all')

# Used for image binary
buffer = io.BytesIO()
def f(beta,recovery_T,state):
    #print(state)
    def deriv(state,t, N, beta, gamma):
        S, I, R, T = state
        # Change in S population over time
        dSdt = -beta * S * I / N
        # Change in I population over time
        dIdt = beta * S * I / N - gamma * I
        # Change in R population over time
        dRdt = gamma * I
        dT = beta * S * I / N
        return dSdt, dIdt, dRdt, dT

    effective_contact_rate = beta
    recovery_rate = 1/recovery_T

    # We'll compute this for fun
    # print("R0 is", effective_contact_rate / recovery_rate)

    # What's our start population look like?
    # Everyone not infected or recovered is susceptible
    total_pop = 1000
    recovered = state[2]
    infected = state[1]
    susceptible = total_pop - infected - recovered
    tot_infected=state[1]

    # A list of days, 0-160
    days = range(0, 160)

    # Use differential equations magic with our population
    ret = odeint(deriv,
                 [susceptible, infected, recovered,tot_infected],
                 days,
                 args=(total_pop, effective_contact_rate, recovery_rate))
    S, I, R, T = ret.T

    df = pd.DataFrame({
        'susceptible': S,
        'infected': I,
        'recovered': R,
        'tot_infected':T,
        'day': days
    })
    return df

# Create the figure and the line that we will manipulate
fig, ax = plt.subplots()
init_beta = ${infectiousContacts}
init_recovery = ${recoveryPeriod}
init_inf = ${infectiousStart}
init_state = [1000-init_inf,init_inf,0,init_inf]
df=f(init_beta,init_recovery,init_state)
line, = plt.plot(df['day'], df['infected'], lw=2,color="red",label="Infected")
line1,= plt.plot(df['day'], df['susceptible'], lw=2,color="blue",label="Susceptible")
line2,= plt.plot(df['day'], df['recovered'], lw=2,color="green",label="Recovered")
line3,= plt.plot(df['day'], df['tot_infected'], lw=2,color="cyan",label="Tot Infected")
plt.legend(loc="center right",facecolor="white")
ax.set_xlabel('Time [days]')
ax.set_ylim(0, 1000)
ax.set_title('R0=' + str(round(init_beta * init_recovery,2)))
plt.grid(True)
plt.savefig(buffer, format='png')
buffer.seek(0)
b64str = base64.b64encode(buffer.read()).decode('UTF-8')
decoded_image = 'data:image/png;base64,' + b64str`)

      this.graphSrc = await this.pyodide.globals.get('decoded_image')
    },
  },
}
</script>
