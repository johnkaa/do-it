<template>
  <div class="leagues-edit">
    <div class="leagues-edit__title">New/Edit Leagues</div>
    <form class="leagues-edit__form" @submit.prevent="submit">
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Basic info</div>
        <div class="leagues-edit__form-accordion" @click="basicInfo = false" v-if="basicInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="basicInfo = true" v-else>+</div>
        <template v-if="basicInfo">
          <p class="leagues-edit__form-text">Host</p>
          <my-dropdown class="leagues-edit__form-dropdown secondary"
                       :title="host || 'Host'"
                       @updateSelect="updateHost"
                       :items="hosts"/>
          <div class="leagues-edit__form-input">
            <p class="leagues-edit__form-text">League name</p>
            <my-input class="secondary" :field="title" @updateField="updateTitle"/>
            <p class="leagues-edit__fail-message" v-if="$v.title.$error">Field is required</p>
          </div>
          <p class="leagues-edit__form-text">URL</p>
          <div class="leagues-edit__form-url">doit.gg/leagues/{{ this.id }}</div>
          <p class="leagues-edit__form-text">Quick Rules</p>
          <my-textarea class="leagues-edit__form-input secondary" :field="quickRules" @updateField="updateQuickRules"/>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Game info</div>
        <div class="leagues-edit__form-accordion" @click="gameInfo = false" v-if="gameInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="gameInfo = true" v-else>+</div>
        <template v-if="gameInfo">
          <div class="leagues-edit__form-input">
            <p class="leagues-edit__form-text">Game</p>
            <my-dropdown class="secondary"
                         :title="game || 'Game'"
                         @updateSelect="updateGame"
                         :items="games"/>
            <p class="leagues-edit__fail-message" v-if="$v.game.$error">Field is required</p>
          </div>
          <div class="leagues-edit__form-input">
            <p class="leagues-edit__form-text">Type</p>
            <my-radio-select :selects="{0: {title: 'Linked Tournamnets'}, 1: {title: 'Ladder System'}}" :selectValue="type" name="type" @updateRadioSelect="updateType"/>
            <p class="leagues-edit__fail-message" v-if="$v.type.$error">Field is required</p>
          </div>
          <div class="leagues-edit__form-input">
            <p class="leagues-edit__form-text">Format</p>
            <my-dropdown class="secondary"
                         :title="format || 'Format'"
                         @updateSelect="updateFormat"
                         :items="['Groups + playoff', 'Groups', 'Playoff']"/>
            <p class="leagues-edit__fail-message" v-if="$v.format.$error">Field is required</p>
          </div>
          <my-checkbox @updateCheckbox="thirdPlace = !thirdPlace" :active="thirdPlace">Include a match for 3rd place</my-checkbox>
          <div class="leagues-edit__form-mode">
            <div class="leagues-edit__form-mode-item">
              <p class="leagues-edit__form-text">Mode</p>
              <my-dropdown class="leagues-edit__form-dropdown secondary"
                           :title="mode || 'Mode'"
                           @updateSelect="updateMode"
                           :items="['5 vs 5', '2 vs 2', '1 vs 1']"/>
            </div>
            <div class="leagues-edit__form-mode-item">
              <p class="leagues-edit__form-text">Map voting system</p>
              <my-dropdown class="leagues-edit__form-dropdown secondary"
                           :title="mapVoting || 'Map voting system'"
                           @updateSelect="updateMapVoting"
                           :items="games"/>
            </div>
          </div>
          <div class="leagues-edit__form-file">
            <p class="leagues-edit__form-text">Main Banner 370x200</p>
            <my-file-input name="main banner" :path="`leagues/${this.id}/main-banner`" :img="img" @uploadFile="uploadMainBannerImg"/>
            <p class="leagues-edit__fail-message" v-if="$v.img.$error">Field is required</p>
          </div>
          <div class="leagues-edit__form-file">
            <p class="leagues-edit__form-text">League background min 2000x3000</p>
            <my-file-input name="background" :path="`leagues/${this.id}/bg`" :img="bg" @uploadFile="uploadBg"/>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Registration</div>
        <div class="leagues-edit__form-accordion" @click="registrationInfo = false" v-if="registrationInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="registrationInfo = true" v-else>+</div>
        <template v-if="registrationInfo">
          <p class="leagues-edit__form-text">Registration</p>
          <div class="leagues-edit__form-registration">
            <div class="leagues-edit__form-registration-item" :class="{ active: registrationType === 'Free' }" @click="registrationType = 'Free'">Free</div>
            <div class="leagues-edit__form-registration-item" :class="{ active: registrationType === 'Paid' }" @click="registrationType = 'Paid'">Paid</div>
            <div class="leagues-edit__form-registration-item" :class="{ active: registrationType === 'Premium' }" @click="registrationType = 'Premium'">Premium</div>
            <div class="leagues-edit__form-registration-item" :class="{ active: registrationType === 'Private' }" @click="registrationType = 'Private'">Private</div>
          </div>
          <div class="leagues-edit__form-input">
            <p class="leagues-edit__form-text">Start Time</p>
            <div class="leagues-edit__form-dropdown datepicker" :class="{ active: startActive }">
              <button class="datepicker__title" type="button" @click="startActive = !startActive">{{ startDate  || 'Choose a date' }}</button>
              <v-date-picker
                class="datepicker__calendar"
                locale="en"
                title-position="left"
                :min-date="new Date()"
                v-model="start"
                mode="dateTime"/>
              <p class="leagues-edit__fail-message" v-if="$v.startDate.$error">Field is required</p>
            </div>
          </div>
          <div class="leagues-edit__form-input">
            <p class="leagues-edit__form-text">Estimated end</p>
            <div class="leagues-edit__form-dropdown datepicker" :class="{ active: endActive }">
              <button class="datepicker__title" type="button" @click="endActive = !endActive">{{ estimatedEndDate  || 'Choose a date' }}</button>
              <v-date-picker
                class="datepicker__calendar"
                locale="en"
                title-position="left"
                :min-date="start || new Date()"
                v-model="estimatedEnd"
                mode="dateTime"/>
            </div>
          </div>
          <my-checkbox @updateCheckbox="checkIn = !checkIn" :active="checkIn" style="display: block; margin-bottom: 10px;">Check-in Time</my-checkbox>
          <my-dropdown class="leagues-edit__form-dropdown secondary"
                       v-if="checkIn"
                       :title="checkInTime || 'Time to check-in'"
                       @updateSelect="updateCheckInTime"
                       :items="['10 minute', '20 minute', '30 minute']"/>
        </template>
      </div>
      <div class="leagues-edit__form-inner" v-if="registrationType === 'Paid'">
        <div class="leagues-edit__form-title">Paid</div>
        <div class="leagues-edit__form-accordion" @click="paidInfo = false" v-if="paidInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="paidInfo = true" v-else>+</div>
        <template v-if="paidInfo">
          <p class="leagues-edit__form-text">Register cost</p>
          <my-input class="secondary" :field="entryPrice" type="number" @updateField="updateEntryPrice"/>
        </template>
      </div>
      <div class="leagues-edit__form-inner" v-if="!this.new">
        <div class="leagues-edit__form-title">Players list</div>
        <div class="leagues-edit__form-accordion" @click="playersInfo = false" v-if="playersInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="playersInfo = true" v-else>+</div>
        <template v-if="playersInfo">
          <div class="leagues-edit__form-players">
            <div class="leagues-edit__form-players-btn" @click="listPlayers = !listPlayers">List of players</div>
            <div class="leagues-edit__form-players-list" v-if="listPlayers">
              <div class="leagues-edit__form-players-list-item">
                <div class="leagues-edit__form-players-list-item-id">id</div>
                <div class="leagues-edit__form-players-list-item-name">name</div>
                <div class="leagues-edit__form-players-list-item-delete">delete</div>
              </div>
              <div class="leagues-edit__form-players-list-item" v-for="item in this.getLeagues.players">
                <div class="leagues-edit__form-players-list-item-id">{{ item.id }}</div>
                <div class="leagues-edit__form-players-list-item-name">{{ item.username }}</div>
                <div class="leagues-edit__form-players-list-item-delete edit" @click="deletePlayer(item.id)">x</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Prize pool</div>
        <div class="leagues-edit__form-accordion" @click="poolInfo = false" v-if="poolInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="poolInfo = true" v-else>+</div>
        <template v-if="poolInfo">
          <div class="leagues-edit__form-top">
            <div class="leagues-edit__form-top-item">
              <p class="leagues-edit__form-text">Prize pool:</p>
              <my-input class="secondary" :field="prizePool" type="number" @updateField="updatePrizePool"/>
            </div>
            <div class="leagues-edit__form-top-item">
              <p class="leagues-edit__form-text">Max players:</p>
              <my-input class="secondary" :field="maxPlayers" type="number" @updateField="updateMaxPlayers"/>
            </div>
          </div>
          <div class="leagues-edit__form-prize">
            <div class="leagues-edit__form-prize-item">
              <div class="leagues-edit__form-prize-item-value">
                <p class="leagues-edit__form-text">1st place: </p>
                <my-input class="secondary" :field="prizePlace1" type="number" @updateField="updatePrizePlace1"/>
              </div>
              <div class="leagues-edit__form-prize-item-value">
                <p class="leagues-edit__form-text">2st place: </p>
                <my-input class="secondary" :field="prizePlace2" type="number" @updateField="updatePrizePlace2"/>
              </div>
              <div class="leagues-edit__form-prize-item-value">
                <p class="leagues-edit__form-text">3st place: </p>
                <my-input class="secondary" :field="prizePlace3" type="number" @updateField="updatePrizePlace3"/>
              </div>
              <p class="leagues-edit__form-text">Type</p>
              <my-radio-select
                :selects="{
                                 0: {title: 'Money'},
                                 1: {title: 'Thing'},
                                 2: {title: 'Money + Thing'},
                                 3: {title: 'Nothing'},
                                 4: {title: 'Qualifiers'},
                               }"
                :selectValue="prizeType"
                name="prizeType"
                @updateRadioSelect="updatePrizeType"/>
              <p class="leagues-edit__fail-message" v-if="$v.prizeType.$error">Field is required</p>
            </div>
            <div class="leagues-edit__form-prize-item">
              <div class="leagues-edit__form-prize-item-value">
                <p class="leagues-edit__form-text">Ro8: </p>
                <my-input class="secondary" :field="prizeRo8" type="number" @updateField="updatePrizeRo8"/>
              </div>
              <div class="leagues-edit__form-prize-item-value">
                <p class="leagues-edit__form-text">Ro16: </p>
                <my-input class="secondary" :field="prizeRo16" type="number" @updateField="updatePrizeRo16"/>
              </div>
              <div class="leagues-edit__form-prize-item-value">
                <p class="leagues-edit__form-text">Ro32: </p>
                <my-input class="secondary" :field="prizeRo32" type="number" @updateField="updatePrizeRo32"/>
              </div>
              <p class="leagues-edit__form-text">Donations</p>
              <my-radio-select class="leagues-edit__form-input"
                               :selects="{
                                 0: {title: 'Active'},
                                 1: {title: 'No Active'},
                               }"
                               :selectValue="donations"
                               name="donations"
                               @updateRadioSelect="updateDonations"/>
            </div>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Additional requirements</div>
        <div class="leagues-edit__form-accordion" @click="additionalInfo = false" v-if="additionalInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="additionalInfo = true" v-else>+</div>
        <template v-if="additionalInfo">
          <div class="leagues-edit__form-additional">
            <div class="leagues-edit__form-additional-item">
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="xboxAccount = !xboxAccount" :active="xboxAccount">Xbox Account</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="steamAccount = !steamAccount" :active="steamAccount">Steam Account</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="riotAccount = !riotAccount" :active="riotAccount">Riot Account</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="blizzardAccount = !blizzardAccount" :active="blizzardAccount">Blizzard Account</my-checkbox>
            </div>
            <div class="leagues-edit__form-additional-item">
              <div class="leagues-edit__form-additional-item-input">
                <p class="leagues-edit__form-text">Min age: </p>
                <my-input class="secondary" :field="minAge" type="number" @updateField="updateMinAge"/>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Extra</div>
        <div class="leagues-edit__form-accordion" @click="extraInfo = false" v-if="extraInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="extraInfo = true" v-else>+</div>
        <template v-if="extraInfo">
          <p class="leagues-edit__form-text">Lobby</p>
          <my-input class="leagues-edit__form-input secondary" :field="lobby" @updateField="updateLobby"/>
          <p class="leagues-edit__form-text">Mode</p>
          <my-input class="leagues-edit__form-input secondary" :field="extraMode" @updateField="updateExtraMode"/>
          <p class="leagues-edit__form-text">Veto</p>
          <my-input class="leagues-edit__form-input secondary" :field="veto" @updateField="updateVeto"/>
          <div class="leagues-edit__form-extra">
            <div class="leagues-edit__form-extra-item">
              <div class="leagues-edit__form-extra-title">Server Region</div>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="europe = !europe" :active="europe">EUROPE</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="australia = !australia" :active="australia">AUSTRALIA & OCEANIA</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="asia = !asia" :active="asia">ASIA</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="america = !america" :active="america">AMERICA</my-checkbox>
            </div>
            <div class="leagues-edit__form-extra-item">
              <div class="leagues-edit__form-extra-title">Platform</div>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="platformPc = !platformPc" :active="platformPc">PC</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="platformXbox = !platformXbox" :active="platformXbox">XBOX</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="platformPs4 = !platformPs4" :active="platformPs4">PS4</my-checkbox>
              <my-checkbox class="leagues-edit__form-checkbox" @updateCheckbox="platformPs5 = !platformPs5" :active="platformPs5">PS5</my-checkbox>
            </div>
          </div>
          <p class="leagues-edit__form-text">Discord URL</p>
          <my-input class="leagues-edit__form-input secondary" :field="discordUrl" @updateField="updateDiscordUrl"/>
          <p class="leagues-edit__form-text">Facebook URL</p>
          <my-input class="leagues-edit__form-input secondary" :field="facebookUrl" @updateField="updateFacebookUrl"/>
          <p class="leagues-edit__form-text">Twitter URL</p>
          <my-input class="leagues-edit__form-input secondary" :field="twitterUrl" @updateField="updateTwitterUrl"/>
          <p class="leagues-edit__form-text">VK URL</p>
          <my-input class="leagues-edit__form-input secondary" :field="vkUrl" @updateField="updateVkUrl"/>
          <p class="leagues-edit__form-text">Twitch URL</p>
          <my-input class="leagues-edit__form-input secondary" :field="twitchUrl" @updateField="updateTwitchUrl"/>
          <p class="leagues-edit__form-text">Youtube URL</p>
          <my-input class="leagues-edit__form-input secondary" :field="youtubeUrl" @updateField="updateYoutubeUrl"/>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Streams</div>
        <div class="leagues-edit__form-accordion" @click="streamsInfo = false" v-if="streamsInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="streamsInfo = true" v-else>+</div>
        <template v-if="streamsInfo">
          <div class="leagues-edit__form-streams">
            <div class="leagues-edit__form-stream" v-for="(item, index) in streams">
              <div class="leagues-edit__form-stream-delete delete" :class="{ hidden: index === 0 }" @click="deleteStream(index)">x</div>
              <div class="leagues-edit__form-stream-title">Twitch Stream</div>
              <my-input class="leagues-edit__form-stream-input secondary" placeholder="Twitch url" :field="item.url" :index="index" @updateField="updateStreamUrl" />
              <my-dropdown class="leagues-edit__form-dropdown secondary"
                           :title="item.lang || 'Language'"
                           :index="index"
                           @updateSelect="updateStreamLanguage"
                           :items="['English', 'Russian', 'Polish']"
                           style="margin-top: 10px; max-width: 160px; margin-left: auto;"/>
            </div>
            <div class="leagues-edit__form-maps-btn" @click="addStream">
              <my-button class="secondary" type="button">+ Add Stream</my-button>
            </div>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Sponsors</div>
        <div class="leagues-edit__form-accordion" @click="sponsorsInfo = false" v-if="sponsorsInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="sponsorsInfo = true" v-else>+</div>
        <template v-if="sponsorsInfo">
          <div class="leagues-edit__form-sponsors">
            <div class="leagues-edit__form-sponsor" v-for="(item, index) in sponsors">
              <div class="leagues-edit__form-sponsor-delete delete" :class="{ hidden: index === 0 }" @click="deleteSponsor(index)">x</div>
              <div class="leagues-edit__form-sponsor-title">Sponsor logo #{{ index + 1 }}</div>
              <my-file-input name="logo" :path="`leagues/${(+new Date()-(+new Date()%100)) / 100}/sponsor-${index + 1}`" :index="index" :img="item.img" @uploadFile="uploadSponsorImg"/>
            </div>
            <div class="leagues-edit__form-maps-btn" @click="addSponsor">
              <my-button class="secondary" type="button">+ Add Sponsor</my-button>
            </div>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Leagues</div>
        <div class="leagues-edit__form-accordion" @click="tournamentsInfo = false" v-if="tournamentsInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="tournamentsInfo = true" v-else>+</div>
        <template v-if="tournamentsInfo">
          <div class="leagues-edit__form-leagues">
            <div class="leagues-edit__form-leagues-top">
              <p>Connect league with tournament</p>
              <div class="leagues-edit__form-leagues-btn" @click="listTournaments = !listTournaments">Tournaments</div>
            </div>
            <div class="leagues-edit__form-leagues-list" v-if="listTournaments">
              <div class="leagues-edit__form-leagues-list-item">
                <div class="leagues-edit__form-leagues-list-item-id">id</div>
                <div class="leagues-edit__form-leagues-list-item-name">title</div>
              </div>
              <div class="leagues-edit__form-leagues-list-item" v-for="item in this.getTournaments">
                <div class="leagues-edit__form-leagues-list-item-id">{{ item.id }}</div>
                <div class="leagues-edit__form-leagues-list-item-name">{{ item.title }}</div>
                <div class="leagues-edit__form-leagues-list-item-add edit">
                  <my-radio-select @updateCheckbox="tournament = item.title" :selects="{ 0: {title: item.id} }" :selectValue="tournament" name="tournament" @updateRadioSelect="updateTournament"  style="font-size: 0;"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-inner">
        <div class="leagues-edit__form-title">Rules</div>
        <div class="leagues-edit__form-accordion" @click="rulesInfo = false" v-if="rulesInfo">-</div>
        <div class="leagues-edit__form-accordion" @click="rulesInfo = true" v-else>+</div>
        <template v-if="rulesInfo">
          <p class="leagues-edit__form-text">Rules</p>
          <div class="leagues-edit__form-input">
            <my-textarea class="secondary" :field="rules" @updateField="updateRules"/>
            <p class="leagues-edit__fail-message" v-if="$v.rules.$error">Field is required</p>
          </div>
        </template>
      </div>
      <div class="leagues-edit__form-btns">
        <nuxt-link to="/admin/leagues" v-if="this.new"><my-button class="leagues-edit__form-btn secondary">Back</my-button></nuxt-link>
        <div v-else @click="deleteLeague"><my-button class="leagues-edit__form-btn secondary" type="button">Delete League</my-button></div>
        <my-button class="leagues-edit__form-btn secondary">Save changes</my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength } from "vuelidate/lib/validators"

