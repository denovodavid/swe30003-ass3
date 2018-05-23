import firebase from 'firebase/app'
import { db } from '@/firebase'

const orders = db.ref('orders')

export class Order {
  constructor (
    key,
    type,
    table,
    name,
    phone,
    items,
    state,
    payment,
    createdAt
  ) {
    this.key = key
    this.type = type
    this.table = table
    this.name = name
    this.phone = phone
    this.items = items
    this.state = state
    this.payment = payment
    this.createdAt = createdAt
    this.ref = orders.child(this.key)
    this.ref.on('value', (data) => {
      this.updateOrderData(data.val())
    })
  }
  updateOrderData (data) {
    this.type = data.type
    this.table = data.table
    this.name = data.name
    this.phone = data.phone
    this.items = data.items
    this.state = data.state
    this.payment = data.payment
    this.createdAt = data.createdAt
  }
  updateOrderState (state) {
    orders.child(this.key).update({
      state: state
    })
  }
  static async create (
    type,
    table,
    name,
    phone,
    items
  ) {
    try {
      const orderData = await orders.push({
        type: type,
        table: table,
        name: name,
        phone: phone,
        items: items,
        state: 'placed',
        payment: '',
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      const orderObject = new Order(
        orderData.type,
        orderData.table,
        orderData.name,
        orderData.phone,
        orderData.items
      )
      orderObject.key = orderData['.key']
      orderObject.createdAt = orderData.createdAt
      return orderObject
    } catch (error) {
      console.error(error)
    }
  }
}

const myOrder = Order.create()
myOrder.updateOrderState('ready')
