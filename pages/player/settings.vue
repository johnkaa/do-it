<template>
  <div class="settings">
    <h2 class="settings__title title">Settings</h2>
    <div class="settings__items">
      <nuxt-link class="settings__item" to="/player/edit-account-details">Edit account details</nuxt-link>
      <nuxt-link class="settings__item" to="/player/change-email">Change email address</nuxt-link>
      <nuxt-link class="settings__item" to="/player/change-password">Change password</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'profile'
}
</script>

<style lang="scss" scoped>
  .settings__title {
    text-align: center;
    margin-bottom: 60px;
  }
  .settings__items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 64px;
  }
  .settings__item {
    padding: 30px 15px;
    min-width: 280px;
    border: 2px solid #20252B;
    font-size: 22px;
    font-weight: 700;
    line-height: 100%;
    text-align: center;
  }
</style>
