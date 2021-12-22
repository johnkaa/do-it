<template>
  <div class="tournaments-card" @click="$emit('click')">
    <img class="tournaments-card__img" :src="img" alt="">
    <div class="tournaments-card__inner">
      <div class="tournaments-card__title">{{ title }}</div>
      <div class="tournaments-card__items">
        <div class="tournaments-card__item">
          <div class="tournaments-card__item-title">Start</div>
          <div class="tournaments-card__item-text">{{ start }}</div>
        </div>
        <div class="tournaments-card__item">
          <div class="tournaments-card__item-title">Mode</div>
          <div class="tournaments-card__item-text">{{ mode }}</div>
        </div>
        <div class="tournaments-card__item">
          <div class="tournaments-card__item-title">Slots</div>
          <div class="tournaments-card__item-text">{{ slots }}</div>
        </div>
        <div class="tournaments-card__item">
          <div class="tournaments-card__item-title">Pool</div>
          <div class="tournaments-card__item-text">{{ pool }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'img', 'start', 'mode', 'slots', 'pool']
}
</script>

<style lang="scss" scoped>
  .tournaments-card {
    background-color: #151A1F;
    max-width: 370px;
    display: inline-block;
    cursor: pointer;
    &__img {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      width: 100%;
    }
    &__inner {
      padding: 30px 22px;
    }
    &__title {
      font-size: 22px;
      font-weight: 500;
      color: #E6E8EB;
      margin-bottom: 30px;
    }
    &__items {
      display: flex;
      justify-content: space-between;
    }
    &__item {
      text-align: center;
      &-title {
        color: #8996A3;
        line-height: 16px;
      }
    }
  }
  @media (max-width: 500px) {
    .tournaments-card {
      &__inner {
        padding: 15px 11px;
      }
    }
  }
</style>
