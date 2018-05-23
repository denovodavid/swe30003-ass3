<template>
<div>
  <menu-bar/>
  <h1>Order Page</h1>
  <h2>Orders</h2>
  <div>
    <label>Type:</label>
    <select v-model.trim="order.type">
      <option value="sitting">Dine In</option>
      <option value="takeaway">Take Away</option>
    </select>
  </div>
  <div v-show="order.type === 'sitting'">
    <label>Table:</label>
    <select v-model.number="order.table">
      <option v-for="n in 24" :key="n">{{ n }}</option>
    </select>
  </div>
  <div v-show="order.type === 'takeaway'">
    <label>Name:</label>
    <input type="text" v-model.trim="order.name">
  </div>
  <div v-show="order.type === 'takeaway'">
    <label>Phone:</label>
    <input type="text" v-model.trim="order.phone">
  </div>
  <div>
   <label>Items:</label>
    <select multiple v-model="order.items">
      <option
        v-for="item in items"
        :key="item['.key']"
        :value="item['.key']"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
  <button @click="addOrder">Add Order</button>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Table</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Items</th>
        <th>Timer</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order in activeOrders"
        :key="order['.key']"
        :style="{
          background: order.state === 'ready' && order.overdue
            ? 'orange'
            : order.overdue
            ? 'red'
            : order.state === 'ready'
            ? 'green'
            : ''
        }"
      >
        <td>{{ order.type }}</td>
        <td>{{ order.table }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.items.length }} Items</td>
        <td>{{ order.timer | time }}</td>
        <td><button @click="readyOrder(order)">Ready</button></td>
        <td><button @click="completeOrder(order)">Complete</button></td>
        <td><button @click="editOrder(order)">Edit</button></td>
        <td><button @click="$store.dispatch('order/removeOrder', order)">Remove</button></td>
      </tr>
      <tr v-for="order in completedOrders" :key="order['.key']" :style="{ background: '#eee' }">
        <td>{{ order.type }}</td>
        <td>{{ order.table }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.items.length }} Items</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button @click="$store.dispatch('order/removeOrder', order)">Remove</button></td>
      </tr>
    </tbody>
  </table>

  <modal
    title="Edit Order"
    :open="editableOrderOpen"
    @close="editableOrderOpen = false"
  >
    <div>
      <label>Type:</label>
      <select v-model.trim="editableOrder.type">
        <option value="sitting">Dine In</option>
        <option value="takeaway">Take Away</option>
      </select>
    </div>
    <div v-show="editableOrder.type === 'sitting'">
      <label>Table:</label>
      <select v-model.number="editableOrder.table">
        <option v-for="n in 24" :key="n">{{ n }}</option>
      </select>
    </div>
    <div v-show="editableOrder.type === 'takeaway'">
      <label>Name:</label>
      <input type="text" v-model.trim="editableOrder.name">
    </div>
    <div v-show="editableOrder.type === 'takeaway'">
      <label>Phone:</label>
      <input type="text" v-model.trim="editableOrder.phone">
    </div>
    <div>
    <label>Items:</label>
      <select multiple v-model="editableOrder.items">
        <option
          v-for="item in items"
          :key="item['.key']"
          :value="item['.key']"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <button @click="updateOrder(editableOrder)">Save</button>
  </modal>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MenuBar from '@/components/MenuBar'
import Modal from '@/components/Modal'
import clone from 'lodash/clone'

class Order {
  constructor (
    type = 'sitting',
    table = 0,
    name = '',
    phone = '',
    items = [],
    state = 'placed',
    payment = ''
  ) {
    this.type = type
    this.table = table
    this.name = name
    this.phone = phone
    this.items = items
    this.state = state
    this.payment = payment
  }
}

export default {
  name: 'order-page',
  components: {
    MenuBar,
    Modal
  },
  data () {
    return {
      order: new Order(),
      editableOrderOpen: false,
      editableOrder: {
        '.key': '',
        ...new Order()
      }
    }
  },
  computed: {
    ...mapState('menu', [
      'items'
    ]),
    ...mapGetters('order', [
      'activeOrders',
      'completedOrders'
    ])
  },
  methods: {
    async addOrder () {
      // TODO: handle error=
      await this.$store.dispatch('order/addOrder', this.order)
      this.clearOrder()
    },
    clearOrder () {
      this.order = new Order()
    },
    editOrder (order) {
      this.editableOrder = clone(order)
      this.editableOrderOpen = true
    },
    async readyOrder (order) {
      // TODO: handle error
      order = clone(order)
      order.state = order.state !== 'ready' ? 'ready' : 'placed'
      await this.updateOrder(order)
    },
    async completeOrder (order) {
      // TODO: handle error
      order = clone(order)
      order.state = 'served'
      await this.updateOrder(order)
    },
    async updateOrder (order) {
      // TODO: handle error
      await this.$store.dispatch('order/updateOrder', order)
      this.editableOrderOpen = false
    }
  }
}
</script>

<style scoped>

</style>
