<template>
<b-navbar toggleable="md" type="dark" variant="dark">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="#">The Cuddly Wombat</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
      <b-nav-item :to="{ name: 'Menu' }">Menu</b-nav-item>
      <b-nav-item :to="{ name: 'Order' }">Order</b-nav-item>
      <b-nav-item :to="{ name: 'Reservation' }">Reservation</b-nav-item>
      <b-nav-item :to="{ name: 'Sale' }">Sale</b-nav-item>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#">Sign In</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'menu-bar'
}
</script>

<style scoped>

</style>
