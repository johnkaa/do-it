<template>
  <div class="games-edit">
    <div class="games-edit__title">New/Edit Game</div>
    <form class="games-edit__form" @submit.prevent="submit">
      <div class="games-edit__form-inner">
        <div class="games-edit__form-title">Basic info</div>
        <div class="games-edit__form-input">
          <p class="games-edit__form-text">Game name</p>
          <my-input class="secondary" :field="title" @updateField="updateTitle"/>
          <p class="games-edit__fail-message" v-if="$v.title.$error">Field is required</p>
        </div>
        <p class="games-edit__form-text">URL</p>
        <div class="games-edit__form-url">doit.gg/games/{{ this.id }}</div>
        <p class="games-edit__form-text">Description</p>
        <my-textarea class="games-edit__form-input secondary" :field="description" @updateField="updateDescription"/>
      </div>
      <div class="games-edit__form-inner">
        <div class="games-edit__form-title">Capsules</div>
        <div class="games-edit__form-file">
          <p class="games-edit__form-text">Main Banner 387x500</p>
          <my-file-input name="banner url" :path="`games/${this.id}/main-banner`" :img="img" @uploadFile="uploadMainBannerImg"/>
          <p class="games-edit__fail-message" v-if="$v.img.$error">Field is required</p>
        </div>
        <p class="games-edit__form-text">Mobile Banner 329x129*</p>
        <my-file-input name="banner url" :path="`games/${this.id}/mobile-banner`" :img="mobileBannerImg" @uploadFile="uploadMobileBannerImg"/>
        <div class="games-edit__form-file">
          <p class="games-edit__form-text">Game icon 32x32</p>
          <my-file-input name="icon url" :path="`games/${this.id}/game-icon`" :img="gameIconImg" @uploadFile="uploadGameIconImg"/>
          <p class="games-edit__fail-message" v-if="$v.gameIconImg.$error">Field is required</p>
        </div>
        <div class="games-edit__form-file">
          <p class="games-edit__form-text">Game logo 64x64</p>
          <my-file-input name="logo url" :path="`games/${this.id}/game-logo`" :img="gameLogoImg" @uploadFile="uploadGameLogoImg"/>
          <p class="games-edit__fail-message" v-if="$v.gameLogoImg.$error">Field is required</p>
        </div>
        <p class="games-edit__form-text">Game background 2206x2278</p>
        <my-file-input name="background url" :path="`games/${this.id}/background`" :img="backgroundImg" @uploadFile="uploadBackgroundImg"/>
      </div>
      <div class="games-edit__form-inner">
        <div class="games-edit__form-title">Tournament system</div>
        <div class="games-edit__form-radio">
          <p class="games-edit__form-text">Active</p>
          <my-radio-select :selects="selectArray" :selectValue="tournamentsActive" name="TournamentSystem" @updateRadioSelect="updateTournamentsActive"/>
          <p class="games-edit__fail-message" v-if="$v.tournamentsActive.$error">Field is required</p>
        </div>
        <div class="games-edit__form-item" v-if="this.tournamentsActive === 'Yes'">
          <p class="games-edit__form-text">Servers system</p>
          <my-dropdown class="games-edit__form-dropdown secondary"
                       :title="serverSystem || 'Server system'"
                       @updateSelect="updateServerSystem"
                       :items="['Counter Strike Global Offensive', 'Dota II']"/>
        </div>
      </div>
      <div class="games-edit__form-inner">
        <div class="games-edit__form-title">Map voting</div>
        <p class="games-edit__form-text">Active</p>
        <my-radio-select :selects="selectArray" :selectValue="mapVotingActive" name="MapVoting" @updateRadioSelect="updateMapVotingActive"/>
        <div class="games-edit__form-item" v-if="this.mapVotingActive === 'Yes'">
          <p class="games-edit__form-text">Maps</p>
          <div class="games-edit__form-maps">
            <div class="games-edit__form-map" v-for="(item, index) in maps">
              <div class="games-edit__form-map-delete" :class="{ hidden: index === 0 }" @click="deleteMap(index)">x</div>
              <div class="games-edit__form-map-title">Map {{ index + 1 }}</div>
              <div class="games-edit__form-map-inner">
                <my-input class="games-edit__form-map-input secondary" placeholder="Map name" :field="item.name" :index="index" @updateField="updateMapName" />
                <my-file-input class="games-edit__form-map-file-input" name="Logo map" :path="`games/maps/${(+new Date()-(+new Date()%100)) / 100}`" :index="index" :disablePreview="true" :img="item.img" @uploadFile="uploadMapImg"/>
              </div>
            </div>
            <div class="games-edit__form-maps-btn" @click="addMap">
              <my-button class="secondary" type="button">+ Add Map</my-button>
            </div>
          </div>
        </div>
      </div>
      <div class="games-edit__form-btns">
        <nuxt-link to="/admin/games" v-if="this.new"><my-button class="games-edit__form-btn secondary">Back</my-button></nuxt-link>
        <div v-else @click="deleteGame"><my-button class="games-edit__form-btn secondary" type="button">Delete Game</my-button></div>
        <my-button class="games-edit__form-btn secondary">Save changes</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength } from "vuelidate/lib/validators"

