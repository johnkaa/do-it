<template>
  <button class="button">
    <slot />
  </button>
</template>

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
    &:hover {
      background: lighten($primary-light, .5);
      transform: scale(1.1);
    }
  }
  .secondary {
    background: #1A222D;
    &:hover {
      background: lighten(#1A222D, 5);
    }
  }
</style>
