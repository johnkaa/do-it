<template>
  <div class="rules">
    {{ league.rules }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLeagues']),
  },
  mounted() {
    this.id = this.$route.params.id
    this.$store.dispatch('setLeaguesAction')
    setTimeout(() => {
      Object.keys(this.getLeagues).forEach(item => {
        if(this.getLeagues[item].id === this.id) {
          this.league = this.getLeagues[item]
        }
      })
    }, 500)
  },
  data() {
    return {
      id: '',
      league: '',
    }
  },
}
</script>
