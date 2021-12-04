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
import { mapMutations } from 'vuex'

export default {
  mounted() {
    if(this.$fire.auth.currentUser) {
      this.setUser(this.$fire.auth.currentUser.uid)
    }
  },
  methods: {
    ...mapMutations(['setUser']),
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
