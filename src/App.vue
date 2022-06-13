<template>
  <div id="app" class="flex h-screen flex-col text-gray-900">
    <TopHeader
      :is-sidebar-open="isSidebarOpen"
      @toggle-sidebar="toggleSidebar"
    />

    <div class="flex grow">
      <SlidingPanel>
        <SettingsPanel
          v-if="isSidebarOpen"
          v-model="sliderSettings"
          class="w-full sm:w-80"
          :is-small-screen="isSmallScreen"
          @change="updateGraph"
          @reset="reset"
          @toggle-sidebar="toggleSidebar"
        />
      </SlidingPanel>

      <ShowGraph
        ref="mainApp"
        class="grow bg-gray-100 p-4 lg:p-8"
        :class="{ 'hidden sm:block': isSidebarOpen }"
        :settings="graphSettings"
      />
    </div>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import SlidingPanel from './components/SlidingPanel.vue'
import ShowGraph from './components/ShowGraph.vue'

const initialSettings = {
  infectiousStart: 1,
  infectiousContacts: 0.3,
  recoveryPeriod: 10,
}

export default {
  components: { SettingsPanel, SlidingPanel, ShowGraph, TopHeader },
  data() {
    return {
      isSidebarOpen: true,
      graphSettings: {
        ...initialSettings,
      },
      sliderSettings: {
        ...initialSettings,
      },
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth <= 640
    },
  },
  watch: {
    windowWidth: {
      handler(newWidth) {
        this.isSidebarOpen = newWidth >= 640
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    reset() {
      this.sliderSettings = { ...initialSettings }
      this.graphSettings = { ...initialSettings }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    updateGraph() {
      this.graphSettings = { ...this.sliderSettings }
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>
