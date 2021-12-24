<template>
  <div class="register">
    <div class="container">
      <div class="register__logo"><img src="/images/logo.png" alt=""></div>
      <h2 class="register__title title-fz32">Sign up 2/2</h2>
      <form class="register__form" @submit.prevent="submit">
        <div class="register__form-items">
          <div class="register__form-item">
            <p class="register__form-text">Username</p>
            <my-input type="text"
                      placeholder="Username"
                      :fail="$v.username.$error"
                      errorMessage="Username must be at least 3 characters"
                      @updateField="updateUsername"/>

          </div>
          <div class="register__form-item">
            <p class="register__form-text">Country</p>
            <my-dropdown title="Choose a country"
                         @updateSelect="updateSelect"
                         :items="countries"/>
            <p class="register__fail-message" v-if="$v.country.$error">Field is required</p>
          </div>
          <div class="register__form-item">
            <p class="register__form-text">Date of birth</p>
            <my-datepicker @updateDate="updateDate" max="Fri Dec 31 2008 02:39:31"/>
            <p class="register__fail-message" v-if="$v.dateOfBirth.$error">Field is required</p>
          </div>
          <div class="register__form-item">
            <my-checkbox class="register__form-checkbox" @updateCheckbox="updateCheckbox">
              <span class="register__form-checkbox-text">I’m have at least 13 years of age
                and agree to the <nuxt-link class="link" to="/">terms of service</nuxt-link>.
              </span>
            </my-checkbox>
            <p class="register__fail-message" v-if="checkboxError">
              You must agree to the user agreement
            </p>
          </div>
          <div class="register__form-item">
            <my-button>
              Create an account
            </my-button>
          </div>
        </div>
      </form>
      <div class="register__already">
        <nuxt-link class="link" to="/auth/login">Already have an account?</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators"
import { getNames } from "country-list"

export default {
  layout: 'auth',
  mounted() {
    this.countries = getNames()
    this.getDateNow()
  },
  data() {
    return {
      username: '',
      country: '',
      countries: '',
      dateOfBirth: '',
      age: 0,
      dateRegistration: '',
      uid: '',
      emailVerified: '',
      checkbox: false,
      checkboxError: false,
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
      this.checkboxError = !this.checkbox;
      if(this.$v.username.$dirty && !this.$v.username.required) {
        this.usernameErrorMsg = 'Required field'
      }
      if(!this.$v.username.$error &&
        !this.$v.country.$error &&
        !this.$v.dateOfBirth.$error &&
        !this.checkboxError) {
        try {
          await this.$fire.auth.createUserWithEmailAndPassword(this.$route.query.email, this.$route.query.password)
            .then((userCredential) => {
              this.uid = userCredential.user.uid
              this.emailVerified = userCredential.user.emailVerified
            })
          const usersRef = await this.$fire.database.ref(`users/${(+new Date()-(+new Date()%100)) / 100}`)
          this.getAge()
          await usersRef.set({
            id: (+new Date()-(+new Date()%100)) / 100,
            uid: this.uid,
            email: this.$route.query.email,
            password: this.$route.query.password,
            emailVerified: this.emailVerified,
            name: '',
            username: this.username,
            country: this.country,
            age: this.age,
            dateOfBirth: this.dateOfBirth,
            dateRegistration: this.dateRegistration,
            img: 'https://i.pinimg.com/736x/df/72/d5/df72d51685e99a265ad186bada408e27.jpg',
            lvl: 0,
            gameProfile: {
              battlenet: '',
              riot: '',
              steam: ''
            },
            eur: 0,
            dtc: 0,
            subscribe: 'free',
            rank: 'user'
          })
        } catch (e) {
          this.$toasted.error(e)
        }
        this.$router.push({
          path: '/auth/register/verify-email',
          query: {
            uid: this.uid
          }
        })
        this.$toasted.success('Success')
      }
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
    updateSelect(select) {
      this.country = select
    },
    updateDate(date) {
      this.dateOfBirth = date
    },
    updateCheckbox(check) {
      if(check) {
        this.checkboxError = false
      }
      this.checkbox = check
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  text-align: center;
  padding-top: 160px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  &__logo {
    margin: 0 auto 44px;
    width: 88px;
  }
  &__form {
    text-align: left;
    margin: 30px 0;
    &-item + &-item {
      margin-top: 16px;
    }
    &-text {
      margin-bottom: 3px;
      font-size: 14px;
    }
    &-checkbox {
      display: flex;
      align-items: center;
    }
    &-checkbox-text {
      color: #627CA3;
      font-size: 14px;
    }
  }
  &__fail-message {
    font-size: 12px;
    color: #B83333;
  }
}
.container {
  padding: 0 15px;
}
@media (max-width: 500px) {
  .register {
    max-width: 300px;
  }
}
</style>
