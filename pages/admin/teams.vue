<template>
  <div class="teams">
    <admin-panel class="teams__top"
                 addText="team"
                 :edit="edit"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addTeam"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="teams__items">
      <div class="teams__item" :class="{ edit: edit }">
        <div class="teams__item-title" :class="{ active: sort === 'name' }" @click="sortByName">Team</div>
        <div class="teams__item-title" :class="{ active: sort === 'leader' }" @click="sortByLeader">Leader</div>
        <div class="teams__item-title" :class="{ active: sort === 'mainGame' }" @click="sortByMainGame">Main Game</div>
        <div class="teams__item-title" :class="{ active: sort === 'creationDate' }" @click="sortByCreationDate">Creation Date</div>
      </div>
      <div class="teams__item" :class="{ edit: edit }" v-for="item in searchedTeams">
        <div class="teams__item-info">{{ item.name }}</div>
        <div class="teams__item-info">{{ item.leader }}</div>
        <div class="teams__item-info">{{ item.game }}</div>
        <div class="teams__item-info">{{ item.creationDate }}</div>
        <nuxt-link class="teams__item-info edit" v-if="edit" :to="`/admin/edit/team/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTeams']),
    searchedTeams() {
      if(this.filterGame) {
        return this.teams.filter(element => {
          return (element.name.toLowerCase().includes(this.search.toLowerCase())
            || element.leader.toLowerCase().includes(this.search.toLowerCase()))
            && element.game.includes(this.filterGame)
        })
      }
      return this.teams.filter(element => {
        return element.name.toLowerCase().includes(this.search.toLowerCase())
          || element.leader.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    Object.keys(this.getTeams).forEach(item => {
      this.teams.push(this.getTeams[item])
    })
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      teams: [],
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
    addTeam() {
      this.$router.push(`/admin/edit/team/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    cancel() {
      this.$store.dispatch('setTeamsAction')
      this.teams = []
      Object.keys(this.getTeams).forEach(item => {
        this.teams.push(this.getTeams[item])
      })
    },
    async save() {
      const teamsRef = await this.$fire.database.ref('teams')
      try {
        await teamsRef.set(this.getTeams)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Changes have been save')
    },
    sortByName() {
      this.sort = 'name'
      this.teams.sort((a,b) => a.name.localeCompare(b.name))
    },
    sortByLeader() {
      this.sort = 'leader'
      this.teams.sort((a,b) => a.leader.localeCompare(b.leader))
    },
    sortByMainGame() {
      this.sort = 'mainGame'
      this.teams.sort((a,b) => a.game.localeCompare(b.game))
    },
    sortByCreationDate() {
      this.sort = 'creationDate'
      this.teams.sort((a,b) => a.creationDate.localeCompare(b.creationDate))
    },
  }
}
</script>

<style lang="scss" scoped>
.teams {
  &__items {
    border: 2px solid #20252B;
    padding: 13px 30px 0;
  }
  &__item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
