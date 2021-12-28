<template>
  <div class="rules">
    {{ tournament.rules }}
  </div>
</template>

<script>
export default {
  async asyncData({ $fire }) {
    const tournamentsRef = $fire.database.ref('tournaments')
    try {
      const snapshot = await tournamentsRef.once('value')
      const tournaments = snapshot.val()
      return { tournaments }
    } catch (e) {
      console.log(e)
    }
  },
  mounted() {
    this.id = this.$route.params.id
    Object.keys(this.tournaments).forEach(item => {
      if(this.tournaments[item].id === this.id) {
        this.tournament = this.tournaments[item]
      }
    })
  },
  data() {
    return {
      id: '',
      tournament: '',
    }
  },
}
</script>
