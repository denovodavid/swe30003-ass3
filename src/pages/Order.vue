<template>
<b-container>
  <br>
  <h1>Orders</h1>
  <!-- TODO: fix validation -->
  <b-form @submit.stop.prevent="addOrder" @reset="clearOrder">
    <b-form-group label="Type">
      <b-form-select
        v-model="order.type"
        :options="[
          { value: 'sitting', text: 'Dine In' },
          { value: 'takeaway', text: 'Take Away' }
        ]"
        required
      />
    </b-form-group>
    <b-form-group label="Table" v-show="order.type === 'sitting'">
      <b-form-select
        v-model="order.table"
        :options="tables"
      />
    </b-form-group>
    <b-form-group label="Name" v-show="order.type === 'takeaway'">
      <b-form-input
        type="text"
        v-model.trim="order.name"
        placeholder="Ryan KS"
      />
    </b-form-group>
    <b-form-group label="Phone" v-show="order.type === 'takeaway'">
      <b-form-input
        type="text"
        v-model.trim="order.phone"
        placeholder="0987654321"
      />
    </b-form-group>
    <b-form-group label="Items">
      <b-form-select
        v-model="order.items"
        :options="items.map(x => ({ value: x['.key'], text: x.name }))"
        multiple
        required
      />
    </b-form-group>
    <b-button type="submit" variant="primary">Add Order</b-button>
    <b-button
      type="reset"
      variant="outline-danger"
      class="float-right"
    >
      Reset
    </b-button>
  </b-form>
  <br>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Active" active>
        <b-list-group>
          <b-list-group-item
            v-for="order in activeOrders"
            :key="order['.key']"
            :variant="
              order.state === 'ready' && order.overdue
                ? 'warning'
                : order.overdue
                ? 'danger'
                : order.state === 'ready'
                ? 'primary'
                : ''
            "
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between mb-2">
              <h2 class="mb-1">
                <b-badge
                  :variant="
                    order.state === 'ready' && order.overdue
                      ? 'warning'
                      : order.overdue
                      ? 'danger'
                      : order.state === 'ready'
                      ? 'primary'
                      : ''
                  "
                >
                  {{ order.timer | time }}
                </b-badge>
              </h2>
              <h5>{{ order.type === 'sitting' ? 'Dine In' : 'Take Away' }}</h5>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <div>
                <p class="mb-1" v-show="order.type === 'sitting'">
                  <b>Table {{ order.table }}</b>
                </p>
                <p class="mb-1" v-show="order.type === 'takeaway'">
                  <b>{{ order.name }} &#183; {{ order.phone }}</b>
                </p>
                <ul>
                  <!-- TODO: make this more efficient -->
                  <li v-for="item in order.items" :key="item">
                    {{ items.find(x => x['.key'] === item).name }}
                  </li>
                </ul>
              </div>
              <b-button-group class="align-self-end">
                <b-button
                  @click="readyOrder(order)"
                  :pressed="order.state === 'ready'"
                  size="sm"
                  variant="outline-primary"
                >
                  Ready
                </b-button>
                <b-button
                  @click="completeOrder(order)"
                  size="sm"
                  variant="outline-success"
                >
                  Complete
                </b-button>
                <b-button
                  @click="editOrder(order)"
                  size="sm"
                  variant="outline-secondary"
                >
                  Edit
                </b-button>
                <!-- TODO: add popover confirmation -->
                <b-button
                  @click="$store.dispatch('order/removeOrder', order)"
                  size="sm"
                  variant="outline-danger"
                  class="float-right"
                >
                  Remove
                </b-button>
              </b-button-group>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="Complete">
        <b-list-group>
          <b-list-group-item
            v-for="order in completedOrders"
            :key="order['.key']"
            :variant="
              order.state === 'ready' && order.overdue
                ? 'warning'
                : order.overdue
                ? 'danger'
                : order.state === 'ready'
                ? 'primary'
                : ''
            "
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">
                Served &#183;
                <small>{{ order.type === 'sitting' ? 'Dine In' : 'Take Away' }}</small>
              </h5>
              <h5>{{ order.items.length }} Item{{ order.items.length > 1 ? 's' : '' }}</h5>
            </div>
            <div class="d-flex w-100 justify-content-between">
              <div>
                <p class="mb-1" v-show="order.type === 'sitting'">
                  <b>Table {{ order.table }}</b>
                </p>
                <p class="mb-1" v-show="order.type === 'takeaway'">
                  <b>{{ order.name }} &#183; {{ order.phone }}</b>
                </p>
                <ul>
                  <!-- TODO: make this more efficient -->
                  <li v-for="item in order.items" :key="item">
                    {{ items.find(x => x['.key'] === item).name }}
                  </li>
                </ul>
              </div>
              <b-button-group class="align-self-end">
                <!-- TODO: add popover confirmation -->
                <b-button
                  @click="$store.dispatch('order/removeOrder', order)"
                  size="sm"
                  variant="outline-danger"
                  class="float-right"
                >
                  Remove
                </b-button>
              </b-button-group>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
    </b-tabs>
  </b-card>

  <!-- TODO: fix form validation -->
  <b-modal
    ref="editOrderModal"
    @ok="$event.preventDefault(); updateOrder(editableOrder)"
    title="Edit Order"
  >
    <b-form>
      <b-form-group label="Type">
        <b-form-select
          v-model="editableOrder.type"
          :options="[
            { value: 'sitting', text: 'Dine In' },
            { value: 'takeaway', text: 'Take Away' }
          ]"
          required
        />
      </b-form-group>
      <b-form-group label="Table" v-show="editableOrder.type === 'sitting'">
        <b-form-select
          v-model="editableOrder.table"
          :options="tables"
        />
      </b-form-group>
      <b-form-group label="Name" v-show="editableOrder.type === 'takeaway'">
        <b-form-input
          type="text"
          v-model.trim="editableOrder.name"
          placeholder="Ryan KS"
        />
      </b-form-group>
      <b-form-group label="Phone" v-show="editableOrder.type === 'takeaway'">
        <b-form-input
          type="text"
          v-model.trim="editableOrder.phone"
          placeholder="0987654321"
        />
      </b-form-group>
      <b-form-group label="Items">
        <b-form-select
          v-model="editableOrder.items"
          :options="items.map(x => ({ value: x['.key'], text: x.name }))"
          multiple
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>

</b-container>
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
      editableOrder: {
        '.key': '',
        ...new Order()
      },
      tables: Array(24 - 1 + 1).fill().map((_, idx) => 1 + idx)
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
      this.$refs.editOrderModal.show()
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
      this.$refs.editOrderModal.hide()
    }
  }
}
</script>

<style scoped>

</style>
