import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import Order from '@/pages/Order'

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
    }
  ]
})
