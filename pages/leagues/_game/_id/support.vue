<template>
  <div class="support">
    <div class="support__title title">Ask your question</div>
    <my-textarea class="secondary" :changes="i" @updateField="updateQuestion" />
    <div class="support__btn" @click="ask">
      <my-button>Ask</my-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id
    this.game = this.$route.params.game
  },
  data() {
    return {
      id: '',
      game: '',
      question: '',
      i: 0
    }
  },
  methods: {
    async ask() {
      if(this.question.length === 0) {
        return this.$toasted.error('Field are required')
      }
      try {
        const questionRef = this.$fire.database.ref(`support/leagues/${this.game}/${this.id}/${(+new Date()-(+new Date()%100)) / 10}`)
        await questionRef.set(this.question)
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.$toasted.success('Your question has been send')
      this.i++
      this.question = ''
    },
    updateQuestion(field) {
      this.question = field
    }
  }
}
</script>

<style lang="scss" scoped>
  .support__title {
    text-align: center;
    margin-bottom: 20px;
  }
  .support__btn {
    margin-top: 10px;
  }
</style>
