<template>
  <div class="history">
    <div class="history__items">
      <div class="history__item" v-for="item in getUser.balanceHistory" :class="{ deposit: item.type === 'Deposit'}" v-if="getUser.balanceHistory">
        <div class="history__item-date">{{ item.date }}</div>
        <div class="history__item-type">{{ item.type }}</div>
        <div class="history__item-amount">{{ item.amount }}</div>
        <div class="history__item-method">{{ item.method }}</div>
      </div>
    </div>
    <div class="history__not-found" v-if="!getUser.balanceHistory">History not found</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['getUser'])
}
</script>

<style lang="scss" scoped>
  .history__item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding: 5px;
    background-color: red;
    margin-bottom: 5px;
    &.deposit {
      background-color: green;
    }
  }
  .history__not-found {
    text-align: center;
    color: red;
  }
  @media (max-width: 700px) {
    .history__item {
      grid-template-columns: 1fr 1fr 1fr;

      &-type {
        display: none;
      }
    }
  }
  @media (max-width: 550px) {
    .history__item {
      grid-template-columns: 1fr 1fr;
      &-method {
        display: none;
      }
    }
  }
</style>
