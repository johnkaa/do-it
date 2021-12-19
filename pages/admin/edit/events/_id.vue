<template>
  <div class="events-edit">
    <div class="events-edit__title">New/Edit Event</div>
    <form class="events-edit__form" @submit.prevent="submit">
      <div class="events-edit__form-inner">
        <div class="events-edit__form-title">Basic info</div>
        <p class="events-edit__form-text">Event title</p>
        <my-input class="events-edit__form-input secondary" :field="title" @updateField="updateTitle"/>
        <p class="events-edit__form-text">Game</p>
        <my-dropdown class="events-edit__form-dropdown secondary"
                     :title="game || 'Choose a game'"
                     @updateSelect="updateGame"
                     :items="games"/>
        <p class="events-edit__form-text">Date of event</p>
        <div class="events-edit__form-dropdown datepicker" :class="{ active: active }">
          <button class="datepicker__title" type="button" @click="active = !active">{{ valueOfDate  || 'Choose a date' }}</button>
          <v-date-picker
            class="datepicker__calendar"
            locale="en"
            :min-date="new Date()"
            title-position="left"
            v-model="range"
            is-range/>
        </div>
        <p class="events-edit__form-text">Web-site</p>
        <my-input class="events-edit__form-input secondary" :field="website" placeholder="user.com" @updateField="updateWebsite"/>
      </div>
      <div class="events-edit__form-btns">
        <nuxt-link to="/admin/events" v-if="this.new"><my-button class="events-edit__form-btn secondary">Back</my-button></nuxt-link>
        <div v-else @click="deleteEvent"><my-button class="events-edit__form-btn secondary" type="button">Delete Player</my-button></div>
        <my-button class="events-edit__form-btn secondary">Save changes</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['getEvents', 'getGames']),
  watch: {
    range() {
      this.rangeOfDate()
      this.active = false
      this.valueOfDate = this.dateOfStart + ' - ' + this.dateOfEnd
    }
  },
  mounted() {
    this.id = this.$route.params.id
    Object.keys(this.getGames).forEach(item => {
      this.games.push(this.getGames[item].title)
    })
    if(this.getEvents[this.id]) {
      this.title = this.getEvents[this.id].title
      this.valueOfDate = this.getEvents[this.id].valueOfDate
      this.dateOfStart = this.getEvents[this.id].dateOfStart
      this.dateOfEnd = this.getEvents[this.id].dateOfEnd
      this.game = this.getEvents[this.id].game
      this.website = this.getEvents[this.id].website
    } else {
      this.new = true
    }
  },
  data() {
    return {
      id: '',
      title: '',
      range: {
        start: '',
        end: ''
      },
      dateOfStart: '',
      dateOfEnd: '',
      games: [],
      game: '',
      website: '',
      new: false,
      active: false,
      valueOfDate: ''
    }
  },
  methods: {
    async submit() {
      if(!this.title && !this.dateOfStart && !this.game) {
        return this.$toasted.error('All fields are required!')
      }
      const eventUpdate = {
        id: this.id,
        title: this.title,
        dateOfStart: this.dateOfStart,
        dateOfEnd: this.dateOfEnd,
        valueOfDate: this.valueOfDate,
        game: this.game,
        website: this.website,
      }
      this.$store.dispatch('setEventInfoAction', eventUpdate)
      this.$router.push({
        path: '/admin/calendar',
        query: {
          edit: true
        }
      })
      if(this.new) {
        this.$toasted.success('Event have been created')
      } else {
        this.$toasted.success('Event have been changed')
      }
    },
    deleteEvent() {
      const eventDelete = {
        id: this.id,
        delete: true
      }
      this.$store.dispatch('setEventInfoAction', eventDelete)
      this.$router.push({
        path: '/admin/events',
        query: {
          edit: true
        }
      })
      this.$toasted.success('Event have been deleted')
    },
    rangeOfDate() {
      let startDay = this.range.start.getDate()
      let endDay = this.range.end.getDate()
      let startMonth = this.range.start.getMonth() + 1
      let endMonth = this.range.end.getMonth() + 1
      if(startDay < 10) {
        startDay = '0' + startDay
      }
      if(endDay < 10) {
        endDay = '0' + endDay
      }
      if(startMonth < 10) {
        startMonth = '0' + startMonth
      }
      if(endMonth < 10) {
        endMonth = '0' + endMonth
      }
      this.dateOfStart = startDay + '/' + startMonth + '/' + this.range.start.getFullYear()
      this.dateOfEnd = endDay + '/' + endMonth + '/' + this.range.start.getFullYear()
    },
    updateTitle(field) {
      this.title = field
    },
    updateGame(select) {
      this.game = select
    },
    updateWebsite(field) {
      this.website = field
    },
  }
}
</script>

<style lang="scss" scoped>
  .events-edit {
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
  .datepicker {
    position: relative;
    &__title {
      position: relative;
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 30px 12px 16px;
      color: #CCCDCD;
      border: 1px solid #20252B;
      border-radius: 2px;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      &::after {
        content: '';
        width: 22px;
        height: 22px;
        background-image: url(static/images/icons/datepicker.svg);
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: auto;
      }
    }
    &__calendar {
      display: none;
      position: absolute;
      top: 44px;
      z-index: 1;
    }
  }
  .datepicker.active .datepicker__calendar {
    display: block;
  }
</style>
