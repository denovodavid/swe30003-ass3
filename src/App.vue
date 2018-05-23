<template>
  <div id="app">
    <menu-bar/>
    <router-view/>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'

export default {
  name: 'App',
  components: {
    MenuBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

table {
  border-collapse: collapse;
}

th, td {
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0.3em;
}
</style>
