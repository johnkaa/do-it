<template>
  <div class="team">
    <h2 class="team__title title">My Team</h2>
    <div class="team__items">
      <div class="team__item" v-if="getUser.teams" v-for="item in getUser.teams" @click="manageTeam(item.id)">{{ item.name }}</div>
      <div class="team__item" @click="createTeam">Create Team</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
  methods: {
    createTeam() {
      this.$router.push(`/player/team/create/${(+new Date()-(+new Date()%100)) / 100}`)
    },
    manageTeam(id) {
      this.$router.push(`/player/team/manage/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .team {
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
