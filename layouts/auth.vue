<template>
  <div class="auth-layout">
    <img class="auth-layout__back" src="/images/icons/back.svg" alt="" @click="$router.go(-1)">
    <nuxt-link to="/"><img class="auth-layout__exit" src="/images/icons/exit.svg" alt=""></nuxt-link>
    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
  .auth-layout {
    position: relative;
    &__back,
    &__exit {
      position: absolute;
      cursor: pointer;
      top: 16px;
    }
    &__back {
      left: 16px;
    }
    &__exit {
      right: 16px;
    }
  }
</style>
