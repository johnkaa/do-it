<template>
  <div class="filtered-slider">
    <div class="filtered-slider__top">
      <div class="filtered-slider__name title" :class="{ streams: streams }">{{ title }}</div>
      <div class="filtered-slider__categories">
        <my-select-item class="filtered-slider__categories-item" v-for="item in 5" :key="item">{{ item }}</my-select-item>
      </div>
    </div>
    <swiper
      class="filtered-slider__items"
      :options="swiperOptions">
      <swiper-slide class="filtered-slider__item" v-for="item in 9" :key="item">
        <tournaments-card />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['title', 'streams'],
  data() {
    return {
      swiperOptions: {
        slidesPerView: "3",
        slidesPerGroup: "3",
        spaceBetween: 30,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // breakpoints: {
        //   768: {
        //     spaceBetween: 30,
        //     slidesPerView: 'auto',
        //     slidesPerGroup: 3,
        //   },
        // },
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "assets/styles/var";

  .filtered-slider {
    padding-top: 100px;
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;
    }
    &__name {
      &.streams {
        position: relative;
        padding-right: 48px;
        &::after {
          content: '';
          width: 32px;
          height: 32px;
          background-image: url(static/images/icons/stream.svg);
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-40%);
        }
      }
    }
    &__items {
      padding-bottom: 55px;
    }
  }
  @media (max-width: 777px) {
    .filtered-slider__categories {
      display: none;
    }
  }
</style>
