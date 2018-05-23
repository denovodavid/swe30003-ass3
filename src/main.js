// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

sync(store, router)

Vue.filter('time', (timestamp) => {
  const ms = timestamp % 1000
  timestamp = (timestamp - ms) / 1000
  const secs = timestamp % 60
  timestamp = (timestamp - secs) / 60
  const mins = timestamp % 60

  const minsString = Math.abs(mins).toString().padStart(2, '0')
  const secsString = Math.abs(secs).toString().padStart(2, '0')

  return `${timestamp < 0 ? '-' : ''}${minsString}:${secsString}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.updateTimestamp()
    setInterval(this.updateTimestamp, 1000)
    this.$store.dispatch('menu/bindRefs')
    this.$store.dispatch('order/bindRefs')
    this.$store.dispatch('reservation/bindRefs')
    this.$store.dispatch('sale/bindRefs')
  },
  destroyed () {
    clearInterval(this.updateTimestamp)
  },
  methods: {
    updateTimestamp () {
      this.$store.commit('updateTimestamp')
    }
  }
})
