<template>
  <div class="games__item">
    <div class="games__item-img">
      <img src="../../assets/images/games/dota-02.jpg" alt="">
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
</style>
