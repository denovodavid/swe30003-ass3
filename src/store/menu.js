import { db } from '@/firebase'
import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    menus: [],
    items: []
  },
  mutations: {},
  actions: {
    bindRefs: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('menus', db.ref('menus'))
      bindFirebaseRef('items', db.ref('menuItems'))
    })
  },
  getters: {}
}
