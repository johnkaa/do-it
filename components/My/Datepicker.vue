<template>
  <div class="datepicker" :class="{ active: active }">
    <button class="datepicker__title" type="button" @click="setActive">{{ date || valueDate || 'Choose a date' }}</button>
    <v-date-picker
      class="datepicker__calendar"
      locale="en"
      title-position="left"
      :min-date="'Fri Dec 31 1955 02:39:31'"
      :max-date="'Fri Dec 31 2015 02:39:31'"
      v-model="select"/>
  </div>
</template>

<script>
export default {
  props: ['valueDate'],
  watch: {
    select() {
      let day = ''
      let month = ''
      if(this.select.getDate() < 10) {
        day = '0' + this.select.getDate()
      }
      if(this.select.getMonth() < 10) {
        month = '0' + (this.select.getMonth() + 1)
      }
      this.date = (day || this.select.getDate()) + '-' + (month || (this.select.getMonth() + 1)) + '-' + this.select.getFullYear()
      this.$emit('updateDate', this.date)
      this.setActive()
    }
  },
  data() {
    return {
      select: '',
      date: '',
      active: false
    }
  },
  methods: {
    setActive() {
      this.active = !this.active
    },
  }
}
</script>

<style lang="scss" scoped>
  .datepicker {
    position: relative;
    &__title {
      position: relative;
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 30px 12px 16px;
      border: 1px solid #1C2F4D;
      border-radius: 2px;
      background-color: transparent;
      color: #627CA3;
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
  .datepicker.secondary {
    .datepicker__title {
      color: #CCCDCD;
      border: 1px solid #20252B;
    }
  }
  .datepicker.active .datepicker__calendar {
    display: block;
  }
</style>

