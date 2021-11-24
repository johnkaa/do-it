<template>
  <div class="select-item" :class="{'active': active}" @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  name: "SelectItem",
  data() {
    return {
      active: false,
    }
  },
  methods: {
    onClick() {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-item {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    background: #14191F;
    padding: 16px;
    cursor: pointer;
    &.active {
      background: #D8DFEB;
      color: #0F1215;
    }
  }
</style>
