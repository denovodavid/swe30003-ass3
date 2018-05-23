import { db } from '@/firebase'
import { firebaseAction } from 'vuexfire'
import isSameDay from 'date-fns/is_same_day'

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
    addReservation ({ dispatch, commit }, reservation) {
      // TODO: add validation
      reservations.push({
        date: reservation.date.toISOString(),
        name: reservation.name,
        phone: reservation.phone,
        table: reservation.table
      }, () => {
        console.log('Reservation Added')
      })
    },
    updateReservation ({ dispatch, commit }, reservation) {
      // TODO: add validation
      reservations.child(reservation['.key']).update({
        date: reservation.date.toISOString(),
        name: reservation.name,
        phone: reservation.phone,
        table: reservation.table
      }, () => {
        console.log('Reservation Updated')
      })
    },
    removeReservation ({ dispatch, commit }, reservation) {
      // TODO: add validation
      reservations.child(reservation['.key']).remove(() => {
        console.log('Reservation Removed')
      })
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
