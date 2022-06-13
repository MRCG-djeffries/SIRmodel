<template>
  <div class="mb-10 w-full md:mb-12">
    <div class="flex items-center justify-between">
      <div>{{ name }}</div>
      <input
        ref="input"
        :aria-label="name"
        class="px-x ml-1 w-12 rounded bg-gray-700 py-0 text-center text-lg focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
        :disabled="disabled"
        type="text"
        :value="formattedValue"
        @blur="handleTypedInput"
        @keydown.up="adjustValue($event, step)"
        @keydown.down="adjustValue($event, -step)"
        @input="handleTypedInput"
      />
    </div>
    <div class="mt-1 flex justify-between text-sm text-gray-400">
      <div>{{ min }}</div>
      <div>{{ max }}</div>
    </div>

    <VueRangeSlider
      class="slider px-0"
      :disabled="disabled"
      :min="min"
      :max="max"
      :name="name"
      :step="step"
      :value="value"
      @change="$emit('change')"
      @input="$emit('input', $event)"
    />

    <div class="-mt-1 flex justify-between text-xs text-gray-400">
      <div v-for="scale in scales" :key="scale">{{ scale }}</div>
    </div>
  </div>
</template>

<script>
import VueRangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  name: 'RangeSlider',
  components: {
    VueRangeSlider,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    scaleSteps: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formattedValue() {
      return Math.round(this.value * 10) / 10
    },
    scales() {
      let scales = []
      const scaleDelta = this.max / this.scaleSteps

      for (let i = 0; i <= this.scaleSteps; i++) {
        let number = i * scaleDelta
        let rounded = Math.round(number * 10) / 10
        scales.push(rounded)
      }

      return scales
    },
  },
  methods: {
    handleTypedInput(event) {
      let value = +event.target.value.trim()

      if (Number.isNaN(value)) {
        this.$emit('reset-value')
        return
      }

      if (value > this.max) {
        value = this.max
      }

      if (value < this.min) {
        value = this.min
      }

      this.$refs.input.value = value.toString()
      this.$emit('input', value)
      this.$emit('change')
    },
    adjustValue(event, amount) {
      let value = +event.target.value

      value += amount
      if (value > this.max) {
        value = this.max
        this.$refs.input.value = value.toString()
      }

      if (value < this.min) {
        value = this.min
        this.$refs.input.value = value.toString()
      }

      this.$emit('input', value)
      this.$emit('change')
    },
  },
}
</script>

<style>
.slider {
  width: 100%;
}

.range-slider-rail {
  background-color: rgb(156 163 175); /* bg-gray-400; */
}
.range-slider-knob {
  background-color: rgb(209 213 219); /* bg-gray-300; */
  border: none;
}
.range-slider-fill {
  background-color: #21677e; /* bg-mrcblue */
}
</style>
