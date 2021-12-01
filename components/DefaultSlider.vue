<template>
  <swiper
    class="default-slider__items"
    :options="swiperOptions"
    pagination>
    <swiper-slide class="default-slider__item" v-for="(item, index) in items" :key="index">
      <games-card :title="item.title" :img="item.img" :mainPage="true"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  props: ['items'],
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
  .default-slider__items {
    cursor: pointer;
  }
</style>
