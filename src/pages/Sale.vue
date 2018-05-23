<template>
<div>
  <menu-bar/>
  <h1>Sale Page</h1>
  <h2>Unpaid Orders</h2>
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
      <tr v-for="order in unpaidOrders" :key="order['.key']">
        <td>{{ order.type }}</td>
        <td>{{ order.table }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.items.length }} Items</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button @click="pay(order)">Pay</button></td>
      </tr>
    </tbody>
  </table>

  <h2>Sales</h2>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Price</th>
        <th>Items</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sale in sales" :key="sale['.key']" :style="{ background: '#eee' }">
        <td>{{ sale.type }}</td>
        <td>{{ sale.price }}</td>
        <td>{{ sale.items.length }} Items</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MenuBar from '@/components/MenuBar'
import Modal from '@/components/Modal'
import clone from 'lodash/clone'

class Sale {
  constructor (
    type = '',
    price = 0,
    items = []
  ) {
    this.type = type
    this.price = price
    this.items = items
  }
}

export default {
  name: 'sale-page',
  components: {
    MenuBar,
    Modal
  },
  data () {
    return {
      sale: new Sale()
    }
  },
  computed: {
    unpaidOrders () {
      return this.completedOrders
        .filter(order => order.payment === '')
    },
    paidOrders () {
      return this.completedOrders
        .filter(order => order.payment !== '')
    },
    ...mapState('sale', [
      'sales'
    ]),
    ...mapState('menu', [
      'items'
    ]),
    ...mapGetters('order', [
      'completedOrders'
    ])
  },
  methods: {
    async pay (order) {
      const items = this.items
        .filter(item => order.items.includes(item['.key']))
      const price = items
        .reduce((total, item) => {
          return total + item.price
        }, 0)
      const sale = new Sale('card', price, items.map(item => item.name))
      const saleKey = await this.$store.dispatch('sale/addSale', sale)
      order = clone(order)
      order.payment = saleKey
      await this.$store.dispatch('order/updateOrder', order)
    }
  }
}
</script>

<style scoped>

</style>
