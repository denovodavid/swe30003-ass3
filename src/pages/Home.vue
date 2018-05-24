<template>
<b-container>
  <br>
  <b-jumbotron header="The Cuddly Wombat" lead="Cafe &amp; Restaurant" >
    <p>For more information click below</p>
    <b-btn variant="dark" href="#">More Info</b-btn>
  </b-jumbotron>
  <b-card title="Coffee"
          img-src="https://picsum.photos/1200/600?image=755"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2">
    <p class="card-text">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Dolore blanditiis temporibus recusandae quia, eos ducimus aliquam nisi
      molestiae maxime! Vitae, iure. Ad, veniam incidunt? Sint harum
      reprehenderit minus blanditiis rerum.
    </p>
    <b-button :to="{ name: 'Menu' }" variant="dark">Menu</b-button>
  </b-card>
</b-container>
</template>

<script>
import MenuBar from '@/components/MenuBar'

export default {
  name: 'home-page',
  components: {
    MenuBar
  }
}
</script>

<style scoped>

</style>
