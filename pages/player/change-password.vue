<template>
  <div class="change-password">
    <h2 class="change-password__title title">Change Password</h2>
    <form class="change-password__form" @submit.prevent="submit">
      <div class="change-password__form-text">Current Password</div>
      <my-input class="change-password__form-input" type="password" @updateField="updatePassword"/>
      <div class="change-password__form-text">New Password</div>
      <my-input class="change-password__form-input" type="password" @updateField="updateNewPassword"/>
      <my-button class="change-password__form-btn">Change email</my-button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAuth, updatePassword  } from "firebase/auth";

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
  data() {
    return {
      password: '',
      newPassword: ''
    }
  },
  methods: {
    async submit() {
      if(!this.password && !this.newPassword) {
        return this.$toasted.error('All fields are required')
      }
      if(this.password !== this.getUser.password) {
        return this.$toasted.error('Wrong password')
      }
      try {
        const auth = getAuth()
        updatePassword(auth.currentUser, this.newPassword).then(async () => {
          const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/password`)
          await userRef.set(this.newPassword)
        }).catch((error) => {
          return this.$toasted.error(error)
        });
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Your password has been changed')
    },
    updatePassword(field) {
      this.password = field
    },
    updateNewPassword(field) {
      this.newPassword = field
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password {
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
  .change-password__title {
    font-size: 30px;
  }
}
</style>