export default {
  computed: mapGetters(['getLeagues', 'getTournaments', 'getPlayers','getGames']),
  watch: {
    start() {
      if(this.start) {
        let minute = this.start.getMinutes()
        let hour = this.start.getHours()
        let day = this.start.getDate()
        let month = this.start.getMonth() + 1
        if(minute < 10) {
          minute = '0' + minute
        }
        if(hour < 10) {
          hour = '0' + hour
        }
        if(day < 10) {
          day = '0' + day
        }
        if(month < 10) {
          month = '0' + month
        }
        this.startDate = day + '/' + month + '/' + this.start.getFullYear() + ' ' + hour + ':' + minute
      } else {
        this.startDate = ''
        this.startActive = false
      }
    },
    estimatedEnd() {
      if(this.estimatedEnd) {
        let minute = this.estimatedEnd.getMinutes()
        let hour = this.estimatedEnd.getHours()
        let day = this.estimatedEnd.getDate()
        let month = this.estimatedEnd.getMonth() + 1
        if(minute < 10) {
          minute = '0' + minute
        }
        if(hour < 10) {
          hour = '0' + hour
        }
        if(day < 10) {
          day = '0' + day
        }
        if(month < 10) {
          month = '0' + month
        }
        this.estimatedEndDate = day + '/' + month + '/' + this.estimatedEnd.getFullYear() + ' ' + hour + ':' + minute
      } else {
        this.estimatedEndDate = ''
        this.endActive = false
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    if(this.getLeagues[this.id]) {
      this.host = this.getLeagues[this.id].host
      this.title = this.getLeagues[this.id].title
      this.img = this.getLeagues[this.id].img
      this.bg = this.getLeagues[this.id].bg
      this.quickRules = this.getLeagues[this.id].quickRules
      this.game = this.getLeagues[this.id].game
      this.type = this.getLeagues[this.id].type
      this.format = this.getLeagues[this.id].format
      this.mode = this.getLeagues[this.id].mode
      this.mapVoting = this.getLeagues[this.id].mapVoting
      this.registrationType = this.getLeagues[this.id].registrationType
      this.startDate = this.getLeagues[this.id].startDate
      this.estimatedEndDate = this.getLeagues[this.id].estimatedEndDate
      this.thirdPlace = this.getLeagues[this.id].thirdPlace
      this.checkIn = this.getLeagues[this.id].checkIn
      this.checkInTime = this.getLeagues[this.id].checkInTime
      this.entryPrice = this.getLeagues[this.id].entryPrice
      this.prizePool = this.getLeagues[this.id].prizePool
      this.maxPlayers = this.getLeagues[this.id].maxPlayers
      this.prizePlace1 = this.getLeagues[this.id].prizePlace1
      this.prizePlace2 = this.getLeagues[this.id].prizePlace2
      this.prizePlace3 = this.getLeagues[this.id].prizePlace3
      this.prizeRo8 = this.getLeagues[this.id].prizeRo8
      this.prizeRo16 = this.getLeagues[this.id].prizeRo16
      this.prizeRo32 = this.getLeagues[this.id].prizeRo32
      this.prizeType = this.getLeagues[this.id].prizeType
      this.donations = this.getLeagues[this.id].donations
      this.xboxAccount = this.getLeagues[this.id].xboxAccount
      this.steamAccount = this.getLeagues[this.id].steamAccount
      this.riotAccount = this.getLeagues[this.id].riotAccount
      this.blizzardAccount = this.getLeagues[this.id].blizzardAccount
      this.minAge = this.getLeagues[this.id].minAge
      this.regions = this.getLeagues[this.id].regions
      this.platformPc = this.getLeagues[this.id].platformPc
      this.platformXbox = this.getLeagues[this.id].platformXbox
      this.platformPs4 = this.getLeagues[this.id].platformPs4
      this.platformPs5 = this.getLeagues[this.id].platformPs5
      this.lobby = this.getLeagues[this.id].lobby
      this.extraMode = this.getLeagues[this.id].extraMode
      this.veto = this.getLeagues[this.id].veto
      this.urls = this.getLeagues[this.id].urls
      this.discordUrl = this.getLeagues[this.id].discordUrl
      this.facebookUrl = this.getLeagues[this.id].facebookUrl
      this.twitterUrl = this.getLeagues[this.id].twitterUrl
      this.vkUrl = this.getLeagues[this.id].vkUrl
      this.twitchUrl = this.getLeagues[this.id].twitchUrl
      this.youtubeUrl = this.getLeagues[this.id].youtubeUrl
      this.europe = this.getLeagues[this.id].europe
      this.australia = this.getLeagues[this.id].australia
      this.asia = this.getLeagues[this.id].asia
      this.america = this.getLeagues[this.id].america
      this.tournament = this.getLeagues[this.id].tournament
      this.rules = this.getLeagues[this.id].rules
      if(this.registrationType === 'Paid') {
        this.entryPrice = this.entryPrice.slice(1)
      }
      if(this.getLeagues[this.id].streams) {
        Object.keys(this.getLeagues[this.id].streams).forEach(item => this.streams.push(this.getLeagues[this.id].streams[item]))
      }
      if(this.getLeagues[this.id].sponsors) {
        Object.keys(this.getLeagues[this.id].sponsors).forEach(item => this.sponsors.push(this.getLeagues[this.id].sponsors[item]))
      }
      this.prizePool = this.prizePool.slice(1)
    } else {
      this.new = true
      this.streams.push({url: 'https://twitch.tv/', lang: 'English'})
      this.sponsors.push({img: ''})
    }
    Object.keys(this.getGames).forEach(item => this.games.push(this.getGames[item].title))
    Object.keys(this.getPlayers).forEach(item => this.hosts.push(this.getPlayers[item].username))
  },
  data() {
    return {
      basicInfo: true,
      gameInfo: true,
      registrationInfo: true,
      paidInfo: true,
      playersInfo: true,
      tournamentsInfo: true,
      poolInfo: true,
      additionalInfo: true,
      extraInfo: true,
      streamsInfo: true,
      sponsorsInfo: true,
      rulesInfo: true,
      id: '',
      host: '',
      hosts: [],
      title: '',
      quickRules: '',
      img: '',
      bg: '',
      game: '',
      games: [],
      type: '',
      format: '',
      mode: '5 vs 5',
      mapVoting: '',
      registrationType: 'Free',
      startActive: false,
      start: '',
      startDate: '',
      estimatedEnd: '',
      estimatedEndDate: '',
      endActive: false,
      thirdPlace: false,
      checkIn: false,
      checkInTime: '',
      entryPrice: 0,
      listPlayers: false,
      listTournaments: false,
      onlyLeague: false,
      prizePool: 0,
      maxPlayers: 0,
      prizePlace1: 0,
      prizePlace2: 0,
      prizePlace3: 0,
      prizeRo8: 0,
      prizeRo16: 0,
      prizeRo32: 0,
      prizeType: '',
      donations: '',
      xboxAccount: '',
      steamAccount: '',
      riotAccount: '',
      blizzardAccount: '',
      minAge: 0,
      europe: false,
      australia: false,
      asia: false,
      america: false,
      platformPc: false,
      platformXbox: false,
      platformPs4: false,
      platformPs5: false,
      lobby: '',
      extraMode: '',
      veto: '',
      discordUrl: '',
      facebookUrl: '',
      twitterUrl: '',
      vkUrl: '',
      twitchUrl: '',
      youtubeUrl: '',
      streams: [],
      sponsors: [],
      tournament: '',
      rules: '',
      new: false,
    }
  },
  validations: {
    title: { required, minLength: minLength(3) },
    img: { required },
    game: { required },
    type: { required },
    format: { required },
    startDate: { required },
    prizeType: { required },
    rules: { required },
  },
  methods: {
    async submit() {
      this.$v.title.$touch()
      this.$v.img.$touch()
      this.$v.game.$touch()
      this.$v.type.$touch()
      this.$v.format.$touch()
      this.$v.startDate.$touch()
      this.$v.prizeType.$touch()
      this.$v.rules.$touch()
      if(!this.$v.title.$error &&
        !this.$v.img.$error &&
        !this.$v.game.$error &&
        !this.$v.type.$error &&
        !this.$v.format.$error &&
        !this.$v.startDate.$error &&
        !this.$v.prizeType.$error &&
        !this.$v.rules.$error) {
        if(this.registrationType === 'Paid') {
          this.entryPrice = '$' + this.entryPrice
        } else {
          this.entryPrice = this.registrationType
        }
        this.prizePool = '$' + this.prizePool
        const leagueUpdate = {
          id: this.id,
          host: this.host,
          title: this.title,
          img: this.img,
          bg: this.bg,
          quickRules: this.quickRules,
          game: this.game,
          type: this.type,
          format: this.format,
          mode: this.mode,
          mapVoting: this.mapVoting,
          registrationType: this.registrationType,
          startDate: this.startDate,
          estimatedEndDate: this.estimatedEndDate,
          thirdPlace: this.thirdPlace,
          checkIn: this.checkIn,
          checkInTime: this.checkInTime,
          entryPrice: this.entryPrice,
          prizePool: this.prizePool,
          maxPlayers: this.maxPlayers,
          prizePlace1: this.prizePlace1,
          prizePlace2: this.prizePlace2,
          prizePlace3: this.prizePlace3,
          prizeRo8: this.prizeRo8,
          prizeRo16: this.prizeRo16,
          prizeRo32: this.prizeRo32,
          prizeType: this.prizeType,
          donations: this.donations,
          xboxAccount: this.xboxAccount,
          steamAccount: this.steamAccount,
          riotAccount: this.riotAccount,
          blizzardAccount: this.blizzardAccount,
          minAge: this.minAge,
          europe: this.europe,
          australia: this.australia,
          asia: this.asia,
          america: this.america,
          platformPc: this.platformPc,
          platformXbox: this.platformXbox,
          platformPs4: this.platformPs4,
          platformPs5: this.platformPs5,
          lobby: this.lobby,
          extraMode: this.extraMode,
          veto: this.veto,
          discordUrl: this.discordUrl,
          facebookUrl: this.facebookUrl,
          twitterUrl: this.twitterUrl,
          vkUrl: this.vkUrl,
          twitchUrl: this.twitchUrl,
          youtubeUrl: this.youtubeUrl,
          streams: this.streams,
          sponsors: this.sponsors,
          tournament: this.tournament || '',
          rules: this.rules,
        }
        this.$store.dispatch('setLeagueInfoAction', leagueUpdate)
        this.$router.push({
          path: '/admin/leagues',
          query: {
            edit: true
          }
        })
        if(this.new) {
          this.$toasted.success('League have been created')
        } else {
          this.$toasted.success('League have been changed')
        }
      } else {
        this.$toasted.error('You have not filled in all the required fields!')
      }
    },
    deleteLeague() {
      const leagueDelete = {
        id: this.id,
        delete: true,
      }
      this.$store.dispatch('setLeagueInfoAction', leagueDelete)
      this.$router.push({
        path: '/admin/leagues',
        query: {
          edit: true
        }
      })
      this.$toasted.success('League have been deleted')
    },
    addStream() {
      this.streams.push({url: 'https://twitch.tv/', lang: 'English'})
    },
    addSponsor() {
      this.sponsors.push({img: ''})
    },
    deleteStream(index) {
      this.streams.splice(index, 1)
    },
    deleteSponsor(index) {
      this.sponsors.splice(index, 1)
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
    uploadBg(img) {
      this.bg = img
    },
    updateHost(select) {
      this.host = select
    },
    updateQuickRules(field) {
      this.quickRules = field
    },
    updateGame(select) {
      this.game = select
    },
    updateType(select) {
      this.type = select
    },
    updateFormat(select) {
      this.format = select
    },
    updateMode(select) {
      this.mode = select
    },
    updateMapVoting(select) {
      this.mapVoting = select
    },
    updateCheckInTime(select) {
      this.checkInTime = select
    },
    updateEntryPrice(field) {
      if(+field < 0) {
        return this.entryPrice = 0
      }
      this.entryPrice = field
    },
    updatePrizePool(field) {
      if(+field < 0) {
        return this.prizePool = 0
      }
      this.prizePool = field
    },
    updateMaxPlayers(field) {
      if(field < 0) {
        return this.maxPlayers = 0
      }
      this.maxPlayers = field
    },
    updatePrizePlace1(field) {
      if(field < 0) {
        return this.prizePlace1 = 0
      }
      this.prizePlace1 = field
    },
    updatePrizePlace2(field) {
      if(field < 0) {
        return this.prizePlace2 = 0
      }
      this.prizePlace2 = field
    },
    updatePrizePlace3(field) {
      if(field < 0) {
        return this.prizePlace3 = 0
      }
      this.prizePlace3 = field
    },
    updatePrizeRo8(field) {
      if(field < 0) {
        return this.prizeRo8 = 0
      }
      this.prizeRo8 = field
    },
    updatePrizeRo16(field) {
      if(field < 0) {
        return this.prizeRo16 = 0
      }
      this.prizeRo16 = field
    },
    updatePrizeRo32(field) {
      if(field < 0) {
        return this.prizeRo32 = 0
      }
      this.prizeRo32 = field
    },
    updatePrizeType(select) {
      this.prizeType = select
    },
    updateDonations(select) {
      this.donations = select
    },
    updateMinAge(field) {
      if(field < 0) {
        return this.minAge = 0
      }
      this.minAge = field
    },
    updateLobby(field) {
      this.lobby = field
    },
    updateExtraMode(field) {
      this.extraMode = field
    },
    updateVeto(field) {
      this.veto = field
    },
    updateDiscordUrl(field) {
      this.discordUrl = field
    },
    updateFacebookUrl(field) {
      this.facebookUrl = field
    },
    updateTwitterUrl(field) {
      this.twitterUrl = field
    },
    updateVkUrl(field) {
      this.vkUrl = field
    },
    updateTwitchUrl(field) {
      this.twitchUrl = field
    },
    updateYoutubeUrl(field) {
      this.youtubeUrl = field
    },
    updateStreamUrl(field, index) {
      this.streams[index].url = field
    },
    updateStreamLanguage(select, index) {
      this.streams[index].lang = select
    },
    uploadSponsorImg(img, index) {
      this.sponsors[index].img = img
    },
    updateTournament(select) {
      this.tournament = select
    },
    updateRules(field) {
      this.rules = field
    }
  }
}
</script>

<style lang="scss" scoped>
.leagues-edit {
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
      padding: 44px 60px 20px;
      border: 1px solid #20252B;
      margin-bottom: 33px;
      position: relative;
    }
    &-accordion {
      position: absolute;
      font-size: 22px;
      font-weight: 500;
      color: #CCCDCD;
      top: 40px;
      right: 30px;
      cursor: pointer;
    }
    &-title {
      font-weight: 700;
      margin-bottom: 20px;
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
    &-checkbox {
      display: block;
      font-size: 13px;
    }
    &-file {
      margin-bottom: 22px;
    }
    &-mode {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      &-item {
        width: 100px;
      }
      &-item + &-item {
        width: 200px;
      }
    }
    &-registration {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      &-item {
        padding: 12px 22px;
        color: #0A61E1;
        background: #1A222D;
        font-weight: 700;
        cursor: pointer;
      }
      &-item.active {
        color: #fff;
        background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%);
      }
    }
    &-players {
      &-btn {
        color: #0A61E1;
        font-weight: 700;
        padding: 12px 16px;
        background-color: #1A222D;
        cursor: pointer;
        max-width: 150px;
      }
      &-list {
        margin-top: 10px;
        &-item {
          display: grid;
          text-align: center;
          grid-template-columns: 1fr 1fr 1fr;
          &-add.edit {
            color: green;
            max-width: 10px;
            margin: 0 auto;
            cursor: pointer;
          }
        }
      }
    }
    &-leagues {
      &-top {
        display: flex;
        align-items: center;
        gap: 25px;
        margin-bottom: 10px;
      }
      &-btn {
        color: #0A61E1;
        font-weight: 700;
        padding: 12px 16px;
        background-color: #1A222D;
        cursor: pointer;
        max-width: 150px;
      }
      &-list {
        margin-bottom: 20px;
        &-item {
          display: grid;
          text-align: center;
          grid-template-columns: 1fr 1fr 1fr;
          &-delete.edit {
            color: red;
            max-width: 10px;
            margin: 0 auto;
            cursor: pointer;
          }
        }
      }
    }
    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-prize {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      &-item + &-item {
        .leagues-edit__form-text {
          min-width: 43px;
        }
      }
    }
    &-prize-item-value {
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
      .leagues-edit__form-text {
        min-width: 72px;
      }
      .secondary {
        width: 100px;
        height: 20px;
      }
    }
    &-additional {
      display: flex;
      justify-content: space-between;
      &-item-input {
        display: flex;
        gap: 8px;
        .secondary {
          width: 100px;
          height: 20px;
        }
      }
    }
    &-extra {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      &-title {
        color: #F5F5F5;
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 12px;
      }
    }
    &-stream,
    &-sponsor {
      position: relative;
    }
    &-stream + &-stream {
      margin-top: 16px;
    }
    &-sponsor + &-sponsor {
      margin-top: 16px;
    }
    &-map {
      &-inner {
        display: flex;
        gap: 7px;
        margin-bottom: 5px;
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
      max-width: 200px;
    }
  }
}
.datepicker {
  position: relative;
  &__title {
    position: relative;
    display: block;
    width: 100%;
    text-align: left;
    padding: 12px 30px 12px 16px;
    color: #CCCDCD;
    border: 1px solid #20252B;
    border-radius: 2px;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    &::after {
      content: '';
      width: 22px;
      height: 22px;
      background-image: url(static/images/icons/datepicker.svg);
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: auto;
    }
  }
  &__calendar {
    display: none;
    position: absolute;
    top: 44px;
    z-index: 1;
  }
}
.datepicker.active .datepicker__calendar {
  display: block;
}
.delete {
  color: red;
  position: absolute;
  right: 0;
  cursor: pointer;
  &.hidden {
    display: none;
  }
}
</style>
