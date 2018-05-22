<template>
<div>
  <!-- The Modal -->
  <div
    ref="modal"
    @click="close"
    :style="{
      display: open ? 'block' : 'none'
    }"
    class="modal"
  >

    <!-- Modal content -->
    <div class="modal-content">
      <span @click="$emit('close')" class="close">&times;</span>
      <h3 style="margin-top: 0">{{ title }}</h3>
      <slot/>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'modal',
  props: [
    'title',
    'open'
  ],
  methods: {
    close (e) {
      if (e.target === this.$refs.modal) this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border-radius: 4px;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    line-height: 0.5;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
