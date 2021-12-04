<template>
  <div class="news">
    <div class="news__top">
      <h2 class="news__title title">News</h2>
      <div class="news__filter">
        <select-categories />
      </div>
    </div>
    <div class="news__items">
      <news-card
        class="news__item"
        v-for="(item, index) in news"
        :key="index"
        :bigSize="index % 6 === 0 || index % 6 === 1"
        :img="item.img"
        :title="item.title"
        :text="item.text"
      />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'News'
  },
  async fetch() {
    const newsRef = this.$fire.database.ref('news')
    try {
      const snapshot = await newsRef.once('value')
      this.news = snapshot.val()
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  data() {
    return {
      news: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .news {
    padding-bottom: 50px;
    &__top {
      display: flex;
    }
    &__title {
      margin-bottom: 34px;
      margin-right: 48px;
    }
    &__items {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
  }
  @media (max-width: 1300px) {
    .news__items {
      justify-content: space-between;
    }
  }
  @media (max-width: 700px) {
    .news__top {
      display: block;
      margin-bottom: 20px;
    }
    .news__title {
      margin-bottom: 10px;
    }
  }
</style>
