<template>
  <div class="shop">
    <my-modal class="shop__modal" v-if="showModal" @close="showModal = false">
      <h2 slot="header">Buy item</h2>
      <div class="shop-modal__body" slot="body">
        <div class="shop-modal__title">Are you sure?</div>
      </div>
      <div class="shop-modal__footer" slot="footer">
        <div class="shop-modal__btn" @click="showModal = false">
          <my-button class="secondary">No</my-button>
        </div>
        <div class="shop-modal__btn" @click="buy">
          <my-button>Yes</my-button>
        </div>
      </div>
    </my-modal>
    <div class="shop__items">
      <div class="shop__item" v-for="item in items">
        <div class="shop__item-img"><img :src="item.img" alt=""></div>
        <div class="shop__item-info">
          <div class="shop__item-title">{{ item.name }}</div>
          <div class="shop__item-price">{{ item.price }}</div>
        </div>
        <div class="shop__item-button" @click="showModal = true; price = item.price; weapon = item.name">
          <my-button>Buy</my-button>
        </div>
      </div>
      <div class="shop__item" v-for="item in items">
        <div class="shop__item-img"><img :src="item.img" alt=""></div>
        <div class="shop__item-info">
          <div class="shop__item-title">{{ item.name }}</div>
          <div class="shop__item-price">{{ item.price }}</div>
        </div>
        <div class="shop__item-button" @click="showModal = true; price = item.price; weapon = item.name">
          <my-button>Buy</my-button>
        </div>
      </div>
      <div class="shop__item" v-for="item in items">
        <div class="shop__item-img"><img :src="item.img" alt=""></div>
        <div class="shop__item-info">
          <div class="shop__item-title">{{ item.name }}</div>
          <div class="shop__item-price">{{ item.price }}</div>
        </div>
        <div class="shop__item-button" @click="showModal = true; price = item.price; weapon = item.name">
          <my-button>Buy</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    const shopRef = this.$fire.database.ref('shop')
    try {
      const snapshot = await shopRef.once('value')
      this.items = snapshot.val()
    } catch (e) {
      this.$toasted.error(e)
    }
  },
  computed: mapGetters(['getUser']),
  data() {
    return {
      items: {},
      showModal: false,
      price: 0,
      weapon: ''
    }
  },
  methods: {
    async buy() {
      const price = +this.price.slice(1)
      if(this.getUser.eur < price) {
        return this.$toasted.error("You don't have enough money")
      }
      try {
        const userBalanceRef = this.$fire.database.ref(`users/${this.getUser.id}/eur`)
        const userItemsRef = this.$fire.database.ref(`users/${this.getUser.id}/items/${(+new Date()-(+new Date()%100)) / 10}`)
        await userBalanceRef.set(this.getUser.eur - price)
        await userItemsRef.set({ id: (+new Date()-(+new Date()%100)) / 10, name: this.weapon })
      } catch (e) {
        return this.$toasted.error(e)
      }
      this.showModal = false
      this.$toasted.success(`You successful buy ${this.weapon}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop {
    &__items {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }
    &__item {
      text-align: center;
      &-title {
        color: #8996A3;
        line-height: 16px;
      }
      &-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
    }
    &-modal__title {
      text-align: center;
    }
    &-modal__footer {
      display: flex;
      justify-content: center;
      gap: 30px;
    }
    &-modal__btn {
      width: 150px;
    }
  }
</style>
