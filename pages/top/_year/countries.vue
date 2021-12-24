<template>
  <div class="countries">
    <div class="countries__items">
      <div class="countries__item">
        <div class="countries__item-rank">Rank</div>
        <div class="countries__item-country">Country & Name</div>
        <div class="countries__item-players">Players</div>
      </div>
      <div class="countries__item" v-for="item in filteredCountries">
        <div class="countries__item-rank">{{ item.rank }}</div>
        <div class="countries__item-country">
          <div class="countries__item-title">
            <div class="countries__item-flag"><country-flag :country='code(item.country)'/></div>
            <div class="countries__item-name">{{ item.country }}</div>
          </div>
        </div>
        <div class="countries__item-players">{{ item.Players }}</div>
      </div>
      <my-pagination :total="total" :item="countries.length" @getPage="changePage" v-if="this.filteredCountries.length > 6"/>
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
      this.countries = snapshot.val()[this.year].countries
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  watch: {
    async year() {
      const topRef = this.$fire.database.ref('top')
      try {
        const snapshot = await topRef.once('value')
        this.countries = snapshot.val()[this.year].countries
      } catch (e) {
        this.$toasted.error(e)
      }
    },
  },
  computed: {
    filteredCountries() {
      return this.countries.slice((this.page * this.total) - this.total, this.page * this.total)
    }
  },
  data() {
    return {
      countries: [],
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
.countries {
  &__item {
    display: grid;
    grid-template-columns: 45px 285px 140px;
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
