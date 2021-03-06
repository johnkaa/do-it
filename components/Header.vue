<template>
  <header class="header">
    <nuxt-link class="header__logo" to="/">
      <img class="header__logo-img" src="/images/logo.png" alt="" @click="setBurgerActiveLogo">
    </nuxt-link>
    <div class="burger" :class="{ active: burgerActive }" @click="setBurgerActive">
      <div class="dash"></div>
      <div class="dash"></div>
      <div class="dash"></div>
    </div>
    <div class="burger__menu" :class="{ active: burgerActive }" @click="setBurgerActive">
      <ul class="menu__list">
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/tournaments">Play</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/news">News</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/games">Games</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/shop">Shop</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/sponsorship">Sponsorship</nuxt-link>
        </li>
        <li class="menu__list-item" v-if="!$fire.auth.currentUser">
          <nuxt-link class="menu__list-link burger-menu__btn" to="/auth/login">
            <my-button class="secondary">Login</my-button>
          </nuxt-link>
        </li>
        <li class="menu__list-item" v-if="!$fire.auth.currentUser">
          <nuxt-link class="menu__list-link burger-menu__btn" to="/auth/register">
            <my-button>Sign Up</my-button>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nav class="menu">
      <ul class="menu__list">
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/tournaments">Play</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/news">News</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/games">Games</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/shop">Shop</nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/sponsorship">Sponsorship</nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="header__btns" v-if="!$fire.auth.currentUser">
      <nuxt-link class="header__btn" to="/auth/login">
        <my-button class="secondary">Login</my-button>
      </nuxt-link>
      <nuxt-link class="header__btn" to="/auth/register">
        <my-button>Sign Up</my-button>
      </nuxt-link>
    </div>
    <div class="header__user" :class="{ active: userActive }" v-else @mouseout="userActive = !userActive" @mouseover="userActive = !userActive">
      <div class="header__user-wrapper">
        <div class="header__user-img">
          <img :src="getUser.img" alt="">
        </div>
        <div class="header__user-info">
          <div class="header__user-name">{{ getUser.username }}</div>
          <div class="header__user-balance">{{ getUser.eur }} EUR / {{ getUser.dtc }} DTC</div>
        </div>
      </div>
      <div class="header__user-inner">
        <div class="header__user-lvl">
          <span class="header__user-lvl-text">LVL {{ getUser.lvl }}</span>
          <div class="header__user-lvl-bar">
            <span :style="{ width: getUser.lvl + '%' }"></span>
          </div>
        </div>
        <div class="header__user-links">
          <nuxt-link class="header__user-link" v-if="getUser.id === 16381161807" to="/admin/tournaments">Admin</nuxt-link>
          <nuxt-link class="header__user-link" to="/player">My profile</nuxt-link>
          <nuxt-link class="header__user-link" to="/player/team">My team</nuxt-link>
          <nuxt-link class="header__user-link" to="/player/balance/withdraw">Withdraw</nuxt-link>
          <nuxt-link class="header__user-link" to="/player/balance/deposit">Deposit</nuxt-link>
          <nuxt-link class="header__user-link" to="/player/subscribe">Premium</nuxt-link>
          <nuxt-link class="header__user-link" to="/">Statistics</nuxt-link>
        </div>
        <div class="header__user-links">
          <nuxt-link class="header__user-link" to="/player/support">Support</nuxt-link>
          <nuxt-link class="header__user-link" to="/player/settings">Settings</nuxt-link>
          <div class="header__user-link" @click="logout">Logout</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['getUser']),
  data() {
    return {
      burgerActive: false,
      userActive: false,
    }
  },
  methods: {
    async logout() {
      await this.$fire.auth.signOut()
      await this.$router.push('/auth/login')
    },
    setBurgerActive() {
      this.burgerActive = !this.burgerActive
    },
    setBurgerActiveLogo() {
      if(this.burgerActive) {
        this.burgerActive = !this.burgerActive
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    padding: 30px 0;
    &__logo {
      transition: all .3s;
      &:hover {
        transform: scale(1.1);
      }
    }
    &__btns {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
    &__btn {
      max-width: 120px;
    }
    &__btn + &__btn {
      margin-left: 8px;
    }
  }

  .menu__list {
    display: flex;
    &-item {
      font-size: 20px;
      font-weight: 700;
      margin-left: 56px;
    }
  }
  .burger {
    display: none;
    cursor: pointer;
    &__menu {
      display: none;
    }
  }
  .header__user {
    margin-left: auto;
    padding: 8px;
    background-color: #161A1F;
    &-wrapper {
      display: flex;
      align-items: center;
      position: relative;
      padding-right: 32px;
      cursor: pointer;
      &::after {
        content: '';
        width: 13px;
        height: 8px;
        position: absolute;
        top: 14px;
        right: 0;
        background-image: url(static/images/icons/user-arrow.svg);
      }
    }
    &-img img {
      display: block;
      max-width: 40px;
      max-height: 40px;
      margin-right: 8px;
    }
    &-name {
      font-size: 14px;
      font-weight: 500;
    }
    &-balance {
      font-size: 12px;
      font-weight: 500;
      color: #55AAFF;
    }
    &-inner {
      position: relative;
    }
    &-lvl {
      font-size: 10px;
      display: none;
      align-items: center;
      justify-content: space-between;
      background-color: #161A1F;
      position: absolute;
      width: calc(100% + 16px);
      left: -8px;
      top: 0;
      padding: 8px 8px 5px;
      cursor: pointer;
      &-text {
        min-width: 40px;
      }
      &-bar {
        background-color: #000;
        width: 100%;
        height: 2px;
        border-radius: 2px;
        position: relative;
        span {
          height: 2px;
          background-color: #fff;
          position: absolute;
        }
      }
    }
    &-links {
      text-transform: uppercase;
      background-color: #161A1F;
      width: calc(100% + 16px);
      position: absolute;
      left: -8px;
      top: 38px;
      display: none;
      z-index: 5;
      .header__user-link {
        display: flex;
        position: relative;
        padding: 7px 7px 7px 12px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          background-color: rgba(#fff, .1);
        }
        &::after {
          content: '';
          width: 12px;
          height: 8px;
          position: absolute;
          right: 15px;
          top: 50%;
          background-image: url(static/images/icons/user-arrow.svg);
          transform: translateY(-50%) rotate(-90deg);
        }
      }
    }
    &-links + &-links {
      top: 267px;
      .header__user-link {
        color: #969BA3;
      }
    }
  }
  .header__user.active {
    .header__user-lvl {
      display: flex;
    }
    .header__user-links {
      display: block;
    }
  }
  @media (max-width: 1100px) {
    .header {
      justify-content: space-between;
      &__logo {
        order: 1;
        z-index: 101;
      }
      &__btns {
        display: none;
      }
      &__user {
        display: none;
      }
    }
    .menu {
      display: none;
    }
    .burger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50px;
      height: 32px;
      order: 0;
      z-index: 101;
    }
    .burger__menu {
      width: 100%;
      min-height: 100%;
      background-color: #0F1215;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      transform: translateY(-1000px);
      display: block;
      padding-top: 80px;
      transition: all .3s;
      .menu__list {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .menu__list-item {
        margin-left: 0;
        width: 300px;
        text-align: center;
      }
      .menu__list-item + .menu__list-item {
        margin-top: 30px;
      }
    }
    .burger__menu-btn {
      margin-top: 100px;
    }
    .burger__menu.active {
      transform: translate(0);
      overflow: hidden;
    }
    .burger .dash {
      width: 50px;
      height: 5px;
      background: #fff;
      border-radius: 20px;
      transition: 0.25s;
    }
    .active .dash {
      opacity: 0;
    }
    .active .dash:nth-of-type(2) {
      opacity: 1;
    }
  }
</style>
