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

export default {
  name: 'menu-page',
  components: {
    MenuBar,
    Modal
  },
  data () {
    return {
      item: {
        name: '',
        price: 0,
        description: ''
      },
      editableItemOpen: false,
      editableItem: {
        '.key': '',
        name: '',
        price: 0,
        description: ''
      },
      menu: {
        name: '',
        items: [],
        description: ''
      },
      editableMenuOpen: false,
      editableMenu: {
        '.key': '',
        name: '',
        items: [],
        description: ''
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
      try {
        await this.$store.dispatch('menu/addItem', this.item)
        this.clearItem()
      } catch (error) {
        console.error(error)
      }
    },
    editItem (item) {
      this.editableItem['.key'] = item['.key']
      this.editableItem.name = item.name
      this.editableItem.price = item.price
      this.editableItem.description = item.description
      this.editableItemOpen = true
    },
    async updateItem () {
      try {
        await this.$store.dispatch('menu/updateItem', this.editableItem)
        this.editableItemOpen = false
      } catch (error) {
        console.error(error)
      }
    },
    clearItem () {
      this.item.name = ''
      this.item.price = 0
      this.item.description = ''
    },
    async addMenu () {
      try {
        await this.$store.dispatch('menu/addMenu', this.menu)
        this.clearMenu()
      } catch (error) {
        console.error(error)
      }
    },
    editMenu (menu) {
      this.editableMenu['.key'] = menu['.key']
      this.editableMenu.name = menu.name
      this.editableMenu.items = menu.items
      this.editableMenu.description = menu.description
      this.editableMenuOpen = true
    },
    async updateMenu () {
      try {
        await this.$store.dispatch('menu/updateMenu', this.editableMenu)
        this.editableMenuOpen = false
      } catch (error) {
        console.error(error)
      }
    },
    clearMenu () {
      this.menu.name = ''
      this.menu.items = []
      this.menu.description = ''
    }
  }
}
</script>

<style scoped>

</style>
