<template>
  <div class="game-profile">
    <h2 class="game-profile__title title">Game profile</h2>
    <form class="game-profile__form" @submit.prevent="submit">
      <div class="game-profile__form-inner">
        <div class="game-profile__form-title">Game profile</div>
        <p class="game-profile__form-text">Riot Games account</p>
        <my-input class="game-profile__form-input secondary" placeholder="Edek#43234" :field="getUser.gameProfile.riot" @updateField="updateRiot"/>
        <p class="game-profile__form-text">Battlenet</p>
        <my-input class="game-profile__form-input secondary" placeholder="dududud#23432" :field="getUser.gameProfile.battlenet" @updateField="updateBattlenet"/>
        <p class="game-profile__form-text">SteamID</p>
        <my-input class="game-profile__form-input secondary" placeholder="21321321321321" :field="getUser.gameProfile.steam" @updateField="updateSteam"/>
      </div>
      <my-button class="game-profile__form-btn secondary">Save Profile</my-button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
  data() {
    return {
      riot: '',
      battlenet: '',
      steam: ''
    }
  },
  methods: {
    async submit() {
      const userGameProfileRef = await this.$fire.database.ref(`users/${this.getUser.id}/gameProfile`)
      try {
        await userGameProfileRef.set({
          riot: this.riot,
          battlenet: this.battlenet,
          steam: this.steam,
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      this.$toasted.success('Game profile has been changed')
    },
    updateRiot(field) {
      this.riot = field
    },
    updateBattlenet(field) {
      this.battlenet = field
    },
    updateSteam(field) {
      this.steam = field
    },
  }
}
</script>

<style lang="scss" scoped>
  .game-profile {
    width: 100%;
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
      &-btn {
        max-width: 160px;
        margin: 0 auto;
        display: block;
      }
    }
  }
</style>
