<template>
  <div class="games">
    <div class="games__items">
      <div class="games__item">
        <div class="games__item-rank">Rank</div>
        <div class="games__item-name">Name</div>
        <div class="games__item-players">Players</div>
      </div>
      <div class="games__item" v-for="item in filteredGames">
        <div class="games__item-rank">{{ item.rank }}</div>
        <div class="games__item-name">{{ item.name }}</div>
        <div class="games__item-players">{{ item.players }}</div>
      </div>
      <my-pagination :total="total" :item="games.length" @getPage="changePage" v-if="this.filteredGames.length > 6"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['year'],
  async fetch() {
    const topRef = this.$fire.database.ref('top')
    try {
      const snapshot = await topRef.once('value')
      this.games = snapshot.val()[this.year].games
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  watch: {
    async year() {
      const topRef = this.$fire.database.ref('top')
      try {
        const snapshot = await topRef.once('value')
        this.games = snapshot.val()[this.year].games
      } catch (e) {
        this.$toasted.error(e)
      }
    },
  },
  computed: {
    filteredGames() {
      return this.games.slice((this.page * this.total) - this.total, this.page * this.total)
    }
  },
  data() {
    return {
      games: [],
      page: 1,
      total: 6
    }
  },
  methods: {
    changePage(page) {
      this.page = page
    }
  }
}
</script>

<style lang="scss" scoped>
  .games {
    &__item {
      display: grid;
      grid-template-columns: 45px 110px 140px;
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
      & + & {
        margin-top: 20px;
      }
    }
  }
</style>
