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
    addOrder ({ dispatch, commit }, order) {
      // TODO: add validation
      orders.push({
        type: order.type,
        table: order.table,
        name: order.name,
        phone: order.phone,
        items: order.items,
        state: 'placed',
        payment: '',
        createdAt: firebase.database.ServerValue.TIMESTAMP
      }, () => {
        console.log('Order Added')
      })
    },
    updateOrder ({ dispatch, commit }, order) {
      // TODO: add validation
      orders.child(order['.key']).update({
        type: order.type,
        table: order.table,
        name: order.name,
        phone: order.phone,
        items: order.items,
        state: order.state,
        payment: order.payment
      }, () => {
        console.log('Order Updated')
      })
    },
    removeOrder ({ dispatch, commit }, order) {
      // TODO: add validation
      orders.child(order['.key']).remove(() => {
        console.log('Order Removed')
      })
    }
  },
  getters: {}
}
