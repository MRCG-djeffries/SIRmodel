import Vue from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'
import './index.css'

Vue.component('BaseButton', BaseButton)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
