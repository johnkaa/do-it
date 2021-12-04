<template>
  <div class="profile">
    <Sidebar />
    <div class="container">
      <Header />
      <div class="profile-layout">
        <div class="player__sidebar">
          <div class="player__img">
            <img :src="getUser.img" alt="">
          </div>
          <div class="player__name" v-if="getUser.name">{{ getUser.name }}</div>
          <div class="player__username">{{ getUser.username }}</div>
          <div class="player__team" v-if="getUser.mainTeam">{{ getUser.mainTeam }}</div>
          <div class="player__team">BALANCE: ${{ getUser.eur }}</div>
          <div class="player__icons">
            <img class="player__icon" src="/images/icons/plus.svg" alt="">
            <img class="player__icon" src="/images/icons/mail.svg" alt="">
          </div>
          <div class="player__nav">
            <nuxt-link class="player__nav-item" :class="{ 'active' : this.$route.path === '/player' }" to="/player">Profile</nuxt-link>
            <nuxt-link class="player__nav-item" to="/player/user-panel">User panel</nuxt-link>
            <nuxt-link class="player__nav-item" to="/player/edit-account-details">Edit account details</nuxt-link>
            <nuxt-link class="player__nav-item" to="/player/balance/deposit">Deposit</nuxt-link>
            <nuxt-link class="player__nav-item" to="/player/subscribe">Subscribe</nuxt-link>
            <nuxt-link class="player__nav-item" to="/player/settings">Settings</nuxt-link>
          </div>
        </div>
        <Nuxt class="player"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  head: {
    title: 'Profile'
  },
  computed: mapGetters(['getUser']),
  mounted() {
    this.setUser(this.$fire.auth.currentUser.uid)
  },
  methods: {
    ...mapMutations(['setUser']),
  }
}
</script>

<style lang="scss" scoped>
  .profile-layout {
    padding-top: 135px;
    display: flex;
  }
  .player {
    &__sidebar {
      border-right: 1px solid #1A1F24;
      padding-right: 80px;
      margin-right: 60px;
    }
    &__img {
      max-width: 104px;
      max-height: 104px;
      margin-bottom: 23px;
      img {
        border-radius: 4px;
      }
    }
    &__name {
      color: #909AA3;
      margin-bottom: 5px;
    }
    &__username {
      color: #F5F5F5;
      font-size: 24px;
      font-weight: 700;
      line-height: 130%;
      margin-bottom: 7px;
    }
    &__team {
      color: #37B7FA;
      line-height: 130%;
      margin-bottom: 11px;
    }
    &__icons {
      display: flex;
      gap: 12px;
      margin-bottom: 66px;
      margin-top: 11px;
    }
    &__icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .player__nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
    &-item {
      padding-left: 20px;
      min-width: 170px;
      position: relative;
      &::before {
        content: '';
        width: 11px;
        height: 11px;
        border-radius: 50%;
        border: 1px solid #fff;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      +.nuxt-link-exact-active {
        color: #37B7FA;
        &::before {
          border-color: #37B7FA;
          background-color: #37B7FA;
        }
      }
    }
    .active {
      color: #37B7FA;
      &::before {
        border-color: #37B7FA;
        background-color: #37B7FA;
      }
    }
  }
  @media (max-width: 900px) {
    .player {
      padding-bottom: 110px;
    }
    .player__sidebar {
      display: none;
    }
  }
</style>
