<template>
  <div class="news-edit">
    <div class="news-edit__title">New/Edit News</div>
    <form class="news-edit__form" @submit.prevent="submit">
      <div class="news-edit__form-inner">
        <div class="news-edit__form-title">Basic info</div>
        <p class="news-edit__form-text">Title</p>
        <my-input class="news-edit__form-input secondary" :field="title" @updateField="updateTitle"/>
        <p class="news-edit__form-text">Text</p>
        <my-input class="news-edit__form-input secondary" :field="text" @updateField="updateText"/>
        <p class="news-edit__form-text">Author</p>
        <my-dropdown class="news-edit__form-dropdown secondary"
                     :title="author || `Anonymous`"
                     @updateSelect="updateAuthor"
                     :items="authors"/>
        <p class="news-edit__form-text">Game</p>
        <my-dropdown class="news-edit__form-dropdown secondary"
                     :title="game || 'Game'"
                     @updateSelect="updateGame"
                     :items="games"/>
      </div>
      <div class="news-edit__form-inner">
        <div class="news-edit__form-title">Advance info</div>
        <p class="news-edit__form-text">Image 300x300</p>
        <my-file-input name="Image url" :path="`news/${this.id}/img`" :img="img" @uploadFile="uploadImg"/>
      </div>
      <div class="news-edit__form-btns">
        <nuxt-link to="/admin/news" v-if="this.new"><my-button class="news-edit__form-btn secondary">Back</my-button></nuxt-link>
        <div v-else @click="deleteNews" v-else><my-button class="news-edit__form-btn secondary" type="button">Delete News</my-button></div>
        <my-button class="news-edit__form-btn secondary">Save changes</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['getNews', 'getGames', 'getPlayers']),
  mounted() {
    this.id = this.$route.params.id
    if(this.getNews[this.id]) {
      this.title = this.getNews[this.id].title
      this.text = this.getNews[this.id].text
      this.author = this.getNews[this.id].author
      this.game = this.getNews[this.id].game
      this.img = this.getNews[this.id].img
      this.date = this.getNews[this.id].date
    } else {
      this.new = true
      this.getDateNow()
    }
    Object.keys(this.getGames).forEach(item => this.games.push(this.getGames[item].title))
    Object.keys(this.getPlayers).forEach(item => this.authors.push(this.getPlayers[item].username))
  },
  data() {
    return {
      id: '',
      title: '',
      author: 'Anonymous',
      authors: ['Anonymous'],
      game: '',
      games: [],
      img: '',
      date: '',
      new: false
    }
  },
  methods: {
    async submit() {
      if(!this.title && !this.text && !this.author && !this.game && !this.img) {
        return this.$toasted.error('All fields are required!')
      }
      const newsUpdate = {
        id: this.id,
        title: this.title,
        text: this.text,
        author: this.author,
        game: this.game,
        img: this.img,
        date: this.date,
      }
      this.$store.dispatch('setNewsInfoAction', newsUpdate)
      this.$router.push({
        path: '/admin/news',
        query: {
          edit: true
        }
      })
      if(this.new) {
        this.$toasted.success('News have been created')
      } else {
        this.$toasted.success('News have been changed')
      }
    },
    deleteNews() {
      const newsDelete = {
        id: this.id,
        delete: true,
      }
      this.$store.dispatch('setNewsInfoAction', newsDelete)
      this.$router.push({
        path: '/admin/news',
        query: {
          edit: true
        }
      })
      this.$toasted.success('News have been changed')
    },
    getDateNow() {
      const dateObj = new Date()
      let day = dateObj.getDate()
      let month = (dateObj.getMonth() + 1)
      if(day < 10) {
        day = '0' + day
      }
      if(month < 10) {
        month = '0' + month
      }
      this.date = day + '/' + month + '/' + dateObj.getFullYear()
    },
    updateTitle(field) {
      this.title = field
    },
    updateText(field) {
      this.text = field
    },
    updateAuthor(select) {
      this.author = select
    },
    updateGame(select) {
      this.game = select
    },
    uploadImg(img) {
      this.img = img
    },
  }
}
</script>

<style lang="scss" scoped>
.news-edit {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
  &__title {
    text-align: center;
    margin-bottom: 30px;
    color: #0F1215;
    background-color: #D8DFEB;
    padding: 30px 0;
    font-weight: 700;
    font-size: 22px;
  }
  &__form {
    color: #CCCDCD;
    max-width: 620px;
    margin: 0 auto;
    &-inner {
      padding: 44px 60px;
      border: 1px solid #20252B;
      margin-bottom: 33px;
    }
    &-title {
      font-weight: 700;
      margin-bottom: 40px;
    }
    &-text {
      margin-bottom: 12px;
    }
    &-input {
      margin-bottom: 22px;
    }
    &-dropdown {
      margin-bottom: 22px;
    }
    &-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 34px;
    }
    &-btn {
      max-width: 160px;
    }
  }
}
</style>
