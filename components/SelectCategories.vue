<template>
  <div class="select-categories">
    <div class="select-categories__item" :class="{ active: item === filteredGame }" v-for="item in items" :key="item" @click="updateFilter(item)">{{ item }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['All', 'StarCraft II', 'Dota II', 'CS:GO', 'Fortnite'],
      filteredGame: '',
    }
  },
  methods: {
    updateFilter(name) {
      if(this.filteredGame === name) {
        this.filteredGame = ''
      } else {
        this.filteredGame = name
      }
      this.$emit('updateFilter', this.filteredGame)
    },
  },
}
</script>

<style lang="scss" scoped>
  .select-categories {
    display: flex;
    align-items: center;
    &__item {
      font-weight: 500;
      font-size: 18px;
      color: #A0A5AD;
      cursor: pointer;
      padding: 16px;
      background-color: #14191F;
      &.active {
        color: #0F1215;
        background-color: #D8DFEB;
      }
    }
  }
</style>
