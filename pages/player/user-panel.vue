<template>
  <div class="user-panel">
    <h2 class="user-panel__title title">User Panel</h2>
    <div class="user-panel__items">
      <nuxt-link class="user-panel__item" to="/player">My profile</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/team">My Team</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/balance/withdraw">Withdraw</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/balance/deposit">Deposit</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/subscribe">Subscribe</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/statistics">Statistics</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/support">Support</nuxt-link>
      <nuxt-link class="user-panel__item" to="/player/settings">Settings</nuxt-link>
      <div class="user-panel__item" @click="logout">Logout</div>
      <nuxt-link class="user-panel__item" to="/player/game-profile">Game profile</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'profile',
  methods: {
    async logout() {
      await this.$fire.auth.signOut()
      await this.$router.push('/auth/login')
    },
  }
}
</script>

<style lang="scss" scoped>
  .user-panel__title {
    text-align: center;
    margin-bottom: 60px;
  }
  .user-panel__items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 64px;
  }
  .user-panel__item {
    padding: 30px 15px;
    min-width: 230px;
    border: 2px solid #20252B;
    font-size: 22px;
    font-weight: 700;
    line-height: 100%;
    text-align: center;
    cursor: pointer;
  }
</style>
