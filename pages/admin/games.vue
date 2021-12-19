<template>
  <div class="games">
    <admin-panel class="games__top"
                 addText="game"
                 :edit="edit"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addGame"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="games__items">
      <div class="games__item" :class="{ edit: edit }">
        <div class="games__item-title" :class="{ active: sort === 'title' }" @click="sortByTitle">Title</div>
        <div class="games__item-title" :class="{ active: sort === 'active' }" @click="sortByActive">Active</div>
      </div>
      <div class="games__item" :class="{ edit: edit }" v-for="item in searchedGames">
        <div class="games__item-info">{{ item.title }}</div>
        <div class="games__item-info">{{ item.tournamentsActive }}</div>
        <nuxt-link class="games__item-info edit" v-if="edit" :to="`/admin/edit/game/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getGames']),
    searchedGames() {
      if(this.filterGame) {
        return this.games.filter(element => {
          return element.title.toLowerCase().includes(this.search.toLowerCase()) &&
            element.title.includes(this.filterGame)
        })
      }
      return this.games.filter(element => {
        return element.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    Object.keys(this.getGames).forEach(item => {
      this.games.push(this.getGames[item])
    })
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      games: [],
      sort: '',
      edit: false
    }
  },
  methods: {
    updateFilter(game) {
      this.filterGame = game
    },
    updateSearch(field) {
      this.search = field
    },
    setEdit(edit) {
      this.edit = edit
    },
    addGame() {
      this.$router.push(`/admin/edit/game/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    cancel() {
      this.$store.dispatch('setGamesAction')
      this.games = []
      Object.keys(this.getGames).forEach(item => {
        this.games.push(this.getGames[item])
      })
    },
    async save() {
      const gamesRef = await this.$fire.database.ref('games')
      try {
        await gamesRef.set(this.getGames)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Changes have been save')
    },
    sortByTitle() {
      this.sort = 'title'
      this.games.sort((a,b) => a.title.localeCompare(b.title))
    },
    sortByActive() {
      this.sort = 'active'
      this.games.sort((a,b) => a.tournamentsActive.localeCompare(b.tournamentsActive))
    },
  }
}
</script>

<style lang="scss" scoped>
.games {
  &__items {
    border: 2px solid #20252B;
    padding: 13px 30px 0;
  }
  &__item {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    text-align: center;
    &-title {
      color: #E6E6E6;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      &:hover {
        background-color: rgba(#67707A, .3);
      }
      &::after {
        content: url(static/images/icons/sort-arrows.svg);
        display: inline-block;
        margin-top: 8px;
      }
      &.active {
        &::after {
          content: url(static/images/icons/sort-arrow.svg);
        }
      }
    }
    &-info {
      color: #67707A;
      margin-bottom: 15px;
    }
    &.edit {
      grid-template-columns: repeat(9, 1fr);
    }
  }
}
</style>
