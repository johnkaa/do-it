<template>
  <div class="news">
    <admin-panel class="news__top"
                 addText="news"
                 :edit="edit"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addNews"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="news__items">
      <div class="news__item" :class="{ edit: edit }">
        <div class="news__item-title" :class="{ active: sort === 'title' }" @click="sortByTitle">Title</div>
        <div class="news__item-title" :class="{ active: sort === 'author' }" @click="sortByAuthor">Author</div>
        <div class="news__item-title" :class="{ active: sort === 'categories' }" @click="sortByCategories">Categories</div>
        <div class="news__item-title" :class="{ active: sort === 'date' }" @click="sortByDate">Date</div>
      </div>
      <div class="news__item" :class="{ edit: edit }" v-for="item in searchedNews">
        <div class="news__item-info">{{ item.title }}</div>
        <div class="news__item-info">{{ item.author }}</div>
        <div class="news__item-info">{{ item.game }}</div>
        <div class="news__item-info">{{ item.date }}</div>
        <nuxt-link class="news__item-info edit" v-if="edit" :to="`/admin/edit/news/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getNews']),
    searchedNews() {
      if(this.filterGame) {
        return this.news.filter(element => {
          return (element.title.toLowerCase().includes(this.search.toLowerCase()) ||
            element.author.toLowerCase().includes(this.search.toLowerCase())) &&
            element.game.includes(this.filterGame)
        })
      }
      return this.news.filter(element => {
        return element.title.toLowerCase().includes(this.search.toLowerCase()) ||
          element.author.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    Object.keys(this.getNews).forEach(item => {
      this.news.push(this.getNews[item])
    })
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      news: [],
      sort: '',
      edit: false
    }
  },
  methods: {
    updateSearch(field) {
      this.search = field
    },
    updateFilter(game) {
      this.filterGame = game
    },
    setEdit(edit) {
      this.edit = edit
    },
    addNews() {
      this.$router.push(`/admin/edit/news/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    cancel() {
      this.$store.dispatch('setNewsAction')
      this.news = []
      Object.keys(this.getNews).forEach(item => {
        this.news.push(this.getNews[item])
      })
    },
    async save() {
      const newsRef = await this.$fire.database.ref('news')
      try {
        await newsRef.set(this.getNews)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Changes have been save')
    },
    sortByTitle() {
      this.sort = 'title'
      this.news.sort((a,b) => a.title.localeCompare(b.title))
    },
    sortByAuthor() {
      this.sort = 'author'
      this.news.sort((a,b) => a.author.localeCompare(b.author))
    },
    sortByCategories() {
      this.sort = 'categories'
      this.news.sort((a,b) => a.game.localeCompare(b.game))
    },
    sortByDate() {
      this.sort = 'date'
      this.news.sort((a,b) => a.date.localeCompare(b.date))
    },
  }
}
</script>

<style lang="scss" scoped>
.news {
  &__items {
    border: 2px solid #20252B;
    padding: 13px 30px 0;
  }
  &__item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    min-height: 48px;
    &-title {
      color: #E6E6E6;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      &:hover {
        background-color: rgba(#67707A, .3);
      }
      &::after {
        content: url(static/images/icons/sort-arrows.svg);
        display: inline-block;
        margin-top: 8px;
      }
      &.active {
        &::after {
          content: url(static/images/icons/sort-arrow.svg);
        }
      }
    }
    &-info {
      color: #67707A;
      margin-bottom: 15px;
    }
    &.edit {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
