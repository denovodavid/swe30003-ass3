<template>
<div>
  <menu-bar/>
  <h1>Menu Page</h1>
  <h2>Items</h2>
  <div>
    <label>Name:</label>
    <input type="text" v-model.trim="item.name">
  </div>
  <div>
    <label>Price:</label>
    <input type="number" v-model.number="item.price">
  </div>
  <div>
    <label>Description:</label>
    <input type="text" v-model.trim="item.description">
  </div>
  <button @click="addItem">Add Item</button>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item['.key']">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.description }}</td>
        <td><button @click="editItem(item)">Edit</button></td>
        <td><button @click="$store.dispatch('menu/removeItem', item)">Remove</button></td>
      </tr>
    </tbody>
  </table>
  <h2>Menus</h2>
  <div>
    <label>Name:</label>
    <input type="text" v-model.trim="menu.name">
  </div>
  <div>
    <label>Items:</label>
    <select multiple v-model="menu.items">
      <option
        v-for="item in items"
        :key="item['.key']"
        :value="item['.key']"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
  <div>
    <label>Description:</label>
    <input type="text" v-model.trim="menu.description">
  </div>
  <button @click="addMenu">Add Menu</button>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Items</th>
        <th>Description</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="menu in menus" :key="menu['.key']">
        <td>{{ menu.name }}</td>
        <td>{{ menu.items.length }} Items</td>
        <td>{{ menu.description }}</td>
        <td><button @click="editMenu(menu)">Edit</button></td>
        <td><button @click="$store.dispatch('menu/removeMenu', menu)">Remove</button></td>
      </tr>
    </tbody>
  </table>

  <modal
    title="Edit Item"
    :open="editableItemOpen"
    @close="editableItemOpen = false"
  >
    <div>
      <label>Name:</label>
      <input type="text" v-model.trim="editableItem.name">
    </div>
    <div>
      <label>Price:</label>
      <input type="number" v-model.number="editableItem.price">
    </div>
    <div>
      <label>Description:</label>
      <input type="text" v-model.trim="editableItem.description">
    </div>
    <button @click="updateItem">Save</button>
  </modal>

  <modal
    title="Edit Menu"
    :open="editableMenuOpen"
    @close="editableMenuOpen = false"
  >
    <div>
      <label>Name:</label>
      <input type="text" v-model.trim="editableMenu.name">
    </div>
    <div>
      <label>Items:</label>
      <select multiple v-model="editableMenu.items">
        <option
          v-for="item in items"
          :key="item['.key']"
          :value="item['.key']"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <div>
      <label>Description:</label>
      <input type="text" v-model.trim="editableMenu.description">
    </div>
    <button @click="updateMenu">Save</button>
  </modal>

</div>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from '@/components/MenuBar'
import Modal from '@/components/Modal'
import clone from 'lodash/clone'

class Item {
  constructor (
    name = '',
    price = 0,
    description = ''
  ) {
    this.name = name
    this.price = price
    this.description = description
  }
}

class Menu {
  constructor (
    name = '',
    items = [],
    description = ''
  ) {
    this.name = name
    this.items = items
    this.description = description
  }
}

export default {
  name: 'menu-page',
  components: {
    MenuBar,
    Modal
  },
  data () {
    return {
      item: new Item(),
      editableItemOpen: false,
      editableItem: {
        '.key': '',
        ...new Item()
      },
      menu: new Menu(),
      editableMenuOpen: false,
      editableMenu: {
        '.key': '',
        ...new Menu()
      }
    }
  },
  computed: {
    ...mapState('menu', [
      'items',
      'menus'
    ])
  },
  methods: {
    async addItem () {
      // TODO: handle error
      await this.$store.dispatch('menu/addItem', this.item)
      this.clearItem()
    },
    editItem (item) {
      this.editableItem = clone(item)
      this.editableItemOpen = true
    },
    async updateItem () {
      // TODO: handle error
      await this.$store.dispatch('menu/updateItem', this.editableItem)
      this.editableItemOpen = false
    },
    clearItem () {
      this.item = new Item()
    },
    async addMenu () {
      // TODO: handle error
      await this.$store.dispatch('menu/addMenu', this.menu)
      this.clearMenu()
    },
    editMenu (menu) {
      this.editableMenu = clone(menu)
      this.editableMenuOpen = true
    },
    async updateMenu () {
      // TODO: handle error
      await this.$store.dispatch('menu/updateMenu', this.editableMenu)
      this.editableMenuOpen = false
    },
    clearMenu () {
      this.menu = new Menu()
    }
  }
}
</script>

<style scoped>

</style>
