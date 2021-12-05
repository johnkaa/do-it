<template>
  <div class="tournaments">
    <h2 class="tournaments__title title">Tournaments</h2>
    <div class="tournaments__items">
      <div class="tournaments__item" v-for="item in players">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'profile',
  async fetch() {
    const teamRef = this.$fire.database.ref(`teams/${this.id}`)
    try {
      const snapshot = await teamRef.once('value')
      const team = snapshot.val()[this.id]
      Object.keys(team.players).forEach((item) => {
        this.players.push(team.players[item].name)
      })
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
      teamPlayers: '1',
      players: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.tournaments {
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
