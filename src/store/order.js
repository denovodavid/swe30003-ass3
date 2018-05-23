import firebase from 'firebase/app'
import { db } from '@/firebase'
import { firebaseAction } from 'vuexfire'

const orders = db.ref('orders')

export default {
  namespaced: true,
  state: {
    orders: []
  },
  mutations: {},
  actions: {
    bindRefs: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('orders', orders)
    }),
    async addOrder ({ dispatch, commit }, order) {
      let invalid = false
      if (order.type === 'sitting') {
        if (
          order.table <= 0 ||
          order.items.length <= 0
        ) invalid = true
      } else if (order.type === 'takeaway') {
        if (
          order.name.trim() === '' ||
          order.phone.trim() === '' ||
          order.items.length <= 0
        ) invalid = true
      } else {
        invalid = true
      }
      if (invalid) throw new Error('Invalid Order')
      const { orderKey } = await orders.push({
        type: order.type,
        table: order.table,
        name: order.name,
        phone: order.phone,
        items: order.items,
        state: 'placed',
        payment: '',
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      return orderKey
    },
    async updateOrder ({ dispatch, commit }, order) {
      let invalid = false
      if (order['.key'].trim() === '') {
        invalid = true
      } else if (order.type === 'sitting') {
        if (
          order.table <= 0 ||
          order.items.length <= 0
        ) invalid = true
      } else if (order.type === 'takeaway') {
        if (
          order.name.trim() === '' ||
          order.phone.trim() === '' ||
          order.items.length <= 0
        ) invalid = true
      } else {
        invalid = true
      }
      if (invalid) throw new Error('Invalid Order')
      await orders.child(order['.key']).update({
        type: order.type,
        table: order.table,
        name: order.name,
        phone: order.phone,
        items: order.items,
        state: order.state,
        payment: order.payment
      })
    },
    async removeOrder ({ dispatch, commit }, order) {
      if (order['.key'].trim() === '') {
        throw new Error('Invalid Order')
      }
      orders.child(order['.key']).remove()
    }
  },
  getters: {
    activeOrders (state, getters, rootState, rootGetters) {
      return state.orders
        .filter(order => order.state !== 'served')
        .map(order => {
          order.timer = (order.createdAt + 20 * 60 * 1000) - rootGetters.timestamp
          order.overdue = order.state !== 'served' && order.timer <= 0
          return order
        })
        .sort((a, b) => a.timer > b.timer)
    },
    completedOrders (state) {
      return state.orders
        .filter(order => order.state === 'served')
        .sort((a, b) => a.createdAt < b.createdAt)
    }
  }
}
