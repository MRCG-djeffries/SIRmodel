<template>
  <Transition
    enter-active-class="transition-translate duration-300 ease-in-out"
    leave-active-class="transition-translate duration-300 ease-in-out"
    enter-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <slot />
  </Transition>
</template>

<script>
export default {
  name: 'SlidingPanel',
}
</script>
