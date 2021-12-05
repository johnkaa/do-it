<template>
  <div class="support">
    <h2 class="support__title title">Support</h2>
    <form class="support__form" @submit.prevent="submit">
      <my-input class="support__input" placeholder="Name" @updateField="updateName"/>
      <my-input class="support__input" placeholder="Topic" @updateField="updateTopic"/>
      <my-textarea class="support__input" placeholder="Your problem" @updateField="updateProblem"/>
      <my-button class="support__btn">Submit</my-button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'profile',
  data() {
    return {
      name: '',
      topic: '',
      problem: ''
    }
  },
  methods: {
    async submit() {
      if(!this.name && !this.topic && !this.problem) {
        return this.$toasted.error('All fields are required')
      }
      const usersRef = await this.$fire.database.ref(`support/${(+new Date()-(+new Date()%100)) / 100}`)
      try {
        await usersRef.set({
          id: (+new Date()-(+new Date()%100)) / 100,
          name: this.name,
          topic: this.topic,
          problem: this.problem
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      this.$toasted.success('Success')
    },
    updateName(field) {
      this.name = field
    },
    updateTopic(field) {
      this.topic = field
    },
    updateProblem(field) {
      this.problem = field
    },
  }
}
</script>

<style lang="scss" scoped>
  .support {
    max-width: 100%;
    margin: 0 auto;
    &__title {
      text-align: center;
      margin-bottom: 40px;
    }
    &__form {
      width: 510px;
    }
    &__input {
      margin-bottom: 9px;
      &:last-child {
        max-height: 500px;
      }
    }
    &__btn {
      max-width: 250px;
      position: relative;
      left: 50%;
      margin-top: 25px;
      transform: translateX(-50%);
    }
  }
  @media (max-width: 600px) {
    .support__form {
      max-width: 300px;
    }
  }
</style>
