<template>
  <header
    class="flex items-center justify-between bg-gradient-to-b from-mrcblue-400 to-mrcblue-500 p-4 text-white lg:px-8"
  >
    <BaseButton
      class="-ml-2 w-auto border-none p-2 sm:w-40"
      title="Toggle menu"
      @click="$emit('toggle-sidebar')"
    >
      <SvgBars class="h-8 w-8 fill-current" />
      <div class="hidden sm:block">
        <div v-if="isSidebarOpen" class="ml-2 font-light">Hide settings</div>
        <div v-else class="ml-2 text-sm font-light">Show settings</div>
      </div>
    </BaseButton>

    <h1 class="grow text-center text-2xl">Simulation of SIR</h1>

    <div class="p-2 sm:w-40"></div>
  </header>
</template>

<script>
import SvgBars from '../components/icons/SvgBars.vue'

export default {
  name: 'TopHeader',
  components: {
    SvgBars,
  },
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
