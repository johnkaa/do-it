<template>
  <header class="header">
    <nuxt-link class="header__logo" to="/">
      <img class="header__logo-img" src="~/assets/images/logo.png" alt="">
    </nuxt-link>
    <div class="burger" :class="{ active: active }" @click="burger">
      <div class="dash"></div>
      <div class="dash"></div>
      <div class="dash"></div>
    </div>
    <div class="burger__menu" :class="{ active: active }" @click="burger">
      <ul class="menu__list">
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/play">Play</nuxt-link>
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
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link burger-menu__btn" to="/auth/login">
            <my-button class="secondary">Login</my-button>
          </nuxt-link>
        </li>
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link burger-menu__btn" to="/auth/register">
            <my-button>Sign Up</my-button>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nav class="menu">
      <ul class="menu__list">
        <li class="menu__list-item">
          <nuxt-link class="menu__list-link" to="/play">Play</nuxt-link>
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
    <div class="header__btns">
      <nuxt-link class="header__btn" to="/auth/login">
        <my-button class="secondary">Login</my-button>
      </nuxt-link>
      <nuxt-link class="header__btn" to="/auth/register">
        <my-button>Sign Up</my-button>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  methods: {
    burger() {
      this.active = !this.active
    }
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
  @media (max-width: 1100px) {
    .header {
      justify-content: space-between;
      &__logo {
        order: 1;
        z-index: 5;
      }
    }
    .menu {
      display: none;
    }
    .header__btns {
      display: none;
    }
    .burger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50px;
      height: 32px;
      order: 0;
      z-index: 5;
    }
    .burger__menu {
      width: 100%;
      min-height: 100%;
      background-color: #0F1215;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
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
