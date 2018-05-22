import Vue from 'vue'
import Vuex from 'vuex'
// import moduleName from './moduleName'
import menu from './menu'

Vue.use(Vuex)

export const options = {
  modules: {
    menu
  },
  strict: process.env.NODE_ENV !== 'production'
}

const store = new Vuex.Store(options)

if (module.hot) {
  module.hot.accept([
    './menu'
  ], () => {
    store.hotUpdate({
      modules: {
        menu: require('./menu').default
      }
    })
  })
}

export default store
