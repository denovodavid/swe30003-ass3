<template>
<b-container>
  <br>
  <b-card no-body>
    <b-tabs pills card>
      <b-tab title="Items" active>
        <h1>Items</h1>
        <b-form @submit.stop.prevent="addItem" @reset="clearItem">
          <b-form-group label="Name">
            <b-form-input
              type="text"
              v-model.trim="item.name"
              required
              placeholder="Big BOSH! Burger"
            />
          </b-form-group>
          <b-form-group label="Price">
            <b-form-input
              type="number"
              v-model.number="item.price"
              required
              placeholder="37"
            />
          </b-form-group>
          <b-form-group label="Description">
            <b-form-textarea
              v-model="item.description"
              :rows="3"
              :max-rows="6"
              :no-resize="true"
              required
              placeholder="This is very delicious."
            />
          </b-form-group>
          <b-button type="submit" variant="primary">Add Item</b-button>
          <b-button
            type="reset"
            variant="outline-danger"
            class="float-right"
          >
            Reset
          </b-button>
        </b-form>
        <br>
        <!-- TODO: add search/filter -->
        <b-list-group>
          <b-list-group-item
            v-for="item in items"
            :key="item['.key']"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ item.name }}</h5>
              <h5>{{ item.price | money }}</h5>
            </div>
            <p class="mb-1">{{ item.description }}</p>
            <b-button
              @click="editItem(item)"
              size="sm"
              variant="secondary"
            >
              Edit
            </b-button>
            <!-- TODO: add popover confirmation -->
            <b-button
              @click="$store.dispatch('menu/removeItem', item)"
              size="sm"
              variant="danger"
              class="float-right"
            >
              Remove
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="Menus">
        <h1>Menus</h1>
        <b-form @submit.stop.prevent="addMenu" @reset="clearMenu">
          <b-form-group label="Name">
            <b-form-input
              type="text"
              v-model.trim="menu.name"
              required
              placeholder="Quick Eats"
            />
          </b-form-group>
          <!-- TODO: better way to select items -->
          <b-form-group label="Items">
            <b-form-select
              v-model="menu.items"
              :options="items.map(x => ({ value: x['.key'], text: x.name }))"
              multiple
              required
            />
          </b-form-group>
          <b-form-group label="Description">
            <b-form-textarea
              v-model="menu.description"
              :rows="3"
              :max-rows="6"
              :no-resize="true"
              required
              placeholder="The most efficient food around."
            />
          </b-form-group>
          <b-button type="submit" variant="primary">Add Menu</b-button>
          <b-button
            type="reset"
            variant="outline-danger"
            class="float-right"
          >
            Reset
          </b-button>
        </b-form>
        <br>
        <!-- TODO: add search/filter -->
        <b-list-group>
          <b-list-group-item
            v-for="menu in menus"
            :key="menu['.key']"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ menu.name }}</h5>
              <h5>{{ menu.items.length }} Item{{ menu.items.length > 1 ? 's' : '' }}</h5>
            </div>
            <p class="mb-1">{{ menu.description }}</p>
            <ul>
              <!-- TODO: make this more efficient -->
              <li v-for="item in menu.items" :key="item">
                {{ items.find(x => x['.key'] === item).name }}
              </li>
            </ul>
            <b-button
              @click="editMenu(menu)"
              size="sm"
              variant="secondary"
            >
              Edit
            </b-button>
            <!-- TODO: add popover confirmation -->
            <b-button
              @click="$store.dispatch('menu/removeMenu', menu)"
              size="sm"
              variant="danger"
              class="float-right"
            >
              Remove
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
    </b-tabs>
  </b-card>

  <!-- TODO: fix form validation -->
  <b-modal
    ref="editItemModal"
    @ok="$event.preventDefault(); updateItem(editableItem)"
    title="Edit Item"
  >
    <b-form>
      <b-form-group label="Name">
        <b-form-input
          type="text"
          v-model.trim="editableItem.name"
          required
          placeholder="Big BOSH! Burger"
        />
      </b-form-group>
      <b-form-group label="Price">
        <b-form-input
          type="number"
          v-model.number="editableItem.price"
          required
          placeholder="37"
        />
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          v-model="editableItem.description"
          :rows="3"
          :max-rows="6"
          :no-resize="true"
          required
          placeholder="This is very delicious."
        />
      </b-form-group>
    </b-form>
  </b-modal>

  <!-- TODO: fix form validation -->
  <b-modal
    ref="editMenuModal"
    @ok="$event.preventDefault(); updateMenu(editableMenu)"
    title="Edit Menu"
  >
    <b-form>
      <b-form-group label="Name">
        <b-form-input
          type="text"
          v-model.trim="editableMenu.name"
          required
          placeholder="Quick Eats"
        />
      </b-form-group>
      <!-- TODO: better way to select items -->
      <b-form-group label="Items">
        <b-form-select
          v-model="editableMenu.items"
          :options="items.map(x => ({ value: x['.key'], text: x.name }))"
          multiple
          required
        />
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          v-model="editableMenu.description"
          :rows="3"
          :max-rows="6"
          :no-resize="true"
          required
          placeholder="The most efficient food around."
        />
      </b-form-group>
    </b-form>
  </b-modal>

</b-container>
</template>

<script>
import { mapState } from 'vuex'
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
    Modal
  },
  data () {
    return {
      item: new Item(),
      editableItem: {
        '.key': '',
        ...new Item()
      },
      menu: new Menu(),
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
      this.$refs.editItemModal.show()
    },
    async updateItem (item) {
      // TODO: handle error
      await this.$store.dispatch('menu/updateItem', item)
      this.$refs.editItemModal.hide()
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
      this.$refs.editMenuModal.show()
    },
    async updateMenu (menu) {
      // TODO: handle error
      await this.$store.dispatch('menu/updateMenu', menu)
      this.$refs.editMenuModal.hide()
    },
    clearMenu () {
      this.menu = new Menu()
    }
  }
}
</script>

<style scoped>

</style>
