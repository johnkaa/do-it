<template>
    <div class="leagues">
      <div class="leagues__top">
        <div class="leagues__title title">{{ game }}: Leagues</div>
        <div class="leagues__logo">
          <img :src="icon" alt="">
        </div>
      </div>
      <div class="leagues__inner">
        <div class="leagues__items">
          <tournaments-card class="leagues__item"
                            v-for="item in filteredLeagues"
                            :key="item.id"
                            :title="item.title"
                            :img="item.img"
                            :start="item.startDate.substring(0, item.startDate.length-11)"
                            :mode="item.mode"
                            :slots="(item.players ? Object.keys(item.players).length : 0) + '/' + (item.maxPlayers || '∞')"
                            :pool="item.prizePool"
                            @click="$router.push(`/leagues/${game}/${item.id}`)"/>
        </div>
        <div class="leagues__filter">
          <div class="leagues__filter-top">
            <div class="leagues__filter-title">Filters</div>
            <div class="leagues__filter-clear" @click="clear">clear</div>
          </div>
          <div class="leagues__filter-mode">
            <div class="leagues__filter-mode-title title">Game mode</div>
            <div class="leagues__filter-mode-items">
              <my-radio-select class="leagues__filter-mode-item" :selects="{ 0: {title: '1 vs 1'}, 1: {title: '2 vs 2'}, 2: {title: '5 vs 5'} }"
                               :selectValue="mode"
                               name="mode"
                               style="font-size: 12px;"
                               @updateRadioSelect="updateMode"/>
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
    ...mapGetters(['getLeagues', 'getGames']),
    filteredLeagues() {
      let leagues = this.leagues
      if(this.mode) {
        return leagues.filter(element => {
          return element.mode === this.mode
        })
      }
      return leagues
    },
  },
  mounted() {
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
        if(this.getLeagues[item].game === this.game) {
          this.leagues.push(this.getLeagues[item])
        }
      })
    }, 500)
  },
  data() {
    return {
      game: '',
      icon: '',
      leagues: [],
      mode: '',
    }
  },
  methods: {
    updateMode(select) {
      this.mode = select
    },
    clear() {
      this.mode = ''
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
  .leagues {
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
      &-mode {
        &-item {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  @media(max-width: 1900px) {
    .leagues__filter {
      display: none;
    }
  }
</style>
