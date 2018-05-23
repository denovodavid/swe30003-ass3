import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import menu from './menu'
import order from './order'
import reservation from './reservation'
import sale from './sale'

Vue.use(Vuex)

export const options = {
  modules: {
    menu,
    order,
    reservation,
    sale
  },
  mutations: {
    updateTimestamp (state) {
      state.timestamp = +new Date()
    },
    ...firebaseMutations
  },
  state: {
    timestamp: null
  },
  getters: {
    timestamp (state) {
      return state.timestamp
    }
  },
  strict: process.env.NODE_ENV !== 'production'
}

const store = new Vuex.Store(options)

if (module.hot) {
  module.hot.accept([
    './menu',
    './order',
    './reservation',
    './sale'
  ], () => {
    store.hotUpdate({
      modules: {
        menu: require('./menu').default,
        order: require('./order').default,
        reservation: require('./reservation').default,
        sale: require('./sale').default
      }
    })
  })
}

export default store
