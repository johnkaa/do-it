<template>
  <div class="tournament">
    <div class="tournament__top">
      <div class="tournament__top-text">
        <nuxt-link class="tournament__back" :to="`/tournaments/${game}`">Back</nuxt-link>
      </div>
      <div class="tournament__logo">
        <img :src="icon" alt="">
      </div>
    </div>
    <div class="tournament__inner">
      <div class="tournament__inner-item">
        <div class="tournament__tournament">
          <div class="tournament__tournament-img">
            <img :src="icon" alt="">
          </div>
          <div class="tournament__tournament-info">
            <div class="tournament__tournament-info-title">{{ tournament.title }}</div>
            <div class="tournament__tournament-info-text">{{ players || 0 }} players signed up</div>
          </div>
        </div>
        <div class="tournament__nav">
          <nuxt-link class="tournament__nav-item" :to="`/tournaments/${game}/${id}`">Info</nuxt-link>
          <nuxt-link class="tournament__nav-item" :to="`/tournaments/${game}/${id}/bracket`">Bracket</nuxt-link>
          <nuxt-link class="tournament__nav-item" :to="`/tournaments/${game}/${id}/players`">Players</nuxt-link>
          <nuxt-link class="tournament__nav-item" :to="`/tournaments/${game}/${id}/rules`">Rules</nuxt-link>
          <nuxt-link class="tournament__nav-item" :to="`/tournaments/${game}/${id}/support`">Support</nuxt-link>
        </div>
        <nuxt-child class="tournament__info" :setRegister="registered"/>
      </div>
      <div class="tournament__requirements">
        <div class="tournament__requirements-title">Requirements</div>
        <div class="tournament__requirements-inner">
          <div class="tournament__requirements-age" v-if="tournament.minAge">
            <div class="tournament__requirements-inner-title">Minimum age</div>
            <div class="tournament__requirements-inner-text">At least {{ tournament.minAge }} years old</div>
          </div>
          <div class="tournament__requirements-inner-title">Residence</div>
          <nuxt-link class="tournament__requirements-inner-link" to="/">More info</nuxt-link>
          <div class="tournament__requirements-play">
            <div class="tournament__requirements-age">
              <div class="tournament__requirements-inner-title">Entry price</div>
              <div class="tournament__requirements-inner-text">{{ tournament.entryPrice }}</div>
            </div>
            <div class="tournament__requirements-inner-title">Play</div>
            <div class="tournament__requirements-inner-text">Please log in to take part in this tournament.</div>
          </div>
        </div>
        <div class="tournament__requirements-sign">
          <div class="tournament__requirements-sign-warning">Register close in {{ tournament.startDate }}</div>
          <div class="tournament__requirements-sign-btn" @click="unregister" v-if="registered">
            <my-button class="secondary" :disabled="delay">Unregister</my-button>
          </div>
          <nuxt-link class="tournament__requirements-sign-btn" v-else-if="!this.$fire.auth.currentUser" to="/auth/login">
            <my-button>Log in / Register</my-button>
          </nuxt-link>
          <div class="tournament__requirements-sign-btn" @click="register" v-else>
            <my-button :disabled="delay">Register</my-button>
          </div>
        </div>
        <div class="tournament__requirements-sm">
          <img class="tournament__requirements-sm-item" v-for="item in 5" :src="`/images/icons/sm/sm-${item}.svg`" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $fire }) {
    const gamesRef = $fire.database.ref('games')
    let games, tournaments
    try {
      const snapshot = await gamesRef.once('value')
      games = snapshot.val()
    } catch (e) {
      console.log(e)
    }
    const tournamentsRef = $fire.database.ref('tournaments')
    try {
      const snapshot = await tournamentsRef.once('value')
      tournaments = snapshot.val()
    } catch (e) {
      this.$toasted.error(e)
    }
    return { games, tournaments }
  },
  computed: mapGetters(['getUser']),
  mounted() {
    this.id = this.$route.params.id
    this.game = this.$route.params.game
    Object.keys(this.games).forEach(item => {
      if(this.games[item].title === this.game) {
        this.icon = this.games[item].gameIconImg
      }
    })
    Object.keys(this.tournaments).forEach(item => {
      if(this.tournaments[item].id === this.id) {
        this.tournament = this.tournaments[item]
        if(this.tournaments[item].players) {
          this.players = +Object.keys(this.tournaments[item].players).length
        }
      }
    })
    setTimeout(() => {
      if(this.tournament.players) {
        Object.keys(this.tournament.players).forEach(item => {
          if(this.tournament.players[item].id === this.getUser.id) {
            this.registered = true
          }
        })
      }
    }, 300)
  },
  data() {
    return {
      id: '',
      game: '',
      icon: '',
      tournament: '',
      registered: false,
      players: '',
      delay: null
    }
  },
  methods: {
    async register() {
      this.delay = true
      if(this.tournament.entryPrice === 'Premium' && this.getUser.subscribe === 'free') {
        return this.$toasted.error('This league only for premium users')
      }
      if(this.tournament.entryPrice === 'Private') {
        return this.$toasted.error('This league is private, ask the host to add you')
      }
      if(this.tournament.maxPlayers && (this.players === +this.tournament.maxPlayers)) {
        return this.$toasted.error('No slots available')
      }
      if(this.tournament.entryPrice !== 'Free' && this.tournament.entryPrice !== 'Premium') {
        if(this.getUser.eur - +this.tournament.entryPrice.slice(1) < 0) {
          return this.$toasted.error("You don't have enough money")
        }
        const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/eur`)
        try {
          await userRef.set(this.getUser.eur - +this.tournament.entryPrice.slice(1))
        } catch (e) {
          this.$toasted.error(e)
        }
      }
      const tournamentsRef = await this.$fire.database.ref(`tournaments/${this.id}/players/${this.getUser.id}`)
      try {
        await tournamentsRef.set({
          id: this.getUser.id,
          username: this.getUser.username
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      this.registered = true
      this.players++
      this.$toasted.success('You have registered')
      setTimeout(() => this.delay = null, 100)
    },
    async unregister() {
      this.delay = true
      const tournamentsRef = await this.$fire.database.ref(`tournaments/${this.id}/players/${this.getUser.id}`)
      try {
        await tournamentsRef.set(null)
      } catch (e) {
        this.$toasted.error(e)
      }
      if(this.tournament.entryPrice[0] === '$') {
        const userRef = await this.$fire.database.ref(`users/${this.getUser.id}/eur`)
        try {
          await userRef.set(this.getUser.eur + +this.tournament.entryPrice.slice(1))
        } catch (e) {
          this.$toasted.error(e)
        }
      }
      this.registered = false
      this.players--
      this.$toasted.success('You leave')
      setTimeout(() => this.delay = null, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.tournament {
  padding-bottom: 30px;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  &__back {
    color: #9FB1CC;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    &::before {
      content: '';
      width: 24px;
      height: 24px;
      background-image: url(static/images/icons/arrow-back.svg);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &__logo img {
    max-height: 80px;
  }
  &__tournament {
    display: flex;
    gap: 15px;
    padding: 40px;
    margin-bottom: 30px;
    border: 2px solid #565656;
    &-img {
      width: 62px;
      height: 62px;
    }
    &-info-title {
      font-size: 32px;
      line-height: 100%;
      font-weight: 500;
      margin-bottom: 5px;
    }
    &-info-text {
      color: #67707A;
    }
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
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
    width: 808px;
  }
  &__requirements {
    max-width: 408px;
    width: 100%;
    border: 2px solid #444546;
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
      margin: 10px auto 30px;
      &-warning {
        color: #B83333;
        margin-bottom: 10px;
      }
    }
    &-sm {
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid #444546;
      &-item {
        width: 48px;
        height: 48px;
        padding: 16px;
        cursor: pointer;
        &:hover {
          background: rgba(#fff, .3);
        }
      }
    }
  }
}
@media (max-width: 1300px) {
  .tournament__inner {
    flex-wrap: wrap;
    justify-content: center;
  }
  .tournament__info {
    width: 100%;
  }
}
@media (max-width: 600px) {
  .tournament {
    &__nav {
      flex-wrap: wrap;
      .nuxt-link-exact-active.nuxt-link-active {
        border: none;
      }
    }
  }
}
</style>
