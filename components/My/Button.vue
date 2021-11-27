<template>
  <button class="button"
          :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  props: ['disabled']
}
</script>

<style lang="scss" scoped>
  @import "assets/styles/var";
  .button {
    color: white;
    background: $primary-gradient;
    font-weight: 700;
    line-height: 19px;
    padding: 12px 30px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all .3s;
    width: 100%;
    &:disabled {
      background: gray;
      cursor: default;
    }
    &:disabled:hover {
      background-color: gray;
    }
    &:hover {
      background: lighten($primary-light, .5);
    }
    &:focus {
      outline: none;
      background: lighten($primary-light, .5);
    }
  }
  .secondary {
    background: #1A222D;
    &:hover {
      background: lighten(#1A222D, 5);
    }
  }
</style>
