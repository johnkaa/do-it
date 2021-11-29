<template>
  <div class="games__item">
    <div class="games__item-img">
      <img :src="img" alt="">
      <div class="games__item-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'img']
}
</script>

<style lang="scss" scoped>
  .games__item {
    cursor: pointer;
    &-img {
      position: relative;
      img {
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
  }
  @media (max-width: 400px) {
    .games__item img {
      object-position: top;
    }
  }
</style>
