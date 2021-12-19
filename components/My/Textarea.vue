<template>
  <textarea class="input"
            :placeholder="placeholder"
            v-model="input"
            @input="updateField"></textarea>
</template>

<script>
export default {
  props: ['placeholder', 'field'],
  mounted() {
    setTimeout(() => {
      if(this.field) {
        this.input = this.field
      }
    }, 500)
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    updateField() {
      this.$emit('updateField', this.input)
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
  .input.secondary {
    background: #0F1215;
    border: 2px solid #20252B;
    .input {
      &::placeholder {
        color: #CCCDCD;
      }
      &:focus {
        border-color: lighten(#20252B, 10%);
        background-color: lighten(#0F1215, 2%);
      }
    }
  }
</style>
