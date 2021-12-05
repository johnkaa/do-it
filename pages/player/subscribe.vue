  <template>
    <div class="subscribe">
      <div class="subscribe__items">
        <form class="subscribe__item free" @submit.prevent="submit('free')">
          <div class="subscribe__item-title">FREE</div>
          <div class="subscribe__item-price">$0 per month</div>
          <p class="subscribe__item-description">
            A night to remember for Brazil. Drama is never too far away at Copa America and this final had it by the bucketlad. Thanks for your company.
            A night to remember for Brazil. Drama is never too far away at Copa America and this final had it by the bucketlad. Thanks for your company.
          </p>
          <my-button class="subscribe__item-btn">Sign up</my-button>
        </form>
        <form class="subscribe__item pro" @submit.prevent="submit('pro')">
          <div class="subscribe__item-title">PRO</div>
          <div class="subscribe__item-price">$5 per month</div>
          <p class="subscribe__item-description">
            A night to remember for Brazil. Drama is never too far away at Copa America and this final had it by the bucketlad. Thanks for your company.
            A night to remember for Brazil. Drama is never too far away at Copa America and this final had it by the bucketlad. Thanks for your company.
          </p>
          <my-button class="subscribe__item-btn">Sign up</my-button>
        </form>
        <form class="subscribe__item organizer" @submit.prevent="submit('organizer')">
          <div class="subscribe__item-title">Organizer</div>
          <div class="subscribe__item-price">$10 per month</div>
          <p class="subscribe__item-description">
            A night to remember for Brazil. Drama is never too far away at Copa America and this final had it by the bucketlad. Thanks for your company.
            A night to remember for Brazil. Drama is never too far away at Copa America and this final had it by the bucketlad. Thanks for your company.
          </p>
          <my-button class="subscribe__item-btn">Sign up</my-button>
        </form>
      </div>
    </div>
  </template>

  <script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    layout: 'profile',
    computed: mapGetters(['getUser']),
    methods: {
      ...mapMutations(['setUser']),
      async submit(type) {
        if(this.getUser.subscribe === type) {
          return this.$toasted.error('You already have this subscribe')
        }
        try {
          const userBalanceRef = this.$fire.database.ref(`users/${this.getUser.id}/eur`)
          const userSubscribeRef = this.$fire.database.ref(`users/${this.getUser.id}/subscribe`)
          switch(type) {
            case 'free':
              await userSubscribeRef.set(type)
              this.$toasted.success('Success')
              break
            case 'pro':
              if(this.getUser.eur < 5) {
                return this.$toasted.error("You don't have enough money")
              }
              await userBalanceRef.set(this.getUser.eur - 5)
              await userSubscribeRef.set(type)
              this.$toasted.success('Success')
              break
            case 'organizer':
              if(this.getUser.eur < 10) {
                return this.$toasted.error("You don't have enough money")
              }
              await userBalanceRef.set(this.getUser.eur - 10)
              await userSubscribeRef.set(type)
              this.$toasted.success('Success')
              break
          }
        } catch (e) {
          this.$toasted.error(e)
        }
      }
    }
  }
  </script>

  <style lang="scss" scoped>
    .subscribe__items {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 25px;
    }
    .subscribe__item {
      background: radial-gradient(250.9% 252.09% at -142.43% -152.09%, rgba(20, 114, 255, 0.35) 0%, rgba(20, 114, 255, 0) 100%), #181B1F;
      padding: 100px 22px 36px;
      max-width: 260px;
      width: 100%;
      &-title {
        color: #2788F6;
        font-size: 42px;
        font-weight: 700;
        line-height: 100%;
        margin-bottom: 42px;
      }
      &-price {
        font-size: 22px;
        font-weight: 500;
        line-height: 100%;
        color: #F5F5F5;
        margin-bottom: 16px;
      }
      &-description {
        font-size: 14px;
        line-height: 150%;
        color: #67707A;
        margin-bottom: 60px;
      }
      +.pro {
        background: radial-gradient(250.9% 252.09% at -142.43% -152.09%, rgba(245, 200, 31, 0.25) 0%, rgba(245, 200, 31, 0) 100%), #181B1F;
        .subscribe__item {
          &-title {
            color: #FFD321;
          }
          &-btn {
            background: linear-gradient(180deg, #FFD321 0%, #9C6C0D 100%);
          }
        }
      }
      +.organizer {
        background: radial-gradient(242.43% 252.09% at -142.43% -152.09%, rgba(66, 232, 128, 0.3) 0%, rgba(66, 232, 128, 0) 100%), #181B1F;
        .subscribe__item {
          &-title {
            color: #46F48C;
          }
          &-btn {
            background: linear-gradient(180deg, #46F48C 0%, #2B9D37 100%);
          }
        }
      }
    }
    @media (max-width: 1305px) {
      .subscribe__items {
        justify-content: center;
      }
    }
  </style>
