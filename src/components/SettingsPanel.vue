<template>
  <div class="flex flex-col bg-gray-800 p-4 text-gray-200 lg:p-8">
    <RangeSlider
      ref="infectiousStart"
      v-model="infectiousStart"
      :min="0"
      :max="1000"
      name="Infectious start value:"
      :scale-steps="5"
      :step="10"
      @change="$emit('change')"
      @input="updateSettings"
      @reset-value="resetValue('infectiousStart')"
    />

    <RangeSlider
      ref="infectiousContacts"
      v-model="infectiousContacts"
      :min="0"
      :max="1"
      name="Infectious contacts per day:"
      :scale-steps="10"
      :step="0.1"
      @change="$emit('change')"
      @input="updateSettings"
      @reset-value="resetValue('infectiousContacts')"
    />

    <RangeSlider
      ref="recoveryPeriod"
      v-model="recoveryPeriod"
      :min="0"
      :max="30"
      name="Recovery period (days):"
      :scale-steps="6"
      :step="1"
      @change="$emit('change')"
      @input="updateSettings"
      @reset-value="resetValue('recoveryPeriod')"
    />

    <BaseButton
      v-if="isSmallScreen"
      class="mb-4 justify-center bg-gray-200 text-gray-800 active:border-mrcblue-500 active:bg-mrcblue active:text-mrcblue-50"
      @click="$emit('toggle-sidebar')"
    >
      <SvgChart class="mr-2 inline-block h-5 w-5 fill-current" />
      <div>Show Graph</div>
    </BaseButton>

    <BaseButton
      class="justify-center border-gray-500 bg-gray-800 text-gray-300 active:bg-mrcblue"
      @click="$emit('reset')"
    >
      <SvgReset class="mr-2 inline-block h-5 w-5 fill-current" />
      <div>Reset</div>
    </BaseButton>
  </div>
</template>

<script>
import RangeSlider from './RangeSlider.vue'
import SvgChart from './icons/SvgChart.vue'
import SvgReset from './icons/SvgReset.vue'

export default {
  name: 'SettingsPanel',
  components: {
    SvgChart,
    SvgReset,
    RangeSlider,
  },
  props: {
    isSmallScreen: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      required: true,
      validator(value) {
        return (
          typeof value.infectiousStart === 'number' &&
          typeof value.infectiousContacts === 'number' &&
          typeof value.recoveryPeriod === 'number'
        )
      },
    },
  },
  data() {
    return {
      infectiousStart: +this.value.infectiousStart,
      infectiousContacts: +this.value.infectiousContacts,
      recoveryPeriod: +this.value.recoveryPeriod,
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.infectiousStart = +newValue.infectiousStart
        this.infectiousContacts = +newValue.infectiousContacts
        this.recoveryPeriod = +newValue.recoveryPeriod
      },
      deep: true,
    },
  },
  methods: {
    formattedValue(value) {
      return Math.round(value * 10) / 10
    },
    resetValue(name) {
      this[name] = this.value[name]
      this.$refs[name].$refs.input.value = this.value[name]
    },
    updateSettings() {
      const settings = {
        infectiousStart: this.infectiousStart,
        infectiousContacts: this.infectiousContacts,
        recoveryPeriod: this.recoveryPeriod,
      }

      this.$emit('input', settings)
    },
  },
}
</script>
