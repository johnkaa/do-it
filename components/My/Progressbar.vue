<template>
  <div class="progress">
    <div class="progress__top" :style="{ color: color }">
      <div class="progress-title">{{ title }}</div>
      <div class="progress-title">{{ lvl }}</div>
    </div>
    <div class="progress-bar"><span :style="{ 'background-color': color, width: barWidth }"></span></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'lvl'],
  mounted() {
    const color = ['#55AAFF', '#55FF8F', '#B455FF', 'white', '#FF9255', '#FF5555']
    this.color = color[Math.floor(Math.random() * color.length)]
    this.barWidth = this.lvl + '%'
  },
  data() {
    return {
      color: 'white',
      barWidth: '0%',
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress {
    width: 270px;
    &__top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 9px;
    }
    &-bar {
      width: 100%;
      background-color: #2B353F;
      height: 2px;
      position: relative;
      border-radius: 2px;
      span {
        position: absolute;
        height: 2px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 2px;
      }
    }
  }
</style>
