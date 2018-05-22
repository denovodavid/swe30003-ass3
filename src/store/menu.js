import { db } from '@/firebase'
import { firebaseAction } from 'vuexfire'

const items = db.ref('menuItems')
const menus = db.ref('menus')

export default {
  namespaced: true,
  state: {
    items: [],
    menus: []
  },
  mutations: {},
  actions: {
    bindRefs: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('menus', menus)
      bindFirebaseRef('items', items)
    }),
    addItem ({ dispatch, commit }, item) {
      // TODO: add validation
      items.push({
        name: item.name,
        price: item.price,
        description: item.description
      }, () => {
        console.log('Item Added')
      })
    },
    updateItem ({ dispatch, commit }, item) {
      // TODO: add validation
      items.child(item['.key']).update({
        name: item.name,
        price: item.price,
        description: item.description
      }, () => {
        console.log('Item Updated')
      })
    },
    removeItem ({ dispatch, commit }, item) {
      // TODO: add validation
      items.child(item['.key']).remove(() => {
        console.log('Item Removed')
      })
    },
    addMenu ({ dispatch, commit }, menu) {
      // TODO: add validation
      menus.push({
        name: menu.name,
        items: menu.items,
        description: menu.description
      }, () => {
        console.log('Menu Added')
      })
    },
    updateMenu ({ dispatch, commit }, menu) {
      // TODO: add validation
      menus.child(menu['.key']).update({
        name: menu.name,
        items: menu.items,
        description: menu.description
      }, () => {
        console.log('Menu Updated')
      })
    },
    removeMenu ({ dispatch, commit }, menu) {
      // TODO: add validation
      menus.child(menu['.key']).remove(() => {
        console.log('Menu Removed')
      })
    }
  },
  getters: {
    itemsInMenu: state => menu => {
      return state.items
        .filter(item => menu.items
          .map(menuItem => menuItem['.key'])
          .includes(item['.key'])
        )
    }
  }
}
