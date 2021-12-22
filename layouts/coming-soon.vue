<template>
  <div class="app">
    <Sidebar/>
    <div class="container">
      <Header/>
      <div class="coming-soon">
        <div class="coming-soon__title">Coming soon</div>
        <div class="coming-soon__text">We are working hard to provide you the best experience on our platform</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
    if (this.$fire.auth.currentUser) {
      this.$store.dispatch('setUserAction', this.$fire.auth.currentUser.uid)
    }
  },
}
</script>

<style lang="scss" scoped>
  .coming-soon {
    text-align: center;
    background-image: url(static/images/main-bg.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    padding-top: 280px;
    padding-bottom: 380px;
    margin-top: 30px;
    &__title {
      font-size: 66px;
      line-height: 100%;
      font-weight: 700;
      margin-bottom: 10px;
    }
    &__text {
      font-size: 13px;
      font-weight: 700;
      color: #6A6767;
    }
  }
  @media (max-width: 1100px) {
    .container {
      padding: 0 15px 105px 15px;
    }
  }
  @media (max-width: 500px) {
    .coming-soon {
      &__title {
        font-size: 44px;
      }
      &__text {
        font-size: 10px;
      }
    }
  }
</style>
