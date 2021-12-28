<template>
  <div class="players">
    <template v-if="players.length !== 0">
      <div class="players__item" v-for="item in players" :key="item.id">
        <div class="players__item-img">
          <img :src="item.img" alt="">
        </div>
        <div class="players__item-title">
          <div class="players__item-flag"><country-flag :country='code(item.country)'/></div>
          <div class="players__item-name">{{ item.username }}</div>
        </div>
        <div class="players__item-status">Registered</div>
      </div>
    </template>
    <div class="players__not-found" v-else>Players not found</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const { getCode } = require('country-list');
export default {
  computed: {
    ...mapGetters(['getTournaments', 'getPlayers']),
  },
  watch: {
    getTournaments() {
      this.setupPlayers()
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.$store.dispatch('setTournamentsAction')
    this.$store.dispatch('setPlayersAction')
    setTimeout(() => {
      this.setupPlayers()
    }, 500)
  },
  data() {
    return {
      id: '',
      tournament: '',
      players: []
    }
  },
  methods: {
    code(country) {
      return getCode(country)
    },
    setupPlayers() {
      Object.keys(this.getTournaments).forEach(item => {
        if(this.getTournaments[item].id === this.id) {
          this.tournament = this.getTournaments[item]
        }
      })
      this.players = []
      if(this.tournament.players) {
        Object.keys(this.tournament.players).forEach(item => {
          Object.keys(this.getPlayers).forEach(id => {
            if(this.tournament.players[item].id === this.getPlayers[id].id) {
              this.players.push(this.getPlayers[id])
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.players {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  &__item {
    background-color: #151A1F;
    border-radius: 4px;
    &-img {
      width: 190px;
      height: 190px;
      img {
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        object-fit: cover;
      }
    }
    &-title {
      display: flex;
      gap: 8px;
      padding: 15px 15px 8px;
    }
    &-name {
      color: #E6E8EB;
      font-size: 14px;
      font-weight: 500;
    }
    &-flag {
      margin-top: -8px;
    }
    &-status {
      padding: 0 15px 15px;
      color: #525C66;
      font-size: 12px;
    }
  }
  &__not-found {
    color: #B83333;
    text-align: center;
    margin: 50px auto;
    font-size: 30px;
    font-weight: 500;
  }
}
</style>
