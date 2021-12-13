<template>
  <div class="change-email">
    <h2 class="change-email__title title">Change email address</h2>
    <form class="change-email__form" @submit.prevent="submit">
      <div class="change-email__form-text">Current Password</div>
      <my-input class="change-email__form-input" type="password" @updateField="updatePassword"/>
      <div class="change-email__form-text">New Email</div>
      <my-input class="change-email__form-input" type="email" @updateField="updateEmail"/>
      <my-button class="change-email__form-btn">Change email</my-button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAuth, updateEmail } from "firebase/auth";

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
  data() {
    return {
      password: '',
      email: ''
    }
  },
  methods: {
    async submit() {
      if(!this.password && !this.email) {
        return this.$toasted.error('All fields are required')
      }
      if(this.password !== this.getUser.password) {
        return this.$toasted.error('Wrong password')
      }
      try {
        const auth = getAuth()
        updateEmail(auth.currentUser, this.email).then(async () => {
          const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/email`)
          await userRef.set(this.email)
        }).catch((error) => {
          return this.$toasted.error(error)
        });
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Your email has been changed')
    },
    updatePassword(field) {
      this.password = field
    },
    updateEmail(field) {
      this.email = field
    }
  }
}
</script>

<style lang="scss" scoped>
  .change-email {
    max-width: 100%;
    margin: 0 auto;
    &__title {
      margin-bottom: 45px;
    }
    &__form {
      &-text {
        font-size: 14px;
        margin-bottom: 6px;
      }
      &-input {
        margin-bottom: 16px;
      }
      &-btn {
        margin-top: 22px;
        max-width: 340px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  @media (max-width: 500px) {
    .change-email__title {
      font-size: 30px;
    }
  }
</style>
