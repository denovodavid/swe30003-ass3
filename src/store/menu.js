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
    async addItem ({ dispatch, commit }, item) {
      if (
        item.name.trim() === '' ||
        item.price <= 0 ||
        item.description.trim() === ''
      ) {
        throw new Error('Invalid Item')
      }
      const { itemKey } = await items.push({
        name: item.name,
        price: item.price,
        description: item.description
      })
      return itemKey
    },
    async updateItem ({ dispatch, commit }, item) {
      if (
        item['.key'].trim() === '' ||
        item.name.trim() === '' ||
        item.price <= 0 ||
        item.description.trim() === ''
      ) {
        throw new Error('Invalid Item')
      }
      await items.child(item['.key']).update({
        name: item.name,
        price: item.price,
        description: item.description
      })
    },
    async removeItem ({ dispatch, commit }, item) {
      if (item['.key'].trim() === '') {
        throw new Error('Invalid Item')
      }
      await items.child(item['.key']).remove()
    },
    async addMenu ({ dispatch, commit }, menu) {
      if (
        menu.name.trim() === '' ||
        menu.items.length <= 0 ||
        menu.description.trim() === ''
      ) {
        throw new Error('Invalid Menu')
      }
      const { menuKey } = menus.push({
        name: menu.name,
        items: menu.items,
        description: menu.description
      })
      return menuKey
    },
    async updateMenu ({ dispatch, commit }, menu) {
      if (
        menu['.key'].trim() === '' ||
        menu.name.trim() === '' ||
        menu.items.length <= 0 ||
        menu.description.trim() === ''
      ) {
        throw new Error('Invalid Menu')
      }
      await menus.child(menu['.key']).update({
        name: menu.name,
        items: menu.items,
        description: menu.description
      })
    },
    async removeMenu ({ dispatch, commit }, menu) {
      if (menu['.key'].trim() === '') {
        throw new Error('Invalid Menu')
      }
      await menus.child(menu['.key']).remove()
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
