<template>
  <div class="radio-select">
    <label class="radio__wrapper" v-for="(select, index) in selects" :key="index">
      <input class="radio" :name="name" :id="index" type="radio" :value="select.title" v-model="selected" @change="updateRadioSelect">
      <span class="radio__style"></span>
      <span class="radio__text">{{ select.title }}</span>
    </label>

  </div>
</template>

<script>
export default {
  props: ['selects', 'name', 'selectValue'],
  mounted() {
    setTimeout(() => {
      if(this.selectValue) {
        this.selected = this.selectValue
      }
    }, 500)
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    updateRadioSelect() {
      this.$emit('updateRadioSelect', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
  .radio__wrapper {
    padding-left: 28px;
    position: relative;
    display: flex;
    margin-bottom: 8px;
    flex-direction: column;
    cursor: pointer;
  }
  .radio__style {
    width: 20px;
    height: 20px;
    border: 2px solid #20252B;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .radio {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    &:checked {
      + .radio__style {
        &::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #2281F2;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
      }
    }
  }
</style>
