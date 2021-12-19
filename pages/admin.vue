<template>
  <div class="admin">
    <div class="admin__nav">
      <nuxt-link class="admin__nav-item" to="/admin/tournaments">Tournaments</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/leagues">Leagues</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/players">Players</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/payments">Payments</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/calendar">Calendar</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/teams">Teams</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/news">News</nuxt-link>
      <nuxt-link class="admin__nav-item" to="/admin/games">Games</nuxt-link>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Admin'
  },
  mounted() {
    this.$store.dispatch('setPlayersAction')
    this.$store.dispatch('setGamesAction')
    this.$store.dispatch('setNewsAction')
    this.$store.dispatch('setTeamsAction')
    this.$store.dispatch('setPaymentsAction')
    this.$store.dispatch('setEventsAction')
    this.$store.dispatch('setTournamentsAction')
    this.$store.dispatch('setLeaguesAction')
  },
}
</script>

<style lang="scss" scoped>
  .admin {
    margin-top: 80px;
    &__nav {
      display: flex;
      margin-bottom: 40px;
      &-item {
        font-size: 17px;
        font-weight: 700;
        line-height: 100%;
        padding: 30px 15px;
        max-width: 146px;
        width: 100%;
        border: 2px solid #20252B;
        text-align: center;
        &.nuxt-link-exact-active {
          color: #0F1215;
          background-color: #D8DFEB;
        }
        &.nuxt-link-active {
          color: #0F1215;
          background-color: #D8DFEB;
        }
      }
      &-item + &-item {
        border-left: none;
      }
    }
  }
  @media (max-width: 900px) {
    .admin__nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      &-item + &-item {
        border: 2px solid #20252B;
      }
    }
  }
</style>
