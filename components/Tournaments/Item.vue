<template>
  <div class="tournament" @click="$emit('click')">
    <div class="tournament__img">
      <img :src="img" alt="">
      <div class="tournament__status"
           :class="{ ongoing: status === 'ongoing',
                     finished: status === 'past' }"></div>
    </div>
    <div class="tournament__title">{{ title }}</div>
    <div class="tournament__info">
      <div class="tournament__info-item">
        <div class="tournament__info-item-title">Prize</div>
        <div class="tournament__info-item-text">{{ prize }}</div>
      </div>
      <div class="tournament__info-item">
        <div class="tournament__info-item-title">Entry free</div>
        <div class="tournament__info-item-text">{{ entry }}</div>
      </div>
      <div class="tournament__info-item">
        <div class="tournament__info-item-title">Platform</div>
        <div class="tournament__info-item-text">{{ platform }}</div>
      </div>
      <div class="tournament__info-item">
        <div class="tournament__info-item-title">Slots</div>
        <div class="tournament__info-item-text">{{ slots }}</div>
      </div>
      <div class="tournament__info-item">
        <div class="tournament__info-item-title">Mode</div>
        <div class="tournament__info-item-text">{{ mode }}</div>
      </div>
      <div class="tournament__info-item">
        <div class="tournament__info-item-title">Server</div>
        <div class="tournament__info-item-text">{{ server }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['img', 'title', 'prize', 'entry', 'platform', 'slots', 'mode', 'server', 'status']
}
</script>

<style lang="scss" scoped>
  .tournament {
    width: 100%;
    padding: 20px 33px 20px 146px;
    border: 2px solid #20252B;
    position: relative;
    cursor: pointer;
    &__img img {
      width: 116px;
      height: 128px;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 14px;
    }
    &__status {
      position: absolute;
      top: 10px;
      left: 6px;
      &::before {
        content: 'Upcoming';
        padding: 6px;
        background-color: #0A68F5;
      }
      &.ongoing {
        &::before {
          content: 'Ongoing';
          background-color: #0A68F5;
        }
      }
      &.finished {
        &::before {
          content: 'Finished';
          background-color: #B83333;
        }
      }
    }
    &__info {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      &-item {
        &-title {
          text-transform: uppercase;
          color: #67707A;
        }
        &-text {
          font-weight: 500;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .tournament__info {
      grid-template-columns: repeat(5, 1fr);
      &-item:nth-child(6) {
        display: none;
      }
    }
  }
  @media (max-width: 700px) {
    .tournament__info {
      grid-template-columns: repeat(4, 1fr);
      &-item:nth-child(3) {
        display: none;
      }
    }
  }
  @media (max-width: 700px) {
    .tournament {
      padding-right: 10px;
    }
    .tournament__info {
      grid-template-columns: repeat(3, 1fr);
      &-item:nth-child(2) {
        display: none;
      }
    }
  }
  @media (max-width: 430px) {
    .tournament__info {
      grid-template-columns: repeat(2, 1fr);
      &-item:nth-child(5) {
        display: none;
      }
    }
  }
</style>
