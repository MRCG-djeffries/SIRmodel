<template>
  <button
    :id="id"
    :ref="buttonRef"
    class="flex w-full items-center rounded border p-3 font-semibold leading-none focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
    :class="buttonClass"
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    id: {
      type: String,
      default: null,
    },
    buttonClass: {
      type: String,
      default: null,
    },
    buttonRef: {
      type: String,
      default: null,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
