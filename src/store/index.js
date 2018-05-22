import Vue from 'vue'
import Vuex from 'vuex'
// import moduleName from './moduleName'

Vue.use(Vuex)

export const options = {
  modules: {
    // moduleName
  },
  strict: process.env.NODE_ENV !== 'production'
}

const store = new Vuex.Store(options)

if (module.hot) {
  module.hot.accept([
    // './moduleName'
  ], () => {
    store.hotUpdate({
      modules: {
        // moduleName: require('./moduleName').default
      }
    })
  })
}

export default store
