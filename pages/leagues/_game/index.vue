<template>
  <div class="leagues">
    <nuxt-child />
    <div class="leagues__top">
      <div class="leagues__title title">{{ game }}: Leagues</div>
      <div class="leagues__logo">
        <img :src="icon" alt="">
      </div>
    </div>
    <div class="leagues__inner">
      <default-slider class="leagues__items" v-if="leagues.length > 0">
        <swiper-slide class="leagues__item" slot="slide" v-for="item in leagues" :key="item.id">
          <tournaments-card :title="item.title"
                            :img="item.img"
                            :start="item.startDate.substring(0, item.startDate.length-11)"
                            :mode="item.mode"
                            :slots="(item.players ? Object.keys(item.players).length : 0) + '/' + (item.maxPlayers || '∞')"
                            :pool="item.prizePool"
                            @click="$router.push(`/leagues/${game}/${item.id}`)"/>
        </swiper-slide>
      </default-slider>
      <div class="leagues__not-found" v-else>Leagues not found!</div>
      <nuxt-link class="leagues__more" :to="`/leagues/${game}/more`" v-if="leagues.length > 0">More</nuxt-link>
      <div class="leagues__news-title">News</div>
      <default-slider class="leagues__news" v-if="news.length > 0">
        <swiper-slide class="leagues__news-item" slot="slide" v-for="item in news" :key="item.id">
          <news-card :mainPage="true" :img="item.img" :title="item.title" :text="item.text"/>
        </swiper-slide>
      </default-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Leagues'
  },
  computed: mapGetters(['getLeagues', 'getGames', 'getNews']),
  mounted() {
    this.game = this.$route.params.game
    this.$store.dispatch('setLeaguesAction')
    this.$store.dispatch('setGamesAction')
    this.$store.dispatch('setNewsAction')
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
      Object.keys(this.getNews).forEach(item => {
        if(this.getNews[item].game === this.game) {
          this.news.push(this.getNews[item])
        }
      })
    }, 500)
  },
  data() {
    return {
      game: '',
      icon: '',
      leagues: [],
      news: []
    }
  }
}
</script>

<style lang="scss" scoped>
.leagues {
  &__news-title {
    font-size: 23px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 56px;
  }
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
  &__not-found {
    color: #B83333;
    text-align: center;
    margin: 50px 0;
    font-size: 30px;
    font-weight: 500;
  }
  &__more {
    position: absolute;
    right: 0;
    text-transform: uppercase;
    font-size: 23px;
    font-weight: 700;
    line-height: 56px;
    margin-top: -10px;
  }
  &__news-title {
    margin-top: 30px;
  }
}
</style>
