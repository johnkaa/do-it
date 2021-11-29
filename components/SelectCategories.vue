<template>
  <div class="select-categories">
    <my-select-item class="filtered-slider__categories-item" v-for="item in items" :key="item">{{ item }}</my-select-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['All', 'StarCraft II', 'Dota II', 'CS:GO', 'LOL', 'Fortnite']
    }
  }
}
</script>

<style scoped>

</style>