export default {
  computed: mapGetters(['getGames']),
  mounted() {
    this.id = this.$route.params.id
    if(this.getGames[this.id]) {
      this.title = this.getGames[this.id].title
      this.description = this.getGames[this.id].description
      this.img = this.getGames[this.id].img
      this.mobileBannerImg = this.getGames[this.id].mobileBannerImg
      this.gameIconImg = this.getGames[this.id].gameIconImg
      this.gameLogoImg = this.getGames[this.id].gameLogoImg
      this.backgroundImg = this.getGames[this.id].backgroundImg
      this.tournamentsActive = this.getGames[this.id].tournamentsActive
      this.serverSystem = this.getGames[this.id].serverSystem
      this.mapVotingActive = this.getGames[this.id].mapVotingActive
      if(this.getGames[this.id].maps) {
        Object.keys(this.getGames[this.id].maps).forEach(item => this.maps.push(this.getGames[this.id].maps[item]))
      }
    } else {
      this.new = true
      this.maps.push({name: '', img: ''})
    }
  },
  data() {
    return {
      id: '',
      title: '',
      description: '',
      img: '',
      mobileBannerImg: '',
      gameIconImg: '',
      gameLogoImg: '',
      backgroundImg: '',
      new: false,
      selectArray: {
        0: {
          title: 'No'
        },
        1: {
          title: 'Yes'
        }
      },
      tournamentsActive: '',
      mapVotingActive: '',
      maps: [],
      serverSystem: '',
    }
  },
  validations: {
    title: { required, minLength: minLength(2) },
    img: { required },
    gameIconImg: { required },
    gameLogoImg: { required },
    tournamentsActive: { required },
  },
  methods: {
    async submit() {
      this.$v.title.$touch()
      this.$v.img.$touch()
      this.$v.gameIconImg.$touch()
      this.$v.gameLogoImg.$touch()
      this.$v.tournamentsActive.$touch()
      if(!this.$v.title.$error &&
        !this.$v.img.$error &&
        !this.$v.gameIconImg.$error &&
        !this.$v.gameLogoImg.$error &&
        !this.$v.tournamentsActive.$error) {
          const gameUpdate = {
            id: this.id,
            title: this.title,
            description: this.description || '',
            img: this.img,
            mobileBannerImg: this.mobileBannerImg || '',
            gameIconImg: this.gameIconImg || '',
            gameLogoImg: this.gameLogoImg || '',
            backgroundImg: this.backgroundImg || '',
            tournamentsActive: this.tournamentsActive,
            mapVotingActive: this.mapVotingActive || '',
            serverSystem: this.serverSystem || '',
            maps: this.maps || []
          }
          this.$store.dispatch('setGameInfoAction', gameUpdate)
          this.$router.push({
            path: '/admin/games',
            query: {
              edit: true
            }
          })
          if(this.new) {
            this.$toasted.success('Game have been created')
          } else {
            this.$toasted.success('Game have been changed')
          }
      } else {
        this.$toasted.error('You have not filled in all the required fields!')
      }
    },
    deleteGame() {
      const gameDelete = {
        id: this.id,
        delete: true,
      }
      this.$store.dispatch('setGameInfoAction', gameDelete)
      this.$router.push({
        path: '/admin/games',
        query: {
          edit: true
        }
      })
      this.$toasted.success('Game have been changed')
    },
    addMap() {
      this.maps.push({name: '', img: ''})
    },
    deleteMap(index) {
      this.maps.splice(index, 1)
    },
    updateTitle(field) {
      this.title = field
    },
    updateDescription(field) {
      this.description = field
    },
    uploadMainBannerImg(img) {
      this.img = img
    },
    uploadMobileBannerImg(img) {
      this.mobileBannerImg = img
    },
    uploadGameIconImg(img) {
      this.gameIconImg = img
    },
    uploadGameLogoImg(img) {
      this.gameLogoImg = img
    },
    uploadBackgroundImg(img) {
      this.backgroundImg = img
    },
    updateTournamentsActive(select) {
      this.tournamentsActive = select;
    },
    updateMapVotingActive(select) {
      this.mapVotingActive = select;
    },
    updateServerSystem(select) {
      this.serverSystem = select
    },
    updateMapName(field, index) {
      this.maps[index].name = field
    },
    uploadMapImg(img, index) {
      this.maps[index].img = img
    }
  }
}
</script>

<style lang="scss" scoped>
.games-edit {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
  &__title {
    text-align: center;
    margin-bottom: 30px;
    color: #0F1215;
    background-color: #D8DFEB;
    padding: 30px 0;
    font-weight: 700;
    font-size: 22px;
  }
  &__fail-message {
    font-size: 12px;
    color: #B83333;
  }
  &__form {
    color: #CCCDCD;
    max-width: 620px;
    margin: 0 auto;
    &-inner {
      padding: 44px 60px;
      border: 1px solid #20252B;
      margin-bottom: 33px;
    }
    &-title {
      font-weight: 700;
      margin-bottom: 40px;
    }
    &-text {
      margin-bottom: 12px;
    }
    &-url {
      margin-bottom: 22px;
    }
    &-input {
      margin-bottom: 22px;
    }
    &-dropdown {
      margin-bottom: 22px;
    }
    &-file {
      margin-bottom: 22px;
    }
    &-map {
      position: relative;
      &-inner {
        display: flex;
        gap: 7px;
        margin-bottom: 5px;
      }
      &-delete {
        color: red;
        position: absolute;
        right: 0;
        cursor: pointer;
        &.hidden {
          display: none;
        }
      }
      &-input {
        flex-basis: 30%;
      }
      &-file-input {
        flex-basis: 70%;
      }
    }
    &-maps-btn {
      max-width: 190px;
      margin: 20px auto 0;
    }
    &-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 34px;
    }
    &-btn {
      max-width: 160px;
    }
  }
}
</style>
