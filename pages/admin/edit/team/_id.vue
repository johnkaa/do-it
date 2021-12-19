<template>
  <div class="edit-team">
    <h2 class="edit-team__title title">Edit Team</h2>
    <form class="edit-team__form" @submit.prevent="submit">
      <div class="edit-team__form-inner">
        <div class="edit-team__form-title">Basic info</div>
        <p class="edit-team__form-text">Team name</p>
        <my-input class="edit-team__form-input secondary" placeholder="Team M8B" :field="name" @updateField="updateName"/>
        <p class="edit-team__form-text">Main Game</p>
        <my-dropdown class="edit-team__form-dropdown secondary" :title="game || 'Choose a game'"
                     @updateSelect="updateGame"
                     :items="games"/>
        <div class="edit-team__form-item" v-if="!this.new">
          <p class="edit-team__form-text">Team Leader</p>
          <my-dropdown class="edit-team__form-dropdown secondary" :title="leader || 'Choose a leader'"
                       @updateSelect="updateLeader"
                       :items="playersNames"/>
        </div>
        <p class="edit-team__form-text">Join password</p>
        <my-input class="edit-team__form-input secondary" placeholder="123213423" :field="password" @updateField="updatePassword"/>
        <p class="edit-team__form-text">Country</p>
        <my-dropdown class="edit-team__form-dropdown secondary" :title="country || 'Choose a country'"
                     @updateSelect="updateCountry"
                     :items="countries"/>
        <p class="edit-team__form-text">Web-site</p>
        <my-input class="edit-team__form-input secondary" placeholder="TeamBlacer.com" :field="website" @updateField="updateWebsite"/>
        <p class="edit-team__form-text">URL</p>
        <div class="edit-team__form-url">doit.gg/team/{{ this.id }}</div>
      </div>
      <div class="edit-team__form-inner">
        <div class="edit-team__form-title">Players</div>
        <div class="edit-team__players">
          <div class="edit-team__players-btn" @click="setListType()">List of players</div>
          <div class="edit-team__players-list" v-if="listType">
            <div class="edit-team__players-list-item">
              <div class="edit-team__players-list-item-id">id</div>
              <div class="edit-team__players-list-item-name">name</div>
              <div class="edit-team__players-list-item-delete">delete</div>
            </div>
            <div class="edit-team__players-list-item" v-for="item in (updatedPlayers || players)">
              <div class="edit-team__players-list-item-id">{{ item.id }}</div>
              <div class="edit-team__players-list-item-name">{{ item.name }}</div>
              <div class="edit-team__players-list-item-delete edit" @click="deletePlayer(item.id)">x</div>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-team__form-inner">
        <div class="edit-team__form-title">Advance info</div>
        <p class="edit-team__form-text">Logo 128x128</p>
        <my-file-input name="logo url" :path="`teams/${this.id}/logo`" :img="this.img" @uploadFile="uploadImg"/>
      </div>
      <div class="edit-team__form-btns">
        <nuxt-link :to="`/admin/teams`" v-if="this.new"><my-button class="edit-team__form-btn secondary">Back</my-button></nuxt-link>
        <div @click="deleteNews" v-else><my-button class="edit-team__form-btn secondary" type="button">Delete Team</my-button></div>
        <my-button class="edit-team__form-btn secondary">Save Team</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNames } from "country-list"

export default {
  layout: 'profile',
  computed: mapGetters(['getTeams', 'getGames']),
  mounted() {
    this.id = this.$route.params.id
    this.countries = getNames()
    Object.keys(this.getGames).forEach((item) => {
      this.games.push(this.getGames[item].title)
    })
    if(this.getTeams[this.id]) {
      this.name = this.getTeams[this.id].name
      this.game = this.getTeams[this.id].game
      this.leader = this.getTeams[this.id].leader
      this.password = this.getTeams[this.id].password
      this.country = this.getTeams[this.id].country
      this.website = this.getTeams[this.id].website
      this.img = this.getTeams[this.id].img
      this.date = this.getTeams[this.id].creationDate
      this.players = this.getTeams[this.id].players
    } else {
      this.new = true
      this.getDateNow()
    }
    if(this.players) {
      Object.keys(this.players).forEach(item => this.playersNames.push(this.players[item].name))
    }
  },
  data() {
    return {
      id: '',
      countries: [],
      games: [],
      name: '',
      game: '',
      leader: '',
      password: '',
      country: '',
      website: '',
      img: '',
      players: '',
      updatedPlayers: '',
      playersNames: [],
      listType: false,
      date: '',
      new: false
    }
  },
  methods: {
    async submit() {
      if(!this.name && !this.game && !this.leader && !this.password &&
        !this.country && !this.website && !this.img) {
        return this.$toasted.error('All fields are required!')
      }
      const TeamUpdate = {
        id: this.id,
        name: this.name,
        game: this.game,
        leader: this.leader,
        password: this.password,
        country: this.country,
        date: this.date,
        website: this.website,
        img: this.img,
      }
      this.$store.dispatch('setTeamInfoAction', TeamUpdate)
      this.$router.push({
        path: '/admin/teams',
        query: {
          edit: true
        }
      })
      if(this.new) {
        this.$toasted.success('Team have been created')
      } else {
        this.$toasted.success('Team have been changed')
      }
    },
    deleteNews() {
      const TeamDelete = {
        id: this.id,
        delete: false
      }
      this.$store.dispatch('setTeamInfoAction', TeamDelete)
      this.$router.push({
        path: '/admin/teams',
        query: {
          edit: true
        }
      })
      this.$toasted.success('Team have been changed')
    },
    getDateNow() {
      const dateObj = new Date()
      let day = dateObj.getDate()
      let month = (dateObj.getMonth() + 1)
      if(day < 10) {
        day = '0' + day
      }
      if(month < 10) {
        month = '0' + month
      }
      this.date = day + '/' + month + '/' + dateObj.getFullYear()
    },
    updateName(field) {
      this.name = field
    },
    updateGame(select) {
      this.game = select
    },
    updateLeader(select) {
      this.leader = select
    },
    updatePassword(field) {
      this.password = field
    },
    updateCountry(select) {
      this.country = select
    },
    updateWebsite(field) {
      this.website = field
    },
    uploadImg(img) {
      this.img = img
    },
    setListType() {
      this.listType = !this.listType
    },
    deletePlayer(id) {
      if(Object.keys(this.players).length === 1) {
        return this.$toasted.error('There must be at least 1 player')
      }
      delete this.players[id]
      this.updatedPlayers = this.players
      this.updatedPlayers = ''
      this.$toasted.success('Success')
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-team {
  width: 100%;
  padding-bottom: 100px;
  &__title {
    text-align: center;
    margin-bottom: 30px;
  }
  &__form {
    color: #CCCDCD;
    max-width: 620px;
    margin: 0 auto;
    &-inner {
      padding: 44px 60px;
      border: 1px solid #20252B;
      margin-bottom: 33px;
    }
    &-title {
      font-weight: 700;
      margin-bottom: 12px;
    }
    &-input {
      margin-bottom: 22px;
    }
    &-dropdown {
      margin-bottom: 22px;
    }
    &-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 34px;
    }
    &-btn {
      max-width: 160px;
    }
  }
  &__players {
    &-btn {
      color: #0A61E1;
      font-weight: 700;
      padding: 12px 16px;
      background-color: #1A222D;
      cursor: pointer;
      max-width: 150px;
    }
    &-list {
      margin-top: 10px;
      &-item {
        display: grid;
        text-align: center;
        grid-template-columns: 1fr 1fr 1fr;
        &-delete.edit {
          color: red;
          max-width: 10px;
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
