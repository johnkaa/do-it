<template>
  <div class="players">
    <div class="players__items">
      <div class="players__item">
        <div class="players__item-rank">Rank</div>
        <div class="players__item-nickname">Country & Nickname</div>
        <div class="players__item-username">Name</div>
        <div class="players__item-year">Total (Year)</div>
        <div class="players__item-overall">Total (Overall)</div>
      </div>
      <div class="players__item" v-for="item in filteredPlayers">
        <div class="players__item-rank">{{ item.rank }}</div>
        <div class="players__item-nickname">
          <div class="players__item-title">
            <div class="players__item-flag"><country-flag :country='code(item.country)'/></div>
            <div class="players__item-name">{{ item.username }}</div>
          </div>
        </div>
        <div class="players__item-username">{{ item.name }}</div>
        <div class="players__item-year">{{ item.totalYear }}</div>
        <div class="players__item-overall">{{ item.totalOverall }}</div>
      </div>
      <my-pagination :total="total" :item="players.length" @getPage="changePage"/>
    </div>
  </div>
</template>

<script>
const { getCode } = require('country-list');

export default {
  props: ['year'],
  async fetch() {
    const topRef = this.$fire.database.ref('top')
    try {
      const snapshot = await topRef.once('value')
      this.players = snapshot.val()[this.year].players
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  watch: {
    async year() {
      const topRef = this.$fire.database.ref('top')
      try {
        const snapshot = await topRef.once('value')
        this.players = snapshot.val()[this.year].players
      } catch (e) {
        this.$toasted.error(e)
      }
    }
  },
  computed: {
    filteredPlayers() {
      return this.players.slice((this.page * this.total) - this.total, this.page * this.total)
    }
  },
  data() {
    return {
      players: [],
      page: 1,
      total: 6
    }
  },
  methods: {
    code(country) {
      return getCode(country)
    },
    changePage(page) {
      this.page = page
    }
  }
}
</script>

<style lang="scss" scoped>
  .players {
    &__item {
      display: grid;
      grid-template-columns: 45px 285px 268px 110px 140px;
      justify-content: space-between;
      padding: 0 36px;
      color: #67707A;
      &:nth-child(1) {
        text-transform: uppercase;
        padding-top: 30px;
        font-weight: 700;
        color: #E6E6E6;
        padding-bottom: 22px;
        border-bottom: 2px solid #242B33;
      }
      &:last-child {
        padding-bottom: 30px;
      }
      &-rank {
        text-align: center;
      }
      &-title {
        display: flex;
        gap: 12px;
      }
      &-name {
        color: #CCCCCC;
        font-size: 16px;
      }
      &-flag {
        margin-top: -8px;
      }
      & + & {
        margin-top: 20px;
      }
    }
  }
  @media (max-width: 1000px) {
    .players {
      &__item {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
  @media (max-width: 800px) {
    .players {
      &__item {
        grid-template-columns: repeat(4, 1fr);
        &-overall {
          display: none;
        }
      }
    }
  }
  @media (max-width: 600px) {
    .players {
      &__item {
        grid-template-columns: repeat(3, 1fr);
        &-username {
          display: none;
        }
      }
    }
  }
  @media (max-width: 450px) {
    .players {
      &__item {
        grid-template-columns: repeat(2, 1fr);
        &-year {
          display: none;
        }
      }
    }
  }
</style>
