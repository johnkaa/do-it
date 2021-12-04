<template>
  <div class="edit-account">
    <h2 class="edit-account__title title">Edit account details</h2>
    <form class="edit-account__items" @submit.prevent="submit">
      <div class="edit-account__item">
        <p class="edit-account__item-title">Username</p>
        <my-input @updateField="updateUsername" :fail="$v.username.$error" errorMessage="Username must be at least 3 characters" :valueOfField="username"/>
      </div>
      <div class="edit-account__item">
        <p class="edit-account__item-title">Name</p>
        <my-input @updateField="updateName" :valueOfField="name"/>
      </div>
      <div class="edit-account__item">
        <p class="edit-account__item-title">Country</p>
        <my-dropdown :title="country || 'Choose a country'" @updateSelect="updateCountry" :items="countries"/>
        <p class="edit-account__item-error-message" v-if="$v.country.$error">Field is required</p>
      </div>
      <div class="edit-account__item" v-if="teams">
        <p class="edit-account__item-title">Main Team</p>
        <my-dropdown :title="mainTeam || 'Main Team'" @updateSelect="updateTeam" :items="teams"/>
      </div>
      <div class="edit-account__item">
        <p class="edit-account__item-title">Sex</p>
        <my-dropdown :title="sex || `I don't want to talk`" @updateSelect="updateSex" :items="['male', 'female']"/>
      </div>
      <div class="edit-account__item">
        <p class="edit-account__item-title">Date of birth</p>
        <my-datepicker @updateDate="updateDate" :valueDate="dateOfBirth"/>
        <p class="edit-account__item-error-message" v-if="$v.dateOfBirth.$error">Field is required</p>
      </div>
      <my-button>Change details</my-button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { getNames } from 'country-list'
import { mapGetters } from 'vuex'

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
  async mounted() {
    this.countries = getNames()
    await this.getUserData()
  },
  data() {
    return {
      id: '',
      username: '',
      name: '',
      countries: '',
      country: '',
      teams: '',
      mainTeam: '',
      sex: '',
      age: '',
      dateOfBirth: ''
    }
  },
  validations: {
    username: { required, minLength: minLength(3) },
    country: { required },
    dateOfBirth: { required },
  },
  methods: {
    async submit() {
      this.$v.username.$touch()
      this.$v.country.$touch()
      this.$v.dateOfBirth.$touch()
      if(this.$v.username.$dirty && !this.$v.username.required) {
        this.usernameErrorMsg = 'Required field'
      }
      if(!this.$v.username.$error &&
        !this.$v.country.$error &&
        !this.$v.dateOfBirth.$error) {
        try {
          const usernameRef = this.$fire.database.ref(`users/${this.id}/username`)
          const nameRef = this.$fire.database.ref(`users/${this.id}/name`)
          const countryRef = this.$fire.database.ref(`users/${this.id}/country`)
          const dateOfBirthRef = this.$fire.database.ref(`users/${this.id}/dateOfBirth`)
          const ageRef = this.$fire.database.ref(`users/${this.id}/age`)
          let mainTeamRef
          let sexRef
          if(this.mainTeam) {
            mainTeamRef = this.$fire.database.ref(`users/${this.id}/mainTeam`)
          }
          if(this.sex) {
            sexRef = this.$fire.database.ref(`users/${this.id}/sex`)
          }
          this.getAge()
          await usernameRef.set(this.username)
          await nameRef.set(this.name)
          await countryRef.set(this.country)
          await dateOfBirthRef.set(this.dateOfBirth)
          await ageRef.set(this.age)
          if(this.mainTeam) {
            await mainTeamRef.set(this.mainTeam)
          }
          if(this.sex) {
            await sexRef.set(this.sex)
          }
        } catch (e) {
          this.$toasted.error(e)
        }
        this.$toasted.success('Success')
        this.$router.push({
          path: '/player',
        })
      }
    },
    async getUserData() {
      this.id = this.getUser.id
      this.username = this.getUser.username
      this.name = this.getUser.name
      this.country = this.getUser.country
      this.sex = this.getUser.sex
      this.dateOfBirth = this.getUser.dateOfBirth
    },
    getAge() {
      const now = new Date() //Текущя дата
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) //Текущя дата без времени
      const dateOfBirthArray = this.dateOfBirth.split('-')
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
    updateUsername(field) {
      this.username = field
    },
    updateName(field) {
      this.name = field
    },
    updateCountry(country) {
      this.country = country
    },
    updateTeam(team) {
      this.team = team
    },
    updateSex(sex) {
      this.sex = sex
    },
    updateDate(date) {
      this.dateOfBirth = date
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-account {
    max-width: 500px;
    margin: 0 auto;
    &__title {
      text-align: center;
      margin-bottom: 70px;
    }
    &__items {
      display: flex;
      flex-direction: column;
      max-width: 240px;
      margin: 0 auto;
      gap: 16px;
    }
    &__item {
      &-title {
        font-size: 14px;
        margin-bottom: 6px;
      }
      &-error-message {
        font-size: 12px;
        color: #B83333;
      }
    }
  }
</style>
