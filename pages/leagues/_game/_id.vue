<template>
  <div class="league">
    <div class="league__top">
      <div class="league__top-text">
        <div class="league__title title">{{ game }}: Leagues</div>
      </div>
      <div class="league__logo">
        <img :src="icon" alt="">
      </div>
    </div>
    <div class="league__inner">
      <div class="league__inner-item">
        <div class="league__nav">
          <nuxt-link class="league__nav-item" :to="`/leagues/${game}/${id}`">Info</nuxt-link>
          <nuxt-link class="league__nav-item" :to="`/leagues/${game}/${id}/play`">Play</nuxt-link>
          <nuxt-link class="league__nav-item" :to="`/leagues/${game}/${id}/standings`">Standings</nuxt-link>
          <nuxt-link class="league__nav-item" :to="`/leagues/${game}/${id}/rules`">Rules</nuxt-link>
          <nuxt-link class="league__nav-item" :to="`/leagues/${game}/${id}/support`">Support</nuxt-link>
        </div>
        <nuxt-child class="league__info"/>
      </div>
      <div class="league__requirements">
        <div class="league__requirements-title">Requirements</div>
        <div class="league__requirements-inner">
          <div class="league__requirements-age" v-if="league.minAge">
            <div class="league__requirements-inner-title">Minimum age</div>
            <div class="league__requirements-inner-text">At least {{ league.minAge }} years old</div>
          </div>
          <div class="league__requirements-inner-title">Residence</div>
          <nuxt-link class="league__requirements-inner-link" to="/">More info</nuxt-link>
          <div class="league__requirements-play">
            <div class="league__requirements-age">
              <div class="league__requirements-inner-title">Entry price</div>
              <div class="league__requirements-inner-text">{{ league.entryPrice }}</div>
            </div>
            <div class="league__requirements-inner-title">Play</div>
            <div class="league__requirements-inner-text">Please log in to take part in this tournament.</div>
          </div>
        </div>
        <div class="league__requirements-sign">
          <div class="league__requirements-sign-warning">Register close in {{ league.startDate }}</div>
          <div class="league__requirements-sign-btn" @click="unregister" v-if="registered">
            <my-button class="secondary">Unregister</my-button>
          </div>
          <nuxt-link class="tournament__requirements-sign-btn" v-else-if="!this.$fire.auth.currentUser" to="/auth/login">
            <my-button>Log in / Register</my-button>
          </nuxt-link>
          <div class="league__requirements-sign-btn" @click="register" v-else>
            <my-button>Register</my-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['getLeagues', 'getGames', 'getUser']),
  mounted() {
    this.id = this.$route.params.id
    this.game = this.$route.params.game
    this.$store.dispatch('setLeaguesAction')
    this.$store.dispatch('setGamesAction')
    setTimeout(() => {
      Object.keys(this.getGames).forEach(item => {
        if(this.getGames[item].title === this.game) {
          this.icon = this.getGames[item].gameIconImg
        }
      })
      Object.keys(this.getLeagues).forEach(item => {
        if(this.getLeagues[item].id === this.id) {
          this.league = this.getLeagues[item]
        }
      })
      if(this.league.players) {
        Object.keys(this.league.players).forEach(item => {
          if(this.league.players[item].id === this.getUser.id) {
            this.registered = true
          }
        })
      }
    }, 500)
  },
  data() {
    return {
      id: '',
      game: '',
      icon: '',
      league: '',
      registered: false,
    }
  },
  methods: {
    async register() {
      if(!this.$fire.auth.currentUser) {
        return this.$toasted.error(`You're not logged in`)
      }
      if(this.league.entryPrice === 'Premium' && this.getUser.subscribe === 'free') {
        return this.$toasted.error('This league only for premium users')
      }
      if(this.league.entryPrice === 'Private') {
        return this.$toasted.error('This league is private, ask the host to add you')
      }
      if(this.league.maxPlayers && (Object.keys(this.league.players).length === +this.league.maxPlayers)) {
        return this.$toasted.error('No slots available')
      }
      if(this.league.entryPrice !== 'Free' && this.league.entryPrice !== 'Premium') {
        if(this.getUser.eur - +this.league.entryPrice.slice(1) < 0) {
          return this.$toasted.error("You don't have enough money")
        }
        const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/eur`)
        try {
          await userRef.set(this.getUser.eur - +this.league.entryPrice.slice(1))
        } catch (e) {
          this.$toasted.error(e)
        }
      }
      const leaguesRef = await this.$fire.database.ref(`leagues/${this.id}/players/${this.getUser.id}`)
      try {
        await leaguesRef.set({
          id: this.getUser.id,
          username: this.getUser.username
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      this.registered = true
      this.$toasted.success('You have registered')
    },
    async unregister() {
      const leaguesRef = await this.$fire.database.ref(`leagues/${this.id}/players/${this.getUser.id}`)
      try {
        await leaguesRef.set(null)
      } catch (e) {
        this.$toasted.error(e)
      }
      if(this.league.entryPrice[0] === '$') {
        const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/eur`)
        try {
          await userRef.set(this.getUser.eur + +this.league.entryPrice.slice(1))
        } catch (e) {
          this.$toasted.error(e)
        }
      }
      this.registered = false
      this.$toasted.success('You leave')
    }
  }
}
</script>

<style lang="scss" scoped>
  .league {
    padding-bottom: 30px;
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    &__subtitle {
      color: #A3A3A3;
      font-size: 23px;
      font-weight: 700;
      margin-top: 10px;
    }
    &__logo img {
      max-height: 80px;
    }
    &__inner {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: 50px;
    }
    &__nav {
      display: flex;
      margin-bottom: -2px;
      &-item {
        color: #67707A;
        line-height: 32px;
        padding: 10px 30px 15px;
        display: block;
        font-weight: 500;
        &.nuxt-link-exact-active.nuxt-link-active {
          color: #F5F5F5;
          border: 2px solid #565656;
          border-bottom-color: #0F1215;
        }
      }
    }
    &__info {
      border: 2px solid #565656;
      padding: 50px;
      max-width: 808px;
      width: 100%;
    }
    &__requirements {
      max-width: 408px;
      width: 100%;
      border: 2px solid #444546;
      padding-bottom: 10px;
      &-title {
        color: #F5F5F5;
        font-size: 18px;
        font-weight: 500;
        padding: 12px 0 20px 15px;
        border-bottom: 2px solid #444546;
      }
      &-inner {
        border-bottom: 2px solid #444546;
        padding: 20px 0 20px 12px;
        &-title {
          font-weight: 500;
          text-transform: uppercase;
        }
        &-text {
          color: #67707A;
        }
        &-link {
          color: #0A68F5;
        }
      }
      &-age {
        margin-bottom: 5px;
      }
      &-play {
        margin-top: 5px;
      }
      &-sign {
        max-width: 290px;
        margin: 10px auto 0;
        &-warning {
          color: #B83333;
          margin-bottom: 10px;
        }
      }
    }
  }
  @media (max-width: 1300px) {
    .league__inner {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  @media (max-width: 600px) {
    .league {
      &__nav {
        flex-wrap: wrap;
        .nuxt-link-exact-active.nuxt-link-active {
          border: none;
        }
      }
    }
  }
</style>
