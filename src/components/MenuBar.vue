<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Menu' }">Menu</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'menu-bar'
}
</script>

<style scoped>
div {
  width: 100%;
  height: 50px;
  background: #333;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  display: inline-block;
  margin: 0.5em;
  padding: 0.4em 0.8em;
  border-radius: 0.2em;
  color: #eee;
  text-decoration: none;
}

a:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
