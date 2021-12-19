<template>
  <div class="tournaments">
    <admin-panel class="tournaments__top"
                 addText="tournament"
                 :edit="edit"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addTournament"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="tournaments__items">
      <div class="tournaments__item" :class="{ edit: edit }">
        <div class="tournaments__item-title" :class="{ active: sort === 'title' }" @click="sortByTitle">Tournament's name</div>
        <div class="tournaments__item-title" :class="{ active: sort === 'entry' }" @click="sortByEntry">Entry price</div>
        <div class="tournaments__item-title" :class="{ active: sort === 'pool' }" @click="sortByPool">Pool price</div>
        <div class="tournaments__item-title" :class="{ active: sort === 'signed' }" @click="sortBySigned">Signed</div>
        <div class="tournaments__item-title" :class="{ active: sort === 'start' }" @click="sortByStart">Start In</div>
      </div>
      <div class="tournaments__item" :class="{ edit: edit }" v-for="item in searchedTournaments">
        <div class="tournaments__item-info">{{ item.title }}</div>
        <div class="tournaments__item-info">{{ item.entryPrice }}</div>
        <div class="tournaments__item-info">{{ item.prizePool }}</div>
        <div class="tournaments__item-info" v-if="item.players">{{ item.players.length }} / {{ item.maxPlayers || '∞' }}</div>
        <div class="tournaments__item-info" v-else>0 / {{ item.maxPlayers || '∞' }}</div>
        <div class="tournaments__item-info">{{ item.startDate }}</div>
        <nuxt-link class="tournaments__item-info edit" v-if="edit" :to="`/admin/edit/tournament/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTournaments']),
    searchedTournaments() {
      if(this.filterGame) {
        return this.tournaments.filter(element => {
          return element.title.toLowerCase().includes(this.search.toLowerCase()) &&
            element.game.includes(this.filterGame)
        })
      }
      return this.tournaments.filter(element => {
        return element.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    setTimeout(() => {
      if(this.getTournaments) {
        Object.keys(this.getTournaments).forEach(item => {
          this.tournaments.push(this.getTournaments[item])
        })
      }
    }, 200)
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      tournaments: [],
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
    addTournament() {
      this.$router.push(`/admin/edit/tournament/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    cancel() {
      this.$store.dispatch('setTournamentsAction')
      this.events = []
      Object.keys(this.getTournaments).forEach(item => {
        this.events.push(this.getTournaments[item])
      })
    },
    async save() {
      const tournamentsRef = await this.$fire.database.ref('tournaments')
      try {
        await tournamentsRef.set(this.getTournaments)
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
.tournaments {
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
