<template>
  <div class="app">
    <Sidebar />
    <div class="container">
      <Header />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    //this.$fireSt// e.g. in a seperate Plugin
    // this.$fireAuthStore.subscribe()
    // this.onAuthStateChangedAction
  },
  methods: {
    // ...mapActions(['onAuthStateChangedAction'])
  }
}
</script>

<style scoped>
  @media (max-width: 1100px) {
    .container {
      padding: 0 15px 105px 15px;
    }
  }
</style>
