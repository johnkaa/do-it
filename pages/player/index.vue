<template>
  <div class="player">
    <div class="player__mobile">
      <div class="player__img">
        <img :src="getUser.img" alt="">
      </div>
      <div class="player__mobile-name">
        <div class="player__name" v-if="getUser.name">{{ getUser.name }}</div>
        <div class="player__username">{{ getUser.username }}</div>
        <div class="player__team" v-if="getUser.mainTeam">{{ getUser.mainTeam }}</div>
        <div class="player__icons">
          <img class="player__icon" src="/images/icons/plus.svg" alt="">
          <img class="player__icon" src="/images/icons/mail.svg" alt="">
        </div>
      </div>
    </div>
    <div class="player__info">
      <div class="player__title">Profile</div>
      <div class="player__items">
        <div class="player__item"><span>ID</span>{{ getUser.id }}</div>
        <div class="player__item" v-if="getUser.name"><span>Name</span>{{ getUser.name }}</div>
        <div class="player__item"><span>Nickname</span>{{ getUser.username }}</div>
        <div class="player__item"><span>With us from</span>{{ getUser.dateRegistration }}</div>
        <div class="player__item" v-if="getUser.sex && getUser.age"><span>Sex / Age</span>{{ getUser.sex }} / {{ getUser.age }}</div>
        <div class="player__item" v-if="getUser.nationality"><span>Nationality</span>{{ getUser.nationality }}</div>
        <div class="player__item"><span>Country</span>{{ getUser.country }}</div>
        <div class="player__item" v-if="getUser.website"><span>Web-site</span>{{ getUser.website }}</div>
      </div>
    </div>
    <div class="player__levels">
      <div class="player__title">Level and awards</div>
      <div class="player__level-items">
        <my-progressbar class="player__level-item"
                        v-for="item in getUser.games"
                        :key="item.title"
                        :title="item.title"
                        :lvl="item.lvl" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'profile',
  computed: mapGetters(['getUser']),
}
</script>

<style lang="scss" scoped>
  .player {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &__mobile {
      display: none;
    }
    &__title {
      font-weight: 700;
      margin-bottom: 26px;
    }
    &__items {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    &__item {
      span {
        display: inline-block;
        width: 115px;
        margin-right: 60px;
        color: #67707A;
      }
    }
  }
  .player__level-item + .player__level-item {
    margin-top: 26px;
  }
  @media (max-width: 900px) {
    .player__mobile {
      display: flex;
    }
    .player {
      &__img {
        max-width: 120px;
        max-height: 120px;
        margin-right: 40px;
        img {
          border-radius: 4px;
        }
      }
      &__name {
        color: #909AA3;
        margin-bottom: 5px;
      }
      &__username {
        color: #F5F5F5;
        font-size: 24px;
        font-weight: 700;
        line-height: 130%;
        margin-bottom: 7px;
      }
      &__team {
        color: #37B7FA;
        line-height: 130%;
        margin-bottom: 11px;
      }
      &__icons {
        display: flex;
        gap: 12px;
        margin-bottom: 66px;
        margin-top: 11px;
      }
      &__icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    .player {
      flex-direction: column;
      align-items: center;
      gap: 40px;
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
