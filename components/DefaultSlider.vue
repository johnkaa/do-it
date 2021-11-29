<template>
  <swiper
    class="default-slider__items"
    :options="swiperOptions"
    pagination>
    <swiper-slide class="default-slider__item" v-for="item in 10" :key="item">
      <games-card title="Dota II"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: "3",
        spaceBetween: 30,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .default-slider__items {
    padding-bottom: 50px;
  }
</style>
