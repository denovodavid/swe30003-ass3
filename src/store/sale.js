import firebase from 'firebase/app'
import { db } from '@/firebase'
import { firebaseAction } from 'vuexfire'

const sales = db.ref('sales')

export default {
  namespaced: true,
  state: {
    sales: []
  },
  mutations: {},
  actions: {
    bindRefs: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('sales', sales)
    }),
    async addSale ({ dispatch, commit }, sale) {
      // TODO: add validation
      const { key } = await sales.push({
        type: sale.type,
        price: sale.price,
        items: sale.items,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      console.log('Sale Added')
      return key
    },
    removeSale ({ dispatch, commit }, sale) {
      // TODO: add validation
      sales.child(sale['.key']).remove(() => {
        console.log('Sale Removed')
      })
    }
  },
  getters: {}
}
