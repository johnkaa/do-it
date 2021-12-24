<template>
  <div class="tournaments">
    <div class="tournaments__top">
      <div class="tournaments__title title">{{ game }}: Tournaments</div>
      <div class="tournaments__logo">
        <img :src="icon" alt="">
      </div>
    </div>
    <div class="tournaments__inner">
      <div class="tournaments__items">
        <tournaments-item class="tournaments__item"
                          v-for="item in filteredTournaments"
                          :key="item.id"
                          :img="item.img"
                          :title="item.title"
                          :status="item.status"
                          :prize="item.prizePool"
                          :entry="item.entryPrice"
                          :platform="item.platform"
                          :slots="(item.players ? Object.keys(item.players).length : 0) + '/' + (item.maxPlayers || '∞')"
                          :mode="item.mode"
                          :server="item.server"
                          v-if="filteredTournaments.length > 0"
                          @click="$router.push(`/tournaments/${game}/${item.id}`)"/>
      </div>
      <div class="tournaments__not-found" v-if="!filteredTournaments.length">Tournaments not found!</div>
      <div class="tournaments__filter">
        <div class="tournaments__filter-top">
          <div class="tournaments__filter-title">Filters</div>
          <div class="tournaments__filter-clear" @click="clear">clear</div>
        </div>
        <div class="tournaments__filter-item">
          <div class="tournaments__filter-item-title title">Game mode</div>
          <div class="tournaments__filter-item-items">
            <my-radio-select class="tournaments__filter-item-item" :selects="{ 0: {title: '1 vs 1'}, 1: {title: '2 vs 2'}, 2: {title: '5 vs 5'} }"
                             :selectValue="mode"
                             name="mode"
                             style="font-size: 12px;"
                             @updateRadioSelect="updateMode"/>
          </div>
        </div>
        <div class="tournaments__filter-item">
          <div class="tournaments__filter-item-title title">Status</div>
          <div class="tournaments__filter-item-items">
            <my-radio-select class="tournaments__filter-item-item" :selects="{ 0: {title: 'upcoming'}, 1: {title: 'past'} }"
                             :selectValue="status"
                             name="status"
                             style="font-size: 12px;"
                             @updateRadioSelect="updateStatus"/>
          </div>
        </div>
        <div class="tournaments__filter-item">
          <div class="tournaments__filter-item-title title">Platform</div>
          <div class="tournaments__filter-item-items">
            <my-radio-select class="tournaments__filter-item-item" :selects="{ 0: {title: 'PC'}, 1: {title: 'Xbox'}, 2: {title: 'PS4', 3: {title: 'PS5'}} }"
                             :selectValue="platform"
                             name="platform"
                             style="font-size: 12px; display: block;"
                             @updateRadioSelect="updatePlatform"/>
          </div>
        </div>
        <div class="tournaments__filter-item">
          <div class="tournaments__filter-item-title title">Server</div>
          <div class="tournaments__filter-item-items">
            <my-radio-select class="tournaments__filter-item-item" :selects="{ 0: {title: 'Europe'}, 1: {title: 'Australia'}, 2: {title: 'Asia'}, 3: {title: 'America'} }"
                             :selectValue="server"
                             name="server"
                             style="font-size: 12px; display: block"
                             @updateRadioSelect="updateServer"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTournaments', 'getGames']),
    filteredTournaments() {
      let tournaments = this.tournaments
      if(this.mode) {
        tournaments = tournaments.filter(element => {
          return element.mode === this.mode
        })
      }
      if(this.status) {
        tournaments = tournaments.filter(element => {
          return element.status === this.status
        })
      }
      if(this.platform) {
        tournaments = tournaments.filter(element => {
          return element.platform === this.platform
        })
      }
      if(this.server) {
        tournaments = tournaments.filter(element => {
          return element.server === this.server
        })
      }
      return tournaments
    },
  },
  mounted() {
    this.game = this.$route.params.game
    this.$store.dispatch('setTournamentsAction')
    this.$store.dispatch('setGamesAction')
    setTimeout(() => {
      Object.keys(this.getGames).forEach(item => {
        if(this.getGames[item].title === this.game) {
          this.icon = this.getGames[item].gameIconImg
        }
      })
      Object.keys(this.getTournaments).forEach(item => {
        if(this.getTournaments[item].game === this.game) {
          this.tournaments.push(this.getTournaments[item])
        }
      })
    }, 500)
  },
  data() {
    return {
      game: '',
      icon: '',
      tournaments: [],
      mode: '',
      status: '',
      platform: '',
      server: ''
    }
  },
  methods: {
    updateMode(select) {
      this.mode = select
    },
    updateStatus(select) {
      this.status = select
    },
    updatePlatform(select) {
      this.platform = select
    },
    updateServer(select) {
      this.server = select
    },
    clear() {
      this.mode = ''
      this.status = ''
      this.platform = ''
      this.server = ''
      let a = [];
      a = document.getElementsByTagName('input');
      for(let b = 0; b < a.length; b ++){
        if(a[b].type === 'radio'){
          a[b].checked = false;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tournaments {
    padding-bottom: 30px;
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    &__logo img {
      max-height: 80px;
    }
    &__inner {
      position: relative;
    }
    &__items {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      column-gap: 25px;
      row-gap: 24px;
    }
    &__not-found {
      color: #B83333;
      text-align: center;
      margin: 50px 0;
      font-size: 30px;
      font-weight: 500;
    }
    &__filter {
      position: absolute;
      right: -300px;
      top: 0;
      padding: 30px;
      border: 2px solid #20252B;
      .title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 12px;
      }
      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 70px;
        margin-bottom: 30px;
      }
      &-title {
        font-weight: 500;
        font-size: 32px;
        color: #F5F5F5;
      }
      &-clear {
        color: #B83333;
        cursor: pointer;
      }
      &-item {
        &-item {
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        &:nth-child(3),
        &:nth-last-child {
          .tournaments__filter-item-item {
            display: block;
          }
        }
      }
    }
  }
  @media(max-width: 1900px) {
    .tournaments__filter {
      display: none;
    }
  }
</style>
