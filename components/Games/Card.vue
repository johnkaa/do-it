<template>
  <div class="games__item mainPage" :class="{ mainPage: mainPage }">
    <div class="games__item-img">
      <img :src="img" alt="">
      <div class="games__item-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'img', 'mainPage']
}
</script>

<style lang="scss" scoped>
  .games__item {
    cursor: pointer;
    max-height: 500px;
    height: 100%;
    padding-bottom: 50px;
    &-img {
      position: relative;
      img {
        width: 100%;
        max-height: 500px;
        border-radius: 4px;
      }
    }
    &-text {
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      font-size: 30px;
      font-weight: 700;
      line-height: 100%;
    }
  }
  @media (max-width: 800px) {
    .games__item {
      width: 100%;
      img {
        width: 100%;
        max-height: 228px;
        object-fit: cover;
        object-position: 0 -60px;
        filter: brightness(50%);
      }
      &-text {
        top: 50%;
        left: 50%;
        transform: translate(-50% -50%);
        width: 100%;
        text-align: center;
      }
    }
    .games__item.mainPage {
      padding-bottom: 20px;
      .games__item {
        &-img {
          width: 300px;
          max-height: 600px;
          img {
            max-height: 600px;
            width: 100%;
          }
        }
      }
    }
  }
</style>
