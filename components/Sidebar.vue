<template>
  <aside class="sidebar">
    <ul class="sidebar__list">
      <li class="sidebar__list-item">
        <nuxt-link class="sidebar__list-link" to="/">
          <img src="~assets/images/sidebar/item-01.svg" alt="">
        </nuxt-link>
      </li>
      <li class="sidebar__list-item">
        <nuxt-link class="sidebar__list-link" to="/">
          <img src="~assets/images/sidebar/item-02.svg" alt="">
        </nuxt-link>
      </li>
      <li class="sidebar__list-item">
        <nuxt-link class="sidebar__list-link" to="/">
          <img src="~assets/images/sidebar/item-03.svg" alt="">
        </nuxt-link>
      </li>
      <li class="sidebar__list-item">
        <nuxt-link class="sidebar__list-link" to="/">
          <img src="~assets/images/sidebar/item-04.svg" alt="">
        </nuxt-link>
      </li>
      <li class="sidebar__list-item">
        <nuxt-link class="sidebar__list-link" to="/">
          <img src="~assets/images/sidebar/item-05.svg" alt="">
        </nuxt-link>
      </li>
      <li class="sidebar__list-item">
        <nuxt-link class="sidebar__list-link" to="/">
          <img src="~assets/images/sidebar/item-06.svg" alt="">
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .sidebar {
    background-color: #0F1215;
    position: fixed;
    width: 114px;
    height: 100%;
    border-right: 2px solid #20252B;
    &__list {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-item {
        transition: all .3s;
        &:hover {
          transform: scale(1.1);
        }
      }
      &-item + &-item {
        margin-top: 80px;
      }
    }
  }
  @media (max-width: 1100px) {
    .sidebar {
      width: 100%;
      max-height: 100px;
      padding: 10px 50px;
      bottom: 0;
      z-index: 5;
      &__list {
        flex-direction: row;
        justify-content: space-between;
        &-item + &-item {
          margin-top: 0;
        }
      }
    }
  }
  @media (max-width: 700px) {
    .sidebar {
      padding: 0 20px;
      &__list-item img {
        width: 32px;
      }
    }
  }
</style>
