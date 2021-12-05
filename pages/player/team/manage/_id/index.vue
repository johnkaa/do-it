<template>
  <div class="manage-team">
    <h2 class="manage-team__title title">{{ name }}</h2>
    <div class="manage-team__items">
      <nuxt-link class="manage-team__item" :to="`/player/team/edit/${this.id}`">Edit Team</nuxt-link>
      <nuxt-link class="manage-team__item" :to="`/player/team/manage/${this.id}/add-players`">Add Players</nuxt-link>
      <nuxt-link class="manage-team__item" :to="`/player/team/manage/${this.id}/players`">Players</nuxt-link>
      <nuxt-link class="manage-team__item" :to="`/player/team/manage/${this.id}/tournaments`">Tournaments</nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'profile',
  async fetch() {
    const teamsRef = this.$fire.database.ref(`teams/${this.id}`)
    try {
      const snapshot = await teamsRef.once('value')
      this.name = snapshot.val()[this.id].name
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  mounted() {
    this.id = this.$route.params.id
  },
  data() {
    return {
      id: '',
      name: '',
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.manage-team {
  width: 100%;
  &__title {
    text-align: center;
    margin-bottom: 40px;
  }
  &__items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 64px;
  }
  &__item {
    padding: 30px 15px;
    min-width: 230px;
    border: 2px solid #20252B;
    font-size: 22px;
    font-weight: 700;
    line-height: 100%;
    text-align: center;
    cursor: pointer;
  }
}
</style>
