<template>
  <div class="leagues">
    <admin-panel class="leagues__top"
                 addText="league"
                 :edit="edit"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addLeague"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="leagues__items">
      <div class="leagues__item" :class="{ edit: edit }">
        <div class="leagues__item-title" :class="{ active: sort === 'title' }" @click="sortByTitle">League's name</div>
        <div class="leagues__item-title" :class="{ active: sort === 'entry' }" @click="sortByEntry">Entry price</div>
        <div class="leagues__item-title" :class="{ active: sort === 'pool' }" @click="sortByPool">Pool price</div>
        <div class="leagues__item-title" :class="{ active: sort === 'signed' }" @click="sortBySigned">Signed</div>
        <div class="leagues__item-title" :class="{ active: sort === 'start' }" @click="sortByStart">Start In</div>
      </div>
      <div class="leagues__item" :class="{ edit: edit }" v-for="item in searchedLeagues">
        <div class="leagues__item-info">{{ item.title }}</div>
        <div class="leagues__item-info">{{ item.entryPrice }}</div>
        <div class="leagues__item-info">{{ item.prizePool }}</div>
        <div class="leagues__item-info" v-if="item.players">{{ item.players.length }} / {{ item.maxPlayers || '∞' }}</div>
        <div class="leagues__item-info" v-else>0 / {{ item.maxPlayers || '∞' }}</div>
        <div class="leagues__item-info">{{ item.startDate }}</div>
        <nuxt-link class="leagues__item-info edit" v-if="edit" :to="`/admin/edit/league/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLeagues']),
    searchedLeagues() {
      if(this.filterGame) {
        return this.leagues.filter(element => {
          return element.title.toLowerCase().includes(this.search.toLowerCase()) &&
            element.game.includes(this.filterGame)
        })
      }
      return this.leagues.filter(element => {
        return element.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    if(this.getLeagues) {
      Object.keys(this.getLeagues).forEach(item => {
        this.leagues.push(this.getLeagues[item])
      })
    }
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      leagues: [],
      sort: '',
      edit: false
    }
  },
  methods: {
    updateSearch(field) {
      this.search = field
    },
    updateFilter(game) {
      this.filterGame = game
    },
    setEdit(edit) {
      this.edit = edit
    },
    addLeague() {
      this.$router.push(`/admin/edit/league/${(+new Date()-(+new Date()%100)) / 10}`)
    },
    cancel() {
      this.$store.dispatch('setLeaguesAction')
      this.events = []
      Object.keys(this.getLeagues).forEach(item => {
        this.events.push(this.getLeagues[item])
      })
    },
    async save() {
      const leaguesRef = await this.$fire.database.ref('leagues')
      try {
        await leaguesRef.set(this.getLeagues)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Changes have been save')
    },
    sortByTitle() {
      this.sort = 'title'
      this.tournaments.sort((a,b) => a.title.localeCompare(b.title))
    },
    sortByEntry() {
      this.sort = 'entry'
      this.tournaments.sort((a,b) => {
        if(Number.isInteger(+a.entryPrice.slice(1))) {
          return a.entryPrice.slice(1) - b.entryPrice.slice(1)
        } else {
          return a.entryPrice.localeCompare(b.entryPrice)
        }
      })
    },
    sortByPool() {
      this.sort = 'pool'
      this.tournaments.sort((a,b) => {
        if(Number.isInteger(+a.prizePool.slice(1))) {
          return a.prizePool.slice(1) - b.prizePool.slice(1)
        } else {
          return a.prizePool.localeCompare(b.prizePool)
        }
      })
    },
    sortBySigned() {
      this.sort = 'signed'
      if(this.tournaments.players) {
        this.tournaments.sort((a,b) => a.players.length.localeCompare(b.players.length))
      }
    },
    sortByStart() {
      this.sort = 'start'
      this.tournaments.sort((a,b) => a.startDate.localeCompare(b.startDate))
    },
  }
}
</script>

<style lang="scss" scoped>
.leagues {
  &__items {
    border: 2px solid #20252B;
    padding: 13px 30px 0;
  }
  &__item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    min-height: 48px;
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
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
