<template>
<div>
  <menu-bar/>
  <h1>Reservation Page</h1>
  <h2>Reservations</h2>
  <div>
    <label>Date:</label>
    <datepicker v-model="reservation.date"/>
  </div>
  <div>
    <label>Name:</label>
    <input type="text" v-model.trim="reservation.name">
  </div>
  <div>
    <label>Phone:</label>
    <input type="text" v-model.trim="reservation.phone">
  </div>
  <div>
    <label>Table:</label>
    <select v-model.number="reservation.table">
      <option v-for="table in availableTables" :key="table">{{ table }}</option>
    </select>
  </div>
  <button @click="addReservation">Add Reservation</button>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Table</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="reservation in reservations"
        :key="reservation['.key']"
      >
        <td>{{ new Date(reservation.date).toLocaleDateString() }}</td>
        <td>{{ reservation.name }}</td>
        <td>{{ reservation.phone }}</td>
        <td>{{ reservation.table }}</td>
        <td><button @click="editReservation(reservation)">Edit</button></td>
        <td><button @click="$store.dispatch('reservation/removeReservation', reservation)">Remove</button></td>
      </tr>
    </tbody>
  </table>

  <modal
    title="Edit Reservation"
    :open="editableReservationOpen"
    @close="editableReservationOpen = false"
  >
    <div>
      <label>Date:</label>
      <datepicker v-model="editableReservation.date"/>
    </div>
    <div>
      <label>Name:</label>
      <input type="text" v-model.trim="editableReservation.name">
    </div>
    <div>
      <label>Phone:</label>
      <input type="text" v-model.trim="editableReservation.phone">
    </div>
    <div>
      <label>Table:</label>
      <select v-model.number="editableReservation.table">
        <option v-for="table in availableTables" :key="table">{{ table }}</option>
      </select>
    </div>
    <button @click="updateReservation(editableReservation)">Save</button>
  </modal>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MenuBar from '@/components/MenuBar'
import Datepicker from 'vuejs-datepicker'
import Modal from '@/components/Modal'
import clone from 'lodash/clone'
import addDays from 'date-fns/add_days'

class Reservation {
  constructor (
    date = addDays(new Date(), 1),
    name = '',
    phone = '',
    table = 0
  ) {
    this.date = date
    this.name = name
    this.phone = phone
    this.table = table
  }
}

export default {
  name: 'reservation-page',
  components: {
    MenuBar,
    Datepicker,
    Modal
  },
  data () {
    return {
      reservation: new Reservation(),
      editableReservationOpen: false,
      editableReservation: {
        '.key': '',
        ...new Reservation()
      },
      tables: Array(24 - 1 + 1).fill().map((_, idx) => 1 + idx)
    }
  },
  computed: {
    availableTables () {
      return this.tables
        .filter(t => !this.unavailableTables.includes(t))
    },
    unavailableTables () {
      return this.reservedTablesOnDate(this.reservation.date)
    },
    ...mapState('reservation', [
      'reservations'
    ]),
    ...mapGetters('reservation', [
      'reservedTablesOnDate'
    ])
  },
  methods: {
    async addReservation () {
      // TODO: handle error
      await this.$store.dispatch('reservation/addReservation', this.reservation)
      this.clearReservation()
    },
    clearReservation () {
      this.reservation = new Reservation()
    },
    editReservation (reservation) {
      this.editableReservation = clone(reservation)
      this.editableReservationOpen = true
    },
    async updateReservation (reservation) {
      // TODO: handle error
      await this.$store.dispatch('reservation/updateReservation', reservation)
      this.editableReservationOpen = false
    }
  }
}
</script>

<style scoped>

</style>
