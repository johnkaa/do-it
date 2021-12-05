<template>
  <div class="balance">
    <div class="balance__nav">
      <div class="balance__profile">
        <div class="balance__profile-img"><img :src="getUser.img" alt=""></div>
        <div class="balance__profile-info">
          <div class="balance__profile-name">{{ getUser.username }}</div>
          <div class="balance__profile-balance">BALANCE: ${{ getUser.eur }}</div>
          <div class="balance__profile-balance">DOIT POINTS: {{ getUser.dtc }}</div>
        </div>
      </div>
      <div class="balance__links">
        <nuxt-link class="balance__link" :class="{ 'active' : this.$route.path === '/player/balance/withdraw' }" to="/player/balance/withdraw">Withdraw</nuxt-link>
        <nuxt-link class="balance__link" to="/player/balance/deposit">Deposit</nuxt-link>
        <nuxt-link class="balance__link" to="/player/balance/history">History</nuxt-link>
      </div>
    </div>
    <nuxt-child class="balance__content" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
}
</script>

<style lang="scss" scoped>
  .balance {
    max-width: 100%;
    padding-bottom: 100px;
    &__nav {
      padding-top: 21px;
      padding-right: 31px;
      padding-left: 31px;
      background-color: #0D1D2C;
      margin-bottom: 40px;
    }
    &__profile {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 40px;
      &-img {
        max-width: 86px;
        max-height: 83px;
      }
      &-name {
        font-size: 24px;
        font-weight: 700;
        line-height: 130%;
        margin-bottom: 5px;
      }
      &-balance {
        color: #37B7FA;
      }
    }
    &__links {
      display: flex;
      justify-content: center;
      gap: 100px;
      color: #ABABAB;
      font-size: 24px;
      font-weight: 700;
      line-height: 130%;
    }
    &__link {
      padding: 6px 36px;
      +.nuxt-link-exact-active {
        color: #fff;
        border-bottom: 4px solid #FFFFFF;
      }
    }
    &__link.active {
      color: #fff;
      border-bottom: 4px solid #FFFFFF;
    }
    &__content {
      background-color: #0D1D2C;
      padding: 20px 40px;
    }
  }
  @media (max-width: 1250px) {
    .balance {
      margin: 0 auto;
      padding-bottom: 130px;
      &__links {
        gap: 20px;
      }
      &__link {
        padding: 6px 20px;
      }
    }
  }
  @media (max-width: 700px) {
    .balance {
      &__links {
        gap: 10px;
      }
      &__link {
        padding: 6px 10px;
        font-size: 20px;
      }
    }
  }
</style>
