<template>
  <div class="admin__top">
    <div class="admin__filter-items" v-if="!filterDisable">
      <div class="admin__filter-item" :class="{ active: item.title === game }" v-for="item in games" @click="updateFilter(item.title)">
        <img :src="item.gameIconImg" alt="">
      </div>
    </div>
    <div class="admin__search">
      <input class="admin__search-input" placeholder="Search by name, prize, signed, etc." v-model="search" @input="updateSearch"/>
    </div>
    <div class="admin__btns" v-if="!editInner">
      <div class="admin__btn" @click="updateEdit" v-if="!editDisable">
        <my-button class="secondary">Edit mode</my-button>
      </div>
      <div class="admin__btn" @click="add">
        <my-button class="secondary">+ Add {{ addText }}</my-button>
      </div>
    </div>
    <div class="admin__btns" v-if="editInner && !editDisable">
      <div class="admin__btn" @click="cancel">
        <my-button class="secondary">Cancel</my-button>
      </div>
      <div class="admin__btn" @click="save">
        <my-button class="secondary">Save changes</my-button>
      </div>
      <div class="admin__btn" @click="add">
        <my-button class="secondary">+ Add {{ addText }}</my-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['addText', 'edit', 'editDisable', 'filterDisable'],
  async fetch() {
    const gamesRef = this.$fire.database.ref('games')
    try {
      const snapshot = await gamesRef.once('value')
      this.games = snapshot.val()
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  mounted() {
    setTimeout(() => {
      if(this.edit) {
        this.editInner = this.edit
      }
    }, 500)
  },
  data() {
    return {
      search: '',
      games: {},
      game: '',
      editInner: false
    }
  },
  methods: {
    updateSearch() {
      this.$emit('updateSearch', this.search)
    },
    updateFilter(game) {
      if(this.game === game) {
        this.game = ''
        return this.$emit('updateFilter', this.game)
      }
      this.game = game
      this.$emit('updateFilter', this.game)
    },
    updateEdit() {
      this.editInner = !this.editInner
      this.$emit('setEdit', this.editInner)
    },
    add() {
      this.$emit('add')
    },
    cancel() {
      this.updateEdit()
      this.$emit('cancel')
    },
    save() {
      this.updateEdit()
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss" scoped>
  .admin {
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    &__search {
      position: relative;
      &-input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #20252B;
        width: 244px;
        color: #fff;
        padding-bottom: 2px;
        padding-right: 20px;
        &::placeholder {
          color: #434951;
        }
        &:focus {
          outline: none;
          border-color: #6f6f6f;
        }
      }
      &::after {
        content: '';
        background-image: url(static/images/icons/search.svg);
        width: 18px;
        height: 18px;
        position: absolute;
        right: 0;
      }
    }
    &__filter-items {
      display: flex;
      gap: 8px;
    }
    &__filter-item {
      border: 2px solid #20252B;
      cursor: pointer;
      width: 44px;
      height: 44px;
      padding: 6px;
      &.active {
        background-color: #fff;
      }
    }
    &__btns {
      display: flex;
      gap: 16px;
    }
    &__btn {
      max-width: 190px !important;
    }
  }
  @media (max-width: 900px) {
    .admin__top {
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }
  }
</style>
