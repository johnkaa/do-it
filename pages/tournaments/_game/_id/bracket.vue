<template>
  <div class="bracket">
    <template v-if="tournament.bracket">
      <div class="bracket">
        <swiper class="bracket__items" :options="swiperOptions">
          <swiper-slide class="bracket__item">
            <div class="bracket__item-title">Round 16</div>
            <div class="bracket__item-inner" :class="{ winner: item.winner, loser: !item.winner }" v-for="item in tournament.bracket.R16">
              <div class="bracket__item-player">
                <div class="bracket__item-player-title">
                  <div class="bracket__item-player-flag"><country-flag :country='code(item.country)'/></div>
                  <div class="bracket__item-player-name">{{ item.username }}</div>
                </div>
                <div class="bracket__item-player-count">{{ item.points }}</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="bracket__item">
            <div class="bracket__item-title">Round 8</div>
            <div class="bracket__item-inner" :class="{ winner: item.winner, loser: !item.winner, mt113: index % 2 === 0, bracket: index % 2 === 0 }" v-for="(item, idx, index) in tournament.bracket.R8">
              <div class="bracket__item-player">
                <div class="bracket__item-player-title">
                  <div class="bracket__item-player-flag"><country-flag :country='code(item.country)'/></div>
                  <div class="bracket__item-player-name">{{ item.username }}</div>
                </div>
                <div class="bracket__item-player-count">{{ item.points }}</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="bracket__item">
            <div class="bracket__item-title">Semi Final</div>
            <div class="bracket__item-inner" :class="{ winner: item.winner, loser: !item.winner, mt233: index === 0, mt346: index === 2, bracket: index % 2 === 0 }" v-for="(item, idx, index) in tournament.bracket.semi">
              <div class="bracket__item-player">
                <div class="bracket__item-player-title">
                  <div class="bracket__item-player-flag"><country-flag :country='code(item.country)'/></div>
                  <div class="bracket__item-player-name">{{ item.username }}</div>
                </div>
                <div class="bracket__item-player-count">{{ item.points }}</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="bracket__item">
            <div class="bracket__item-title">Final</div>
            <div class="bracket__item-inner" :class="{ winner: item.winner, loser: !item.winner, final: index === 0, bracket: index % 2 === 0 }" v-for="(item, idx, index) in tournament.bracket.final" style="margin-left: 50px;">
              <div class="bracket__item-player">
                <div class="bracket__item-player-title">
                  <div class="bracket__item-player-flag"><country-flag :country='code(item.country)'/></div>
                  <div class="bracket__item-player-name">{{ item.username }}</div>
                </div>
                <div class="bracket__item-player-count">{{ item.points }}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </template>
    <div class="bracket__not-found" v-else>Players not found</div>
  </div>
</template>

<script>
const { getCode } = require('country-list');

export default {
  async asyncData({ $fire }) {
    const tournamentsRef = $fire.database.ref('tournaments')
    try {
      const snapshot = await tournamentsRef.once('value')
      const tournaments = snapshot.val()
      return { tournaments }
    } catch (e) {
      console.log(e)
    }
  },
  mounted() {
    this.id = this.$route.params.id
    Object.keys(this.tournaments).forEach(item => {
      if(this.tournaments[item].id === this.id) {
        this.tournament = this.tournaments[item]
      }
    })
  },
  data() {
    return {
      id: '',
      tournament: '',
      swiperOptions: {
        slidesPerView: "1",
        slidesPerGroup: "1",
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          830: {
            slidesPerView: "3",
            slidesPerGroup: "3",
          },
          666: {
            slidesPerView: "2",
            slidesPerGroup: "2",
          },
        },
      }
    }
  },
  methods: {
    code(country) {
      return getCode(country)
    },
  }
}
</script>

<style lang="scss" scoped>
  .bracket {
    &__items {
      display: flex;
      align-items: center;
      gap: 90px;
      position: relative;
    }
    &__item {
      padding-top: 50px;
      &-title {
        text-transform: uppercase;
        position: absolute;
        top: 0;
        margin-left: 81px;
        transform: translateX(-50%);
        font-size: 15px;
      }
      &-inner {
        border: 1px solid #20272E;
        width: 162px;
        position: relative;
        &:nth-child(odd) {
          margin-bottom: 10px;
          border-top: none;
        }
        &.winner {
          border: 1px solid #2C95FF;
          .bracket__item-player-count {
            background-color: #2C95FF;
            color: #0F1215;
          }
        }
        &.loser {
          opacity: .5;
        }
        &.bracket {
          position: relative;
          &::before {
            content: '';
            background-image: url(static/images/icons/bracket.svg);
            background-size: contain;
            width: 60px;
            height: 90px;
            position: absolute;
            left: -60px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &.mt113 {
          margin-top: 113px;
        }
        &.mt233 {
          margin-top: 233px;
          &::before {
            height: 95px;
            top: 80%;
          }
        }
        &.mt346 {
          margin-top: 310px;
          &::before {
            height: 95px;
            top: 120%;
          }
        }
        &.final {
          margin-top: 460px;
          &::before {
            background-size: cover;
            height: 180px;
            width: 90px;
            top: 80%;
            left: -100px;
          }
        }
      }
      &-player {
        &-title {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
        }
        &-flag {
          margin-top: -8px;
        }
        &-name {
          color: #E6E8EB;
          font-size: 14px;
        }
        &-count {
          font-size: 14px;
          font-weight: 500;
          width: 38px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          background-color: #20272E;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  @media (max-width: 830px) {
    .bracket {
      max-width: 700px;
    }
  }
  @media (max-width: 730px) {
    .bracket {
      max-width: 600px;
    }
  }
  @media (max-width: 630px) {
    .bracket {
      max-width: 500px;
    }
  }
  @media (max-width: 530px) {
    .bracket {
      max-width: 400px;
    }
  }
  @media (max-width: 430px) {
    .bracket {
      max-width: 300px;
    }
  }
</style>
