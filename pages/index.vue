<template>
  <div class="home">
    <div class="home__top" v-if="!auth">
      <h1 class="home__title">DOIT BETA</h1>
      <div class="home__text">
        Prepare for your esports career and get ready for awesome tournaments with big prize pools and many fun! <span>Register Now!</span>
      </div>
      <div class="home__btns">
        <nuxt-link class="home__btn" to="/auth/login">
          <my-button class="secondary">Login</my-button>
        </nuxt-link>
        <nuxt-link class="home__btn" to="/auth/register">
          <my-button>Sign Up</my-button>
        </nuxt-link>
      </div>
    </div>
    <div class="home__items">
      <filtered-slider class="home__items-item">
        <div class="home__items-title title" slot="title">Tournaments</div>
        <select-categories class="home__items-filter" slot="filter" @updateFilter="updateGameTournamentsFilter"></select-categories>
        <swiper-slide class="home__items-slide" slot="slide" v-for="item in 10" :key="item">
          <tournaments-card />
<!--          filteredTournaments-->
        </swiper-slide>
      </filtered-slider>
      <filtered-slider class="home__items-item">
        <div class="home__items-title title" slot="title">News</div>
        <select-categories class="home__items-filter" slot="filter" @updateFilter="updateGameNewsFilter"></select-categories>
        <swiper-slide class="home__items-slide" slot="slide" v-for="item in filteredNews" :key="item.id">
          <news-card :mainPage="true" :img="item.img" :title="item.title" :text="item.text"/>
        </swiper-slide>
      </filtered-slider>
    </div>
    <filtered-slider class="home__items-item">
      <div class="home__items-title title streams" slot="title">Streams</div>
      <select-categories class="home__items-filter" slot="filter" @updateFilter="updateGameStreamsFilter"></select-categories>
      <swiper-slide class="home__items-slide" slot="slide" v-for="item in 15" :key="item.id">
        <tournaments-card />
      </swiper-slide>
    </filtered-slider>

<!--      <div v-for="item in streams" :key="item">-->
<!--        {{ item }}-->
<!--        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${item.videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
<!--      </div>-->
    <div class="home__partners" id="sponsors">
      <div class="home__partners-title title">Partners</div>
      <div class="home__partners-items">
        <div class="home__partners-item" v-for="(item, index) in partners" :key="index">
          <img :src="item.img" alt="">
        </div>
      </div>
    </div>
    <div class="home__items home__games">
      <div class="home__items-title title">Games</div>
      <default-slider>
        <swiper-slide class="home__items-slide" slot="slide" v-for="(item, index) in getGames" :key="index">
          <games-card :title="item.title" :img="item.img" :mainPage="true"/>
        </swiper-slide>
      </default-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Home'
  },
  computed: {
    ...mapGetters(['getTournaments', 'getNews', 'getGames']),
    filteredTournaments() {
      let tournaments = []
      Object.keys(this.getTournaments).forEach(item => {
        tournaments.push(this.getTournaments[item])
      })
      if(this.filteredGameTournaments !== '' && this.filteredGameTournaments !== 'All') {
        return tournaments.filter(element => {
          return element.game === this.filteredGameTournaments
        })
      } else {
        return tournaments
      }
    },
    filteredNews() {
      let news = []
      Object.keys(this.getNews).forEach(item => {
        news.push(this.getNews[item])
      })
      if(this.filteredGameNews !== '' && this.filteredGameNews !== 'All') {
        return news.filter(element => {
          return element.game === this.filteredGameNews
        })
      } else {
        return news
      }
    },
    filteredStreams() {
      // let news = []
      // Object.keys(this.getNews).forEach(item => {
      //   news.push(this.getNews[item])
      // })
      // if(this.filteredGameNews !== '' && this.filteredGameNews !== 'All') {
      //   return news.filter(element => {
      //     return element.game === this.filteredGameNews
      //   })
      // } else {
      //   return news
      // }
    }
  },
  async fetch() {
    await this.getPartners()
  },
  mounted() {
    this.getUser()
    this.$store.dispatch('setGamesAction')
    this.$store.dispatch('setNewsAction')
    this.$store.dispatch('setTournamentsAction')
    Object.keys(this.getNews).forEach(item => {
      this.news.push(this.getNews[item])
    })
  },
  data() {
    return {
      auth: false,
      showModal: true,
      games: [],
      news: [],
      streams: [],
      partners: [],
      filteredGameTournaments: '',
      filteredGameNews: '',
      filteredGameStreams: '',
    }
  },
  methods: {
    getUser() {
      this.$fire.auth.onAuthStateChanged((user) => {
        if(user) {
          this.auth = true
        }
      })
    },
    async getStreams() {
      const fetchLink = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&regionCode=US&maxResults=50&key=AIzaSyDIusejjOkgpbi5u2wWMjqbavAYteeuoGo'
      await fetch(fetchLink, {
        method: 'get',
      }).then((response) => {
        return response.json()
      }).then((data) => {
        Object.keys(data.items).forEach((item) => {
          this.streams.push(data.items[item])
        })
      })
    },
    async getPartners() {
      const partnersRef = this.$fire.database.ref('partners')
      try {
        const snapshot = await partnersRef.once('value')
        this.partners = snapshot.val()
      } catch (e) {
        console.log(e)
      }
    },
    updateGameTournamentsFilter(game) {
      this.filteredGameTournaments = game
    },
    updateGameNewsFilter(game) {
      this.filteredGameNews = game
    },
    updateGameStreamsFilter(game) {
      this.filteredGameStreams= game
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/styles/var";
  .home {
    background-image: url(static/images/bg.jpg);
    &__top {
      text-align: center;
      margin-top: 50px;
      background-image: url(static/images/main-bg.svg);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      padding-bottom: 410px;
      padding-top: 210px;
      margin-bottom: 25px;
    }
    &__title {
      font-size: 125px;
      line-height: 100%;
      font-weight: 700;
      margin-bottom: 15px;
    }
    &__text {
      color: $dark-white;
      max-width: 440px;
      margin: 0 auto 20px;
      span {
        display: block;
      }
    }
    &__btns {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__btn {
      max-width: 120px;
    }
    &__btn + &__btn {
      margin-left: 8px;
    }
    &__streams {
      padding-bottom: 100px;
    }
    &__partners-items {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 100px;
    }
    &__games {
      padding-bottom: 100px;
      &-title {
        margin-bottom: 50px;
      }
      &-items {
        display: flex;
        justify-content: space-between;
      }
    }
    &__items-title {
      &.streams {
        position: relative;
        padding-right: 48px;
        &::after {
          content: '';
          width: 32px;
          height: 32px;
          background-image: url(static/images/icons/stream.svg);
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-40%);
        }
      }
    }
  }
  @media (max-width: 1350px) {
    .home {
      &__top {
        padding-bottom: 300px;
        background-size: contain;
      }
    }
  }
  @media (max-width: 1100px) {
    .home {
      &__top {
        padding-top: 100px;
      }
    }
  }
  @media (max-width: 888px) {
    .home__items-filter {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .home {
      &__top {
        padding: 50px 0;
      }
      &__title {
        font-size: 84px;
      }
      &__text {
        font-size: 14px;
        line-height: 150%;
        max-width: 320px;
        span {
          display: inline-block;
        }
      }
      &__partners-items {
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
      }
    }
  }
  @media (max-width: 555px) {
    .home {
      &__title {
        font-size: 45px;
      }
      &__text {
        font-size: 12px;
      }
      &__partners-item {
        img {
          max-width: 60px;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .home__items-slide {
      max-width: 310px;
    }
  }
</style>
