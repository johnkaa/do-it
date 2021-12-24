<template>
  <div class="top">
    <div class="top__top">
      <div class="top__title">Top of <div class="top__title-year" @mouseout="setYearsActive" @mouseover="setYearsActive">
        {{ year }}
        <div class="top__years" :class="{ active: yearsActive }">
          <div class="top__year" v-for="item in years" @click="year = item">{{ item }}</div>
        </div>
      </div></div>
      <div class="top__top-items">
        <div class="top__top-item">Total Tournaments: <span>{{ tournaments }}</span></div>
        <div class="top__top-item">Total Prize money: <span>{{ prize }}</span></div>
        <div class="top__top-item">Total Players: <span>{{ totalPlayers }}</span></div>
      </div>
    </div>
    <div class="top__nav">
      <nuxt-link class="top__nav-link" :class="{ active: this.$route.path.slice(10) === 'countries' }" :to="`/top/${year}/countries`">Top Countries</nuxt-link>
      <nuxt-link class="top__nav-link" :class="{ active: this.$route.path.slice(10) === 'players' }" :to="`/top/${year}/players`">Top Players</nuxt-link>
      <nuxt-link class="top__nav-link" :class="{ active: this.$route.path.slice(10) === 'teams' }" :to="`/top/${year}/teams`">Top Teams</nuxt-link>
      <nuxt-link class="top__nav-link" :class="{ active: this.$route.path.slice(10) === 'games' }" :to="`/top/${year}/games`">Top Games</nuxt-link>
    </div>
    <nuxt-child class="top__inner" :year="year"/>
  </div>
</template>

<script>
export default {
  async fetch() {
    const topRef = this.$fire.database.ref('top')
    try {
      const snapshot = await topRef.once('value')
      this.tournaments = snapshot.val()[this.year].tournaments
      this.prize = snapshot.val()[this.year].prize
      this.totalPlayers = snapshot.val()[this.year].totalPlayers
      Object.keys(snapshot.val()).forEach(item => this.years.push(item))
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  watch: {
    async year() {
      const topRef = this.$fire.database.ref('top')
      try {
        const snapshot = await topRef.once('value')
        this.tournaments = snapshot.val()[this.year].tournaments
        this.prize = snapshot.val()[this.year].prize
        this.totalPlayers = snapshot.val()[this.year].totalPlayers
      } catch (e) {
        this.$toasted.error(e)
      }
    },
  },
  mounted() {
    this.year = this.$route.params.year
  },
  data() {
    return {
      years: [],
      year: '',
      tournaments: '',
      prize: '',
      totalPlayers: '',
      yearsActive: false
    }
  },
  methods: {
    setYearsActive() {
      this.yearsActive = !this.yearsActive
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    &__top {
      &-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
      }
      &-item {
        font-size: 22px;
        font-weight: 700;
        color: #E6E8EB;
        span {
          font-weight: 400;
          color: #8995A3;
          margin-left: 16px;
        }
      }
    }
    &__title {
      font-size: 44px;
      line-height: 100%;
      font-weight: 700;
      color: #F5F5F5;
      margin-top: 90px;
      margin-bottom: 50px;
      display: flex;
      gap: 10px;
      justify-content: center;
      &-year {
        color: #2787F6;
        position: relative;
        padding-right: 30px;
        cursor: pointer;
        &::after {
          content: '▼';
          font-size: 22px;
          color: #fff;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    &__years {
      display: none;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center;
      color: #fff;
      background-color: #0F1215;
      font-size: 16px;
      border: 2px solid #242B33;
      cursor: pointer;
      &.active {
        display: block;
      }
    }
    &__year + &__year {
      border-top: 2px solid #242B33;
    }
    &__nav {
      display: flex;
      &-link {
        font-size: 22px;
        font-weight: 700;
        max-width: 294px;
        width: 100%;
        text-align: center;
        padding: 22px;
        border: 2px solid #242B33;
        border-bottom: none;
        &.active {
          color: #0F1215;
          background-color: #D8DFEB;
        }
        & + & {
          border-left: none;
        }
      }
    }
    &__inner {
      border: 2px solid #242B33;
    }
  }
</style>
