<template>
  <div class="calendar">
    <admin-panel class="calendar__top"
                 addText="event"
                 :edit="edit"
                 @updateSearch="updateSearch"
                 @updateFilter="updateFilter"
                 @setEdit="setEdit"
                 @add="addEvent"
                 @cancel="cancel"
                 @save="save"
    />
    <div class="calendar__items">
      <div class="calendar__item" :class="{ edit: edit }">
        <div class="calendar__item-title" :class="{ active: sort === 'title' }" @click="sortByTitle">Event's name</div>
        <div class="calendar__item-title" :class="{ active: sort === 'start' }" @click="sortByStart">Start Date</div>
        <div class="calendar__item-title" :class="{ active: sort === 'end' }" @click="sortByEnd">End Date</div>
        <div class="calendar__item-title" :class="{ active: sort === 'website' }" @click="sortByWebsite">Website</div>
      </div>
      <div class="calendar__item" :class="{ edit: edit }" v-for="item in searchedEvents">
        <div class="calendar__item-info">{{ item.title }}</div>
        <div class="calendar__item-info">{{ item.dateOfStart }}</div>
        <div class="calendar__item-info">{{ item.dateOfEnd }}</div>
        <div class="calendar__item-info">{{ item.website }}</div>
        <nuxt-link class="calendar__item-info edit" v-if="edit" :to="`/admin/edit/events/${item.id}`">edit</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getEvents']),
    searchedEvents() {
      if(this.filterGame) {
        return this.events.filter(element => {
          return element.title.toLowerCase().includes(this.search.toLowerCase()) &&
            element.game.includes(this.filterGame)
        })
      }
      return this.events.filter(element => {
        return element.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
      if(this.getEvents) {
        Object.keys(this.getEvents).forEach(item => {
          this.events.push(this.getEvents[item])
        })
      }
    if(this.$route.query.edit) {
      this.edit = true
    }
  },
  data() {
    return {
      filterGame: '',
      search: '',
      events: [],
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
    addEvent() {
      this.$router.push(`/admin/edit/events/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    cancel() {
      this.$store.dispatch('setEventsAction')
      this.events = []
      Object.keys(this.getEvents).forEach(item => {
        this.events.push(this.getEvents[item])
      })
    },
    async save() {
      const newsRef = await this.$fire.database.ref('events')
      try {
        await newsRef.set(this.getEvents)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Changes have been save')
    },
    sortByTitle() {
      this.sort = 'title'
      this.events.sort((a,b) => a.title.localeCompare(b.title))
    },
    sortByStart() {
      this.sort = 'start'
      this.events.sort((a,b) => a.dateOfStart.localeCompare(b.dateOfStart))
    },
    sortByEnd() {
      this.sort = 'end'
      this.events.sort((a,b) => a.dateOfEnd.localeCompare(b.dateOfEnd))
    },
    sortByWebsite() {
      this.sort = 'website'
      this.events.sort((a,b) => a.website.localeCompare(b.website))
    },
  }
}
</script>

<style lang="scss" scoped>
.calendar {
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
