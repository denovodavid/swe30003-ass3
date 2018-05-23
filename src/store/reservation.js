import { db } from '@/firebase'
import { firebaseAction } from 'vuexfire'
import isSameDay from 'date-fns/is_same_day'
import isAfter from 'date-fns/is_after'

const reservations = db.ref('reservations')

export default {
  namespaced: true,
  state: {
    reservations: []
  },
  mutations: {},
  actions: {
    bindRefs: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('reservations', reservations)
    }),
    async addReservation ({ dispatch, commit }, reservation) {
      if (
        !isAfter(reservation.date, new Date()) ||
        reservation.name.trim() === '' ||
        reservation.phone.trim() === '' ||
        reservation.table <= 0
      ) {
        throw new Error('Invalid Reservation')
      }
      const { key } = await reservations.push({
        date: reservation.date.toISOString(),
        name: reservation.name,
        phone: reservation.phone,
        table: reservation.table
      })
      return key
    },
    async updateReservation ({ dispatch, commit }, reservation) {
      if (
        reservation['.key'].trim() === '' ||
        !isAfter(reservation.date, new Date()) ||
        reservation.name.trim() === '' ||
        reservation.phone.trim() === '' ||
        reservation.table <= 0
      ) {
        throw new Error('Invalid Reservation')
      }
      await reservations.child(reservation['.key']).update({
        date: reservation.date.toISOString(),
        name: reservation.name,
        phone: reservation.phone,
        table: reservation.table
      })
    },
    async removeReservation ({ dispatch, commit }, reservation) {
      if (reservation['.key'].trim() === '') {
        throw new Error('Invalid Reservation')
      }
      await reservations.child(reservation['.key']).remove()
    }
  },
  getters: {
    reservationsOnDate: state => date => {
      return state.reservations
        .filter(res => isSameDay(res.date, date))
    },
    reservedTablesOnDate: (state, getters) => date => {
      return getters.reservationsOnDate(date)
        .map(res => res.table)
    }
  }
}
