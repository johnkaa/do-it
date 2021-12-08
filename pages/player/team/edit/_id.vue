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
        <p class="edit-team__form-text">Team Leader</p>
        <my-input class="edit-team__form-input secondary" placeholder="user" :field="leader" @updateField="updateLeader"/>
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
        <nuxt-link :to="`/player/team/manage/${this.id}`"><my-button class="edit-team__form-btn secondary">Back</my-button></nuxt-link>
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
  computed: mapGetters(['getUser']),
  async fetch() {
    const gamesRef = this.$fire.database.ref('games')
    try {
      const snapshot = await gamesRef.once('value')
      const games = snapshot.val()
      Object.keys(games).forEach((item) => {
        this.games.push(games[item].title)
      })
    } catch (e) {
      this.$toasted.error(e)
    }
    const teamsRef = this.$fire.database.ref(`teams/${this.id}`)
    try {
      const snapshot = await teamsRef.once('value')
      const team = snapshot.val()
      this.name = team.name
      this.game = team.game
      this.leader = team.leader
      this.password = team.password
      this.country = team.country
      this.website = team.website
      this.img = team.img
      this.players = team.players
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.countries = getNames()
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
      listType: false
    }
  },
  methods: {
    async submit() {
      if(!this.name && !this.game && !this.leader && !this.password &&
        !this.country && !this.website && !this.img) {
        return this.$toasted.error('All fields are required!')
      }
      const teamsRef = await this.$fire.database.ref(`teams/${this.id}`)
      try {
        await teamsRef.set({
          id: this.id,
          name: this.name,
          game: this.game,
          leader: this.leader,
          password: this.password,
          country: this.country,
          website: this.website,
          img: this.img,
          players: this.players,
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/teams/${this.id}`)
      try {
        await userRef.set({
          id: this.id,
          name: this.name,
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      this.$toasted.success('Success')
    },
    updateName(field) {
      this.name = field
    },
    updateGame(select) {
      this.game = select
    },
    updateLeader(field) {
      this.leader = field
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
