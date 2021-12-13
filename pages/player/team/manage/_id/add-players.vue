<template>
  <div class="add-players">
    <h2 class="add-players__title title">Add players</h2>
    <div class="add-players__items">
      <div class="add-players__item" v-for="item in usersFiltered" v-if="item.username" @click="addPlayer(item.id, item.username)">{{ item.username }}</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'profile',
  async fetch() {
    const usersRef = this.$fire.database.ref('users')
    try {
      const snapshot = await usersRef.once('value')
      this.users = snapshot.val()
    } catch (e) {
      this.$toasted.error(e)
    }
    const teamRef = this.$fire.database.ref(`teams/${this.id}`)
    try {
      const snapshot = await teamRef.once('value')
      this.team = snapshot.val()
      Object.keys(this.team.players).forEach((item) => {
        this.teamPlayers.push(this.team.players[item].name)
      })
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  computed: {
    usersFiltered() {
      let users = this.users
      Object.keys(users).forEach((item) => {
        for(let i = 0; i < this.teamPlayers.length; i++) {
          if(users[item]) {
            if(users[item].username === this.teamPlayers[i]) {
              delete users[item]
            }
          } else {
            this.$toasted.error('Players not found')
            this.$router.go(-1)
          }
        }
      })
      return users
    }
  },
  mounted() {
    this.id = this.$route.params.id
  },
  data() {
    return {
      id: '',
      users: {},
      team: {},
      teamPlayers: []
    }
  },
  methods: {
    async addPlayer(id, username) {
      const userRef = await this.$fire.database.ref(`users/${id}/teams/${this.id}`)
      try {
        await userRef.set({
          id: this.id,
          name: this.team.name,
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      const teamRef = await this.$fire.database.ref(`teams/${this.id}/players/${id}`)
      try {
        await teamRef.set({
          id: id,
          name: username,
        })
      } catch (e) {
        this.$toasted.error(e)
      }
      this.teamPlayers.push(username)
      this.$toasted.success(`${username} has been added to team`)
    },
  }
}
</script>

<style lang="scss" scoped>
  .add-players {
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
