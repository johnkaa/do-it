<template>
  <div class="teams">
    <div class="teams__items">
      <div class="teams__item">
        <div class="teams__item-rank">Rank</div>
        <div class="teams__item-country">Country & Name</div>
        <div class="teams__item-year">Total (Year)</div>
        <div class="teams__item-overall">Total (Overall)</div>
      </div>
      <div class="teams__item" v-for="item in filteredTeams">
        <div class="teams__item-rank">{{ item.rank }}</div>
        <div class="teams__item-country">
          <div class="teams__item-title">
            <div class="teams__item-flag"><country-flag :country='code(item.country)'/></div>
            <div class="teams__item-name">{{ item.name }}</div>
          </div>
        </div>
        <div class="teams__item-year">{{ item.totalYear }}</div>
        <div class="teams__item-overall">{{ item.totalOverall }}</div>
      </div>
      <my-pagination :total="total" :item="teams.length" @getPage="changePage" v-if="this.filteredTeams.length > 6"/>
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
      this.teams = snapshot.val()[this.year].teams
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  watch: {
    async year() {
      const topRef = this.$fire.database.ref('top')
      try {
        const snapshot = await topRef.once('value')
        this.teams = snapshot.val()[this.year].teams
      } catch (e) {
        this.$toasted.error(e)
      }
    },
  },
  computed: {
    filteredTeams() {
      return this.teams.slice((this.page * this.total) - this.total, this.page * this.total)
    }
  },
  data() {
    return {
      teams: [],
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
  .teams {
    &__item {
      display: grid;
      grid-template-columns: 45px 285px 110px 140px;
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
</style>
