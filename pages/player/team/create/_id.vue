<template>
  <div class="create-team">
    <h2 class="create-team__title title">Create Team</h2>
    <form class="create-team__form" @submit.prevent="submit">
      <div class="create-team__form-inner">
        <div class="create-team__form-title">Basic info</div>
        <p class="create-team__form-text">Team name</p>
        <my-input class="create-team__form-input secondary" placeholder="Team M8B" @updateField="updateName"/>
        <p class="create-team__form-text">Main Game</p>
        <my-dropdown class="create-team__form-dropdown secondary" title="Choose a game"
                     @updateSelect="updateGame"
                     :items="games"/>
        <p class="create-team__form-text">Team Leader</p>
        <my-input class="create-team__form-input secondary" placeholder="user" @updateField="updateLeader"/>
        <p class="create-team__form-text">Join password</p>
        <my-input class="create-team__form-input secondary" placeholder="123213423" @updateField="updatePassword"/>
        <p class="create-team__form-text">Country</p>
        <my-dropdown class="create-team__form-dropdown secondary" title="Choose a country"
                     @updateSelect="updateCountry"
                     :items="countries"/>
        <p class="create-team__form-text">Web-site</p>
        <my-input class="create-team__form-input secondary" placeholder="TeamBlacer.com" @updateField="updateWebsite"/>
        <p class="create-team__form-text">URL</p>
        <div class="create-team__form-url">doit.gg/team/{{ this.id }}</div>
      </div>
      <div class="create-team__form-inner">
        <div class="create-team__form-title">Advance info</div>
        <p class="create-team__form-text">Logo 128x128</p>
        <my-file-input name="logo url" :path="`teams/${this.id}/logo`" @uploadFile="uploadImg"/>
      </div>
      <div class="create-team__form-btns">
        <nuxt-link to="/player/team"><my-button class="create-team__form-btn secondary">Back</my-button></nuxt-link>
        <my-button class="create-team__form-btn secondary">Save Team</my-button>
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
  },
  async mounted() {
    this.id = this.$route.params.id
    this.countries = getNames()
    this.players[this.getUser.id] = {
      id: this.getUser.id,
      name: this.getUser.username
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
      players: {},
      dateRegistration: ''
    }
  },
  methods: {
    async submit() {
      if(!this.name && !this.game && !this.leader && !this.password &&
        !this.country && !this.website && !this.img) {
        return this.$toasted.error('All fields are required!')
      }
      this.getDateNow()
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
          dateRegistration: this.dateRegistration,
        })
      } catch (e) {
        return this.$toasted.error(e)
      }
      const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/teams/${this.id}`)
      try {
        await userRef.set({
          id: this.id,
          name: this.name,
        })
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Success')
    },
    getDateNow() {
      const dateObj = new Date()
      let date = dateObj.getDate() + '.' +  (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
      if(dateObj.getDate() < 10) {
        date = '0' + dateObj.getDate() + '.' +  (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
      }
      if((dateObj.getMonth() + 1) < 10) {
        date = dateObj.getDate() + '.' + '0' +  (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
      }
      if(dateObj.getDate() < 10 && (dateObj.getMonth() + 1) < 10) {
        date = '0' + dateObj.getDate() + '.' + '0' +  (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
      }
      this.dateRegistration = date
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-team {
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
  }
</style>
