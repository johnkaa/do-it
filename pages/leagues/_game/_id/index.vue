<template>
  <div class="info">
    <div class="info__items">
      <div class="info__item">
        <div class="info__item-title">Start time</div>
        <div class="info__item-text">{{ league.startDate }}</div>
      </div>
      <div class="info__item">
        <div class="info__item-title">Game</div>
        <div class="info__item-text">{{ league.game }}</div>
      </div>
      <div class="info__item">
        <div class="info__item-title">Prize pool</div>
        <div class="info__item-text">{{ league.prizePool }}</div>
      </div>
      <div class="info__item" v-show="league.minAge !== 0">
        <div class="info__item-title">Additional requirements</div>
        <div class="info__item-text">At least {{ league.minAge }} years old</div>
      </div>
      <div class="info__item">
        <div class="info__item-title">Mode</div>
        <div class="info__item-text">{{ league.mode }} - {{ league.format }}</div>
        <div class="info__item-text">BO1 | Final BO3</div>
      </div>
      <div class="info__item" v-show="league.veto">
        <div class="info__item-title">Veto</div>
        <div class="info__item-text">{{ league.veto }}</div>
      </div>
      <div class="info__item" v-show="league.lobby">
        <div class="info__item-title">Lobby</div>
        <div class="info__item-text">{{ league.lobby }}</div>
      </div>
    </div>
    <my-button class="info__button secondary">More rules</my-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['getLeagues']),
  mounted() {
    this.id = this.$route.params.id
    setTimeout(() => {
      Object.keys(this.getLeagues).forEach(item => {
        if(this.getLeagues[item].id === this.id) {
          this.league = this.getLeagues[item]
        }
      })
    }, 500)
  },
  data() {
    return {
      id: '',
      league: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .info {
    &__items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 50px;
      grid-row-gap: 30px;
    }
    &__item {
      min-width: 255px;
      &-title {
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        padding-left: 24px;
        margin-bottom: 5px;
        &:before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background-image: url(static/images/icons/time.svg);
          background-position: center;
          background-size: cover;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &-text {
        color: #67707A;
      }
    }
    &__button {
      display: block;
      max-width: 130px;
      margin-left: auto;
    }
  }
  .info__item:nth-child(2) .info__item-title:before {background-image: url(static/images/icons/gamepad.svg);}
  .info__item:nth-child(3) .info__item-title {padding-left: 16px;}.info__item:nth-child(3) .info__item-title:before {background-image: url(static/images/icons/prize.svg);}
  .info__item:nth-child(4) .info__item-title:before {background-image: url(static/images/icons/requirements.svg);}
  .info__item:nth-child(5) .info__item-title:before {background-image: url(static/images/icons/mode.svg);}
  .info__item:nth-child(6) .info__item-title:before {background-image: url(static/images/icons/veto.svg);}
  .info__item:nth-child(7) .info__item-title:before {background-image: url(static/images/icons/lobby.svg);}
  @media (max-width: 900px) {
    .info {
      padding: 20px;
      &__items {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
      }
    }
  }
  @media (max-width: 900px) {
    .info {
      &__items {
        display: block;
      }
      &__item + &__item {
        margin-top: 30px;
      }
    }
  }
</style>
