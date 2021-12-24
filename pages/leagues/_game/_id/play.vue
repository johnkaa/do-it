<template>
  <div class="play">
    <div class="play__btn" @click="startTimer" v-if="!finding">
      <my-button>Play</my-button>
    </div>
    <div class="play__finding" v-else>
      <div class="play__finding-title">Finding the game...</div>
      <div class="play__finding-timer">{{ converMin }}:{{ converSec }}</div>
      <div class="play__finding-cancel play__btn" @click="endTimer">
        <my-button class="secondary">Cancel</my-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finding: false,
      min: 0,
      sec: 0,
      converSec: 0,
      converMin: 0
    }
  },
  methods: {
    startTimer() {
      this.finding = true
      setInterval(() => {
        this.sec++
        this.converSec = this.sec
        if(this.converSec < 10) {
          this.converSec = '0' + this.converSec
        }
        if(this.sec === 60) {
          this.min++
          this.converMin = this.min
          if(this.converMin < 10) {
            this.converMin = '0' + this.converMin
          }
          this.sec = 0
        }
      }, 1000)
    },
    endTimer() {
      this.finding = false
      this.min = 0
      this.sec = 0
    },
  }
}
</script>

<style lang="scss" scoped>
  .play {
    &__btn {
      width: 300px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    &__finding {
      &-title {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 20px;
      }
      &-timer {
        text-align: center;
        margin-bottom: 10px;
        color: #0A68F5;
      }
    }
  }
</style>
