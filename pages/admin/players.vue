<template>
  <div class="players">
    <admin-panel class="players__top"
                 addText="player"
                 :edit="edit"
                 :filterDisable="true"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addPlayer"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="players__items">
      <div class="players__item" :class="{ edit: edit }">
        <div class="players__item-title" :class="{ active: sort === 'username' }" @click="sortByUsername">Nickname</div>
        <div class="players__item-title" :class="{ active: sort === 'password' }" @click="sortByPassword">Password</div>
        <div class="players__item-title" :class="{ active: sort === 'country' }" @click="sortByCountry">Country</div>
        <div class="players__item-title" :class="{ active: sort === 'team' }" @click="sortByTeam">Team</div>
        <div class="players__item-title" :class="{ active: sort === 'name' }" @click="sortByName">Name</div>
        <div class="players__item-title" :class="{ active: sort === 'created' }" @click="sortByCreated">Created</div>
        <div class="players__item-title" :class="{ active: sort === 'age' }" @click="sortByAge">Age</div>
        <div class="players__item-title" :class="{ active: sort === 'rank' }" @click="sortByRank">Rank</div>
      </div>
      <div class="players__item" :class="{ edit: edit }" v-for="item in searchedPlayers">
        <div class="players__item-info">{{ item.username }}</div>
        <div class="players__item-info">{{ item.password.replace(/[^\s]/g, "*") }}</div>
        <div class="players__item-info">{{ item.country.substr(0, 14) }}</div>
        <div class="players__item-info">{{ item.mainTeam }}</div>
        <div class="players__item-info">{{ item.name }}</div>
        <div class="players__item-info">{{ item.dateRegistration }}</div>
        <div class="players__item-info">{{ item.age }}</div>
        <div class="players__item-info">{{ item.rank }}</div>
        <nuxt-link class="players__item-info edit" v-if="edit" :to="`/admin/edit/player/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getPlayers']),
    searchedPlayers() {
      return this.players.filter(element => {
        return element.username.toLowerCase().includes(this.search.toLowerCase())
          || element.name.toLowerCase().includes(this.search.toLowerCase())
          || element.rank.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    Object.keys(this.getPlayers).forEach(item => {
      this.players.push(this.getPlayers[item])
    })
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      players: [],
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
    addPlayer() {
      this.$router.push(`/admin/edit/player/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    cancel() {
      this.$store.dispatch('setPlayersAction')
      this.players = []
      Object.keys(this.getPlayers).forEach(item => {
        this.players.push(this.getPlayers[item])
      })
    },
    async save() {
      const usersRef = await this.$fire.database.ref('users')
      try {
        await usersRef.set(this.getPlayers)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Changes have been save')
    },
    sortByUsername() {
      this.sort = 'username'
      this.players.sort((a,b) => a.username.localeCompare(b.username))
    },
    sortByPassword() {
      this.sort = 'password'
      this.players.sort((a,b) => a.password.localeCompare(b.password))
    },
    sortByName() {
      this.sort = 'name'
      this.players.sort((a,b) => a.name.localeCompare(b.name))
    },
    sortByCountry() {
      this.sort = 'country'
      this.players.sort((a,b) => a.country.localeCompare(b.country))
    },
    sortByTeam() {
      this.sort = 'team'
      this.players.sort((a,b) => a.mainTeam.localeCompare(b.mainTeam))
    },
    sortByAge() {
      this.sort = 'age'
      this.players.sort((a,b) => a.age - b.age)
    },
    sortByCreated() {
      this.sort = 'created'
      this.players.sort((a,b) => a.dateRegistration.localeCompare(b.dateRegistration))
    },
    sortByRank() {
      this.sort = 'rank'
      this.players.sort((a,b) => a.rank.localeCompare(b.rank))
    }
  }
}
</script>

<style lang="scss" scoped>
  .players {
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
            transform: rotate(180deg);
            margin-top: 0;
          }
        }
      }
      &-info {
        color: #67707A;
        margin-bottom: 15px;
        &.edit {
          color: #CCCDCD;
          cursor: pointer;
        }
      }
      &.edit {
        grid-template-columns: repeat(9, 1fr);
      }
    }
  }
  @media (max-width: 950px) {
    .players__item {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
