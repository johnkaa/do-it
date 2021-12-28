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

export default {
  head: {
    title: 'Tournaments'
  },
  async asyncData({ $fire }) {
    const gamesRef = $fire.database.ref('games')
    try {
      const snapshot = await gamesRef.once('value')
      const gamesObj = snapshot.val()
      return { gamesObj }
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  computed: {
    filteredGames() {
      return this.games.filter(element => {
        return element.title.toLowerCase().includes(this.searchField.toLowerCase())
      })
    }
  },
  mounted() {
    Object.keys(this.gamesObj).forEach(item => this.games.push(this.gamesObj[item]))
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
