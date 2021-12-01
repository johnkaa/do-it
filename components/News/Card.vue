<template>
  <div class="news-card" :class="{ mainPage: mainPage, bigSize: bigSize }">
    <img class="news-card__img" :src="img" alt="" />
    <div class="news-card__title">{{ title }}</div>
    <div class="news-card__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ['mainPage', 'bigSize', 'img', 'title', 'text'],
  mounted() {
    if(this.mainPage) {
      this.text.substr(0,50)
      this.text = this.text + '...'
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-card {
    max-width: 273px;
    background-color: #20252B;
    width: 100%;
    &__img {
      width: 100%;
      height: 240px;
      object-fit: cover;
    }
    &__title {
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      color: #F5F5F5;
      padding: 24px 24px 0;
    }
    &__text {
      font-size: 16px;
      color: #67707A;
      padding: 18px 24px 34px;
    }
  }
  .news-card.bigSize {
    padding-left: 208px;
    position: relative;
    max-width: 570px;
    height: 328px;
    width: 100%;
    overflow: hidden;
    .news-card {
      &__img {
        position: absolute;
        left: 0;
        top: 0;
        width: 208px;
        height: 328px;
      }
      &__title {
        font-size: 24px;
        line-height: 32px;
        padding: 24px 78px 14px 34px;
      }
      &__text {
        padding: 0 78px 34px 34px;
      }
    }
  }
  .news-card.mainPage {
    background-color: #E1E6EB;
    border: 2px solid #E1E6EB;
    min-width: 370px;
    .news-card {
      &__img {
        width: 100%;
        height: 198px;
      }
      &__title {
        padding: 30px 22px 22px;
        font-size: 22px;
        line-height: 130%;
        color: #0F1215;
      }
      &__text {
        padding: 0 22px 42px;
        color: #5E656B;
      }
    }
  }
  @media (max-width: 1300px) {
    .news-card.bigSize {
      max-width: 100%;
    }
    .news-card {
      max-width: 48%;
    }
  }
  @media (max-width: 650px) {
    .news-card.bigSize {
      max-width: 100%;
      height: 100%;
      padding: 0;
      overflow: visible;
      .news-card {
        &__img {
          position: static;
          max-width: 100%;
          width: 100%;
          height: 240px;
        }
        &__title {
          font-weight: 500;
          font-size: 18px;
          line-height: 150%;
          color: #F5F5F5;
          padding: 24px 24px 0;
        }
        &__text {
          font-size: 16px;
          color: #67707A;
          padding: 18px 24px 34px;
        }
      }
    }
    .news-card {
      max-width: 305px;
      &__img {
        max-width: 305px;
      }
      &__title {
        max-width: 300px;
      }
      &__text {
        max-width: 290px;
      }
    }
  }
</style>
