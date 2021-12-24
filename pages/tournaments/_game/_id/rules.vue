<template>
  <div class="rules">
    {{ tournament.rules }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTournaments']),
  },
  mounted() {
    this.id = this.$route.params.id
    this.$store.dispatch('setTournamentsAction')
    setTimeout(() => {
      Object.keys(this.getTournaments).forEach(item => {
        if(this.getTournaments[item].id === this.id) {
          this.tournament = this.getTournaments[item]
        }
      })
    }, 500)
  },
  data() {
    return {
      id: '',
      tournament: '',
    }
  },
}
</script>
