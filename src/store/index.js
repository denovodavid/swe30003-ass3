import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import menu from './menu'
import order from './order'
import reservation from './reservation'

Vue.use(Vuex)

export const options = {
  modules: {
    menu,
    order,
    reservation
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
    './order',
    './reservation'
  ], () => {
    store.hotUpdate({
      modules: {
        menu: require('./menu').default,
        order: require('./order').default,
        reservation: require('./reservation').default
      }
    })
  })
}

export default store
