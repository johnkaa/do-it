<template>
  <textarea class="input"
            :placeholder="placeholder"
            v-model="field"
            @input="updateField"></textarea>
</template>

<script>
export default {
  props: ['placeholder', 'field'],
  methods: {
    updateField() {
      this.$emit('updateField', this.field)
    }
  }
}
</script>

<style lang="scss" scoped>
  .input {
    font-family: 'Rubik', sans-serif;
    outline: none;
    background-color: transparent;
    border: 1px solid #16263D;
    border-radius: 2px;
    padding: 12px 16px;
    color: #E6E6E6;
    transition: all .3s;
    width: 100%;
    height: 250px;
    resize: none;
    &:focus {
      border-color: #627CA3;
      background-color: #121F33;
    }
    &:active {
      border-color: #185EC7;
      background-color: #16263D;
    }
    &:disabled {
      border: none;
      color: #98A4B5;
      background-color: #121F33;
    }
    &::placeholder {
      color: #627CA3;
    }
  }
</style>
