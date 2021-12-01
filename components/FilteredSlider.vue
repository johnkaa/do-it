<template>
  <div class="filtered-slider">
    <div class="filtered-slider__top">
      <div class="filtered-slider__name title" :class="{ streams: streams }">{{ title }}</div>
      <div class="filtered-slider__categories">
        <select-categories />
      </div>
    </div>
    <swiper
      class="filtered-slider__items"
      :options="swiperOptions">
      <swiper-slide class="filtered-slider__item" v-for="item in 10" :key="item" v-if="tournaments">
        <tournaments-card />
      </swiper-slide>
      <swiper-slide class="filtered-slider__item" v-for="(item, index) in items" :key="index" v-if="news">
        <news-card :mainPage="true" :img="item.img" :title="item.title" :text="item.text"/>
      </swiper-slide>
      <swiper-slide class="filtered-slider__item" v-for="item in 10" :key="item" v-if="streams">
        <div>stream</div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['title', 'tournaments', 'news', 'streams', 'items'],
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
