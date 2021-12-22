<template>
  <div class="standings">
    <div class="standings__inner">
      <div class="standings__title">{{ league.title }}</div>
      <div class="standings__table">
        <div class="standings__table-item">
          <div class="standings__table-item-place">#</div>
          <div class="standings__table-item-country">Country</div>
          <div class="standings__table-item-name">Nickname / Team</div>
          <div class="standings__table-item-wins">Wins</div>
          <div class="standings__table-item-loses">Loses</div>
          <div class="standings__table-item-draws">Draws</div>
          <div class="standings__table-item-points">Points</div>
          <div class="standings__table-item-prize">Prize</div>
        </div>
        <div class="standings__table-item" v-for="(item, index) in players">
          <div class="standings__table-item-place">{{ index + 1 }}</div>
          <div class="standings__table-item-country"><country-flag :country='code(item.country)'/></div>
          <div class="standings__table-item-name" v-if="item.mainTeam">{{ item.username }} / {{ item.mainTeam }}</div>
          <div class="standings__table-item-name" v-else>{{ item.username }}</div>
          <div class="standings__table-item-wins">0</div>
          <div class="standings__table-item-loses">0</div>
          <div class="standings__table-item-draws">0</div>
          <div class="standings__table-item-points">0</div>
          <div class="standings__table-item-prize" v-if="index === 0">${{ league.prizePool.slice(1) / 100 * 60 }}</div>
          <div class="standings__table-item-prize" v-else-if="index === 1">${{ league.prizePool.slice(1) / 100 * 30 }}</div>
          <div class="standings__table-item-prize" v-else-if="index === 2">${{ league.prizePool.slice(1) / 100 * 10 }}</div>
          <div class="standings__table-item-prize" v-else>$0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const { getCode } = require('country-list');

export default {
  computed: {
    ...mapGetters(['getLeagues', 'getPlayers']),
  },
  mounted() {
    this.id = this.$route.params.id
    this.$store.dispatch('setLeaguesAction')
    this.$store.dispatch('setPlayersAction')
    setTimeout(() => {
      Object.keys(this.getLeagues).forEach(item => {
        if(this.getLeagues[item].id === this.id) {
          this.league = this.getLeagues[item]
        }
      })
      if(this.league.players) {
        Object.keys(this.league.players).forEach(item => {
          Object.keys(this.getPlayers).forEach(id => {
            if(this.league.players[item].id === this.getPlayers[id].id) {
              this.players.push(this.getPlayers[id])
            }
          })
        })
      }
    }, 500)
  },
  data() {
    return {
      id: '',
      league: '',
      players: []
    }
  },
  methods: {
    code(country) {
      return getCode(country)
    }
  }
}
</script>

<style lang="scss" scoped>
  .standings {
    padding: 25px;
    &__inner {
      border: 2px solid #20252B;
    }
    &__title {
      font-size: 20px;
      font-weight: 700;
      padding: 30px 30px 0;
      margin-bottom: 15px;
    }
    &__table {
      font-size: 14px;
      &-item {
        display: grid;
        grid-template-columns: 15px 60px 200px repeat(5, 50px);
        grid-column-gap: 20px;
        padding: 10px 40px 10px 60px;
        color: #67707A;
        text-align: center;
      }
      &-item:nth-child(1) {
        color: #fff;
        background-color: #20252B;
      }
      &-item + &-item {
        border-bottom: 2px solid #20252B;
        .standings__table-item-country {
          width: 23px;
          margin: -7px auto 0;
        }
      }
      &-item:last-child {
        border: none;
      }
    }
  }
  @media (max-width: 850px) {
    .standings {
      &__table {
        display: flex;
        flex-wrap: wrap;
        &-item {
          display: block;
        }
        &-item + &-item {
          border-bottom: none;
          border-right: 2px solid #20252B;
        }
        &-item:last-child {
          border-right: none;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .standings {
      &__table {
        justify-content: center;
        &-item + &-item {
          border-right: none;
          border-top: 2px solid #20252B;
        }
        &-item:nth-child(2) {
          border: none;
        }
      }
    }
  }
</style>
