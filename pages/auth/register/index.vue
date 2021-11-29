<template>
  <div class="register">
    <div class="container">
      <div class="register__logo"><img src="/images/logo.png" alt=""></div>
      <h2 class="register__title title-fz32">Sign up 1/2</h2>
      <form class="register__form" @submit.prevent="submit">
        <div class="register__form-items">
          <div class="register__form-item">
            <p class="register__form-text">Email</p>
            <my-input type="text"
                      placeholder="google@gmail.com"
                      :fail="$v.email.$error"
                      :errorMessage="emailErrorMsg"
                      :success="!$v.email.$invalid"
                      @updateField="updateEmail"/>
          </div>
          <div class="register__form-item">
            <p class="register__form-text">Password</p>
            <my-input type="password"
                      placeholder="Password"
                      :fail="$v.password.$error"
                      :errorMessage="passwordErrorMsg"
                      :success="!$v.password.$invalid"
                      @updateField="updatePassword"/>
          </div>
          <div class="register__form-item">
            <my-button>Next step</my-button>
          </div>
        </div>
      </form>
      <div class="register__with">
        <div class="register__with-text">or signup with</div>
        <div class="register__with-items">
          <img class="register__with-item" src="/images/login-with/facebook.png" alt="">
          <img class="register__with-item" src="/images/login-with/battle-net.png" alt="">
          <img class="register__with-item" src="/images/login-with/google.png" alt="">
          <img class="register__with-item" src="/images/login-with/steam.png" alt="">
        </div>
      </div>
      <div class="register__already">
        <nuxt-link class="link" to="/auth/login">Already have an account?</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators"
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      emailErrorMsg: 'Invalid email',
      passwordErrorMsg: 'Password must be at least 6 characters'
    }
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required },
  },
  methods: {
    submit() {
      this.$v.email.$touch()
      this.$v.password.$touch()
      if(this.$v.email.$dirty && !this.$v.email.required) {
        this.emailErrorMsg = 'Required field'
      }
      if(this.$v.password.$dirty && !this.$v.password.required) {
        this.passwordErrorMsg = 'Required field'
      }
      if(!this.$v.email.$invalid && !this.$v.password.$invalid) {
        this.$router.push({
          path: '/auth/register/next-step',
          query: {
            email: this.email,
            password: this.password,
          }
        })
      }
    },
    updateEmail(field) {
      this.email = field
    },
    updatePassword(field) {
      this.password = field
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
    }
    &__with {
      &-text {
        color: #627CA3;
        margin-bottom: 16px;
      }
      &-items {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
      }
      &-item {
        border: 1px solid #16263D;
        padding: 8px;
        cursor: pointer;
        & + & {
          margin-left: 8px;
        }
        &:last-child {
          padding: 12px;
        }
      }
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
