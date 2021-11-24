<template>
  <div class="home">
    <div class="home__top">
      <h1 class="home__title">DOIT BETA</h1>
      <p class="home__text">
        Prepare for your esports career and get ready for awesome tournaments with big prize pools and many fun! <span>Register Now!</span>
      </p>
      <div class="home__btns">
        <nuxt-link class="home__btn" to="/login">
          <my-button class="secondary">Login</my-button>
        </nuxt-link>
        <nuxt-link class="home__btn" to="/register">
          <my-button>Sign Up</my-button>
        </nuxt-link>
      </div>
    </div>
    <div class="home__tournaments">
      <filtered-slider title="Tournaments"/>
    </div>
    <div class="home__news">
      <filtered-slider title="News"/>
    </div>
    <div class="home__streams">
      <filtered-slider title="Streams" :streams="true"/>
    </div>
    <div class="home__partners">
      <div class="home__partners-title title">Partners</div>
      <div class="home__partners-items">
        <div class="home__partners-item" v-for="item in 7" :key="item">
          <img src="../assets/images/partners/partner-01.png" alt="">
        </div>
      </div>
    </div>
    <div class="home__games">
      <div class="home__games-title title">Games</div>
      <div class="home__games-items">
        <games-card title="Dota II"/>
        <games-card title="Dota II"/>
        <games-card title="Dota II"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Home'
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/styles/var";
  .home {
    background-image: url(../assets/images/bg.jpg);
    &__top {
      text-align: center;
      margin-top: 50px;
      background-image: url(../assets/images/main-bg.svg);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      padding-bottom: 410px;
      padding-top: 210px;
      margin-bottom: 25px;
    }
    &__title {
      font-size: 125px;
      line-height: 100%;
      font-weight: 700;
      margin-bottom: 15px;
    }
    &__text {
      color: $dark-white;
      max-width: 440px;
      margin: 0 auto 20px;
      span {
        display: block;
      }
    }
    &__btns {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__btn {
      max-width: 120px;
    }
    &__btn + &__btn {
      margin-left: 8px;
    }
    &__tournaments {
      padding-bottom: 50px;
    }
    &__news {
      padding-bottom: 50px;
    }
    &__streams {
      padding-bottom: 150px;
    }
    &__partners-items {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 100px;
    }
    &__games {
      padding-bottom: 100px;
      &-title {
        margin-bottom: 50px;
      }
      &-items {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media (max-width: 1350px) {
    .home {
      &__top {
        padding-bottom: 300px;
        background-size: contain;
      }
    }
  }
  @media (max-width: 1100px) {
    .home {
      &__top {
        padding-top: 100px;
      }
    }
  }
  @media (max-width: 800px) {
    .home {
      &__top {
        padding: 50px 0;
      }
      &__title {
        font-size: 84px;
      }
      &__text {
        font-size: 14px;
        line-height: 150%;
        max-width: 320px;
        span {
          display: inline-block;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .home {
      &__top {
        padding: 50px 0;
      }
      &__title {
        font-size: 84px;
      }
      &__text {
        font-size: 14px;
        line-height: 150%;
        max-width: 320px;
        span {
          display: inline-block;
        }
      }
    }
  }
  @media (max-width: 555px) {
    .home {
      &__title {
        font-size: 45px;
      }
      &__text {
        font-size: 12px;
      }
    }
  }
</style>
