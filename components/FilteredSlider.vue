<template>
  <div class="filtered-slider">
    <div class="filtered-slider__top">
      <slot class="title" name="title"></slot>
      <div class="filtered-slider__categories">
        <slot class="filtered-slider__categories" name="filter"></slot>
      </div>
    </div>
    <swiper
      class="filtered-slider__items"
      :options="swiperOptions">
      <slot name="slide"></slot>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: "3",
        slidesPerGroup: "3",
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          1250: {
            slidesPerView: "3",
            slidesPerGroup: "3",
            spaceBetween: 30,
          },
          750: {
            slidesPerView: "2",
            slidesPerGroup: "2",
            spaceBetween: 20,
          },
          320: {
            slidesPerView: "1",
            slidesPerGroup: "1",
            spaceBetween: 5,
          },
        },
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
    &__items {
      padding-bottom: 55px;
      cursor: pointer;
    }
  }
  @media (max-width: 777px) {
    .filtered-slider__categories {
      display: none;
    }
  }
  @media (max-width: 500px) {
    .filtered-slider {
      max-width: 310px;
    }
  }
</style>
