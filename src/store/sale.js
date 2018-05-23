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
      if (
        sale.type.trim() === '' ||
        sale.price <= 0 ||
        sale.items.length <= 0
      ) {
        throw new Error('Invalid Sale')
      }
      const { key } = await sales.push({
        type: sale.type,
        price: sale.price,
        items: sale.items,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      return key
    },
    async removeSale ({ dispatch, commit }, sale) {
      if (sale['.key'].trim() === '') {
        throw new Error('Invalid Sale')
      }
      await sales.child(sale['.key']).remove()
    }
  },
  getters: {}
}
