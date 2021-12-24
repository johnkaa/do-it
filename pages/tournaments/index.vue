<template>
  <div class="games">
    <div class="games__top">
      <h2 class="games__title title">Tournaments</h2>
      <input class="games__search" placeholder="Search the game" v-model="searchField" />
    </div>
    <div class="games__items">
      <games-card class="games__item"
                  v-for="(item, index) in filteredGames"
                  :key="index"
                  :title="item.title"
                  :img="item.img"
                  @click="$router.push(`/tournaments/${item.title}`)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Tournaments'
  },
  computed: {
    ...mapGetters(['getGames']),
    filteredGames() {
      return this.games.filter(element => {
        return element.title.toLowerCase().includes(this.searchField.toLowerCase())
      })
    }
  },
  mounted() {
    this.$store.dispatch('setGamesAction')
    setTimeout(() => {
      Object.keys(this.getGames).forEach(item => this.games.push(this.getGames[item]))
    }, 200)
  },
  data() {
    return {
      games: [],
      searchField: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.games {
  padding-top: 90px;
  padding-bottom: 30px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  &__search {
    border: 2px solid #20252B;
    border-radius: 4px;
    background-color: transparent;
    color: #fff;
    padding: 12px 16px;
    margin-right: -36px;
    margin-left: 36px;
    max-width: 520px;
    width: 100%;
    &:focus {
      outline: none;
      border-color: lighten(#20252B, 10%);
    }
    &::placeholder {
      color: #CCCDCD;
    }
  }
  &__items {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 56px;
    row-gap: 15px;
  }
  &__item {
    max-width: 349px;
    max-height: 500px;
    height: 100%;
    width: 100%;
    display: block;
  }
}
@media (max-width: 1300px) {
  .games__search {
    margin-right: 0;
  }
}
@media (max-width: 800px) {
  .games {
    &__items {
      flex-direction: column;
    }
    &__item {
      max-width: 100%;
    }
  }
}
</style>
