<template>
  <div class="home">
    <div class="home__top" v-if="!auth">
      <h1 class="home__title">DOIT BETA</h1>
      <p class="home__text">
        Prepare for your esports career and get ready for awesome tournaments with big prize pools and many fun! <span>Register Now!</span>
      </p>
      <div class="home__btns">
        <nuxt-link class="home__btn" to="/auth/login">
          <my-button class="secondary">Login</my-button>
        </nuxt-link>
        <nuxt-link class="home__btn" to="/auth/register">
          <my-button>Sign Up</my-button>
        </nuxt-link>
      </div>
    </div>
    <div class="home__tournaments">
      <filtered-slider title="Tournaments" :tournaments="true"/>
    </div>
    <div class="home__news">
      <filtered-slider title="News" :items="news" :news="true"/>
    </div>
    <div class="home__streams">
      <h2>Streams</h2>
      <filtered-slider title="Streams" :streams="true"/>
<!--      <div v-for="item in streams" :key="item">-->
<!--        {{ item }}-->
<!--        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${item.videoId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
<!--      </div>-->
    </div>
    <div class="home__partners">
      <div class="home__partners-title title">Partners</div>
      <div class="home__partners-items">
        <div class="home__partners-item" v-for="(item, index) in partners" :key="index">
          <img :src="item.img" alt="">
        </div>
      </div>
    </div>
    <div class="home__games">
      <div class="home__games-title title">Games</div>
      <default-slider :items="games" />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Home'
  },
  mounted() {
    this.getUser()
    this.getNews()
    this.getStreams()
    this.getPartners()
    this.getGames()
  },
  data() {
    return {
      auth: false,
      user: {},
      news: [],
      streams: [],
      partners: [],
      games: [],
    }
  },
  methods: {
    async getUser() {
      this.$fire.auth.onAuthStateChanged(async (user) => {
        if(user) {
          this.auth = true
          const usersRef = this.$fire.database.ref('users')
          try {
            const snapshot = await usersRef.once('value')
            const users = snapshot.val()
            Object.keys(users).forEach((user) => {
              if(users[user].uid = this.$fire.auth.currentUser.uid) {
                this.user = users[user]
              }
            })
            this.lvlWidth = this.user.lvl + '%'
          } catch (e) {
            console.log(e)
          }
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
    async getNews() {
      const newsRef = this.$fire.database.ref('news')
      try {
        const snapshot = await newsRef.once('value')
        this.news = snapshot.val()
      } catch (e) {
        console.log(e)
      }
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
    async getGames() {
      const gamesRef = this.$fire.database.ref('games')
      try {
        const snapshot = await gamesRef.once('value')
        this.games = snapshot.val()
      } catch (e) {
        console.log(e)
      }
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
</style>
