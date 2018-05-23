import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import Order from '@/pages/Order'
import Reservation from '@/pages/Reservation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    }

  ]
})
