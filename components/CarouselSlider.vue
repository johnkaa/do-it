<template>
  <swiper
    class="filtered-slider__items"
    :options="swiperOptions"
    pagination>
    <swiper-slide class="filtered-slider__item">
      a
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: "CarouselSlider"
}
</script>

<style scoped>

</style>
