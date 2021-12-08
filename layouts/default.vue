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

export default {
  mounted() {
    if(this.$fire.auth.currentUser) {
      this.$store.dispatch('setUserAction', this.$fire.auth.currentUser.uid)
    }
  },
}
</script>

<style scoped>
  @media (max-width: 1100px) {
    .container {
      padding: 0 15px 105px 15px;
    }
  }
</style>
