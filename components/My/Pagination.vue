<template>
  <div class="pagination">
    <ul class="pagination__items">
      <li class="pagination__arrow" @click="changePageArrow('start')"><<</li>
      <li class="pagination__arrow" @click="changePageArrow('back')"><</li>
      <li class="pagination__item" :class="{ active: currentPage === index }" v-for="index in totalPages" @click="changePage(index)">
        {{ index }}
      </li>
      <li class="pagination__arrow" @click="changePageArrow('next')">></li>
      <li class="pagination__arrow" @click="changePageArrow('end')">>></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['total', 'item'],
  computed: {
    totalPages() {
      return Math.ceil(this.item / this.total)
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.$emit('getPage', this.currentPage)
    },
    changePageArrow(arrow) {
      if(arrow === 'back' && this.currentPage !== 1) {
        this.currentPage--
        return this.$emit('getPage', this.currentPage)
      }
      if(arrow === 'next' && this.currentPage !== this.totalPages) {
        this.currentPage++
        return this.$emit('getPage', this.currentPage)
      }
      if(arrow === 'start') {
        this.currentPage = 1
        return this.$emit('getPage', this.currentPage)
      }
      if(arrow === 'end') {
        this.currentPage = this.totalPages
        return this.$emit('getPage', this.currentPage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    padding: 18px 0;
    &__items {
      display: flex;
      gap: 30px;
      justify-content: center;
    }
    &__item {
      cursor: pointer;
      &.active {
        font-size: 22px;
        font-weight: 500;
        color: #2787F6;
      }
    }
    &__arrow {
      cursor: pointer;
    }
  }
</style>
