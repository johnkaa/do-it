<template>
  <div class="player-edit">
    <div class="player-edit__title">New/Edit Player</div>
    <form class="player-edit__form" @submit.prevent="submit">
      <div class="player-edit__form-inner">
        <div class="player-edit__form-title">Basic info</div>
        <p class="player-edit__form-text">Name</p>
        <my-input class="player-edit__form-input secondary" :field="name" @updateField="updateName"/>
        <p class="player-edit__form-text">Username</p>
        <my-input class="player-edit__form-input secondary" :field="username" @updateField="updateUsername"/>
        <p class="player-edit__form-text">Sex</p>
        <my-dropdown class="player-edit__form-dropdown secondary"
                     :title="sex || `I don't want to talk`"
                     @updateSelect="updateSex"
                     :items="['male', 'female']"/>
        <p class="player-edit__form-text">Country</p>
        <my-dropdown class="player-edit__form-dropdown secondary"
                     :title="country || 'Country'"
                     @updateSelect="updateCountry"
                     :items="countries"/>
        <p class="player-edit__form-text">Date of birth</p>
        <my-datepicker class="player-edit__form-dropdown secondary" :valueDate="date" @updateDate="updateDate"/>
        <p class="player-edit__form-text">Web-site</p>
        <my-input class="player-edit__form-input secondary" :field="website" placeholder="user.com" @updateField="updateWebsite"/>
      </div>
      <div class="player-edit__form-inner">
        <div class="player-edit__form-title">Advance info</div>
        <p class="player-edit__form-text">Avatar 128x128</p>
        <my-file-input name="avatar url" :path="`users/${this.id}/avatar`" :img="img" @uploadFile="uploadImg"/>
      </div>
      <div class="player-edit__form-btns">
        <nuxt-link to="/admin/players" v-if="this.new"><my-button class="player-edit__form-btn secondary">Back</my-button></nuxt-link>
        <div v-else @click="deletePlayer"><my-button class="player-edit__form-btn secondary" type="button">Delete Player</my-button></div>
        <my-button class="player-edit__form-btn secondary">Save changes</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { getNames } from 'country-list'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['getPlayers']),
  mounted() {
    this.id = this.$route.params.id
    this.countries = getNames()
    if(this.getPlayers[this.id]) {
      this.name = this.getPlayers[this.id].name
      this.username = this.getPlayers[this.id].username
      this.sex = this.getPlayers[this.id].sex
      this.date = this.getPlayers[this.id].dateOfBirth
      this.age = this.getPlayers[this.id].age
      this.country = this.getPlayers[this.id].country
      this.website = this.getPlayers[this.id].website
      this.img = this.getPlayers[this.id].img
    } else {
      this.new = true
    }
    this.getDateNow()
  },
  data() {
    return {
      id: '',
      name: '',
      username: '',
      sex: '',
      countries: [],
      country: '',
      date: '',
      website: '',
      img: '',
      age: '',
      now: '',
      new: false
    }
  },
  methods: {
    async submit() {
      if(!this.name && !this.username && !this.sex && !this.country && !this.date && !this.img) {
        return this.$toasted.error('All fields are required!')
      }
      const playerUpdate = {
        id: this.id,
        name: this.name,
        username: this.username,
        sex: this.sex,
        country: this.country,
        date: this.date,
        age: this.age,
        website: this.website,
        now: this.now,
        img: this.img,
      }
      this.$store.dispatch('setPlayerInfoAction', playerUpdate)
      this.$router.push({
        path: '/admin/players',
        query: {
          edit: true
        }
      })
      if(this.new) {
        this.$toasted.success('Player have been created')
      } else {
        this.$toasted.success('Player have been changed')
      }
    },
    deletePlayer() {
      const playerDelete = {
        id: this.id,
        delete: true
      }
      this.$store.dispatch('setPlayerInfoAction', playerDelete)
      this.$router.push({
        path: '/admin/players',
        query: {
          edit: true
        }
      })
      this.$toasted.success('Player have been changed')
    },
    updateName(field) {
      this.name = field
    },
    updateUsername(field) {
      this.username = field
    },
    updateSex(select) {
      this.sex = select
    },
    updateCountry(select) {
      this.country = select
    },
    updateDate(date) {
      this.date = date
      this.getAge()
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
      this.now = date
    },
    getAge() {
      const now = new Date() //Текущя дата
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) //Текущя дата без времени
      const dateOfBirthArray = this.date.split('-')
      const dob = new Date(dateOfBirthArray[2], (dateOfBirthArray[1] - 1), dateOfBirthArray[0]) //Дата рождения
      let age
      //Возраст = текущий год - год рождения
      age = today.getFullYear() - dob.getFullYear()
      //Если ДР в этом году ещё предстоит, то вычитаем из age один год
      if ((today.getMonth() < dateOfBirthArray[1] - 1) || (today.getDate() < dateOfBirthArray[0])) {
        age--
      }
      this.age = age
    },
    updateWebsite(field) {
      this.website = field
    },
    uploadImg(img) {
      this.img = img
    },
  }
}
</script>

<style lang="scss" scoped>
  .player-edit {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
    &__title {
      text-align: center;
      margin-bottom: 30px;
      color: #0F1215;
      background-color: #D8DFEB;
      padding: 30px 0;
      font-weight: 700;
      font-size: 22px;
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
        margin-bottom: 40px;
      }
      &-text {
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
