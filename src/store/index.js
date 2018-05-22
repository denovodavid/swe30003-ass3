import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import menu from './menu'
import order from './order'

Vue.use(Vuex)

export const options = {
  modules: {
    menu,
    order
  },
  mutations: {
    ...firebaseMutations
  },
  strict: process.env.NODE_ENV !== 'production'
}

const store = new Vuex.Store(options)

if (module.hot) {
  module.hot.accept([
    './menu',
    './order'
  ], () => {
    store.hotUpdate({
      modules: {
        menu: require('./menu').default,
        order: require('./order').default
      }
    })
  })
}

export default store
