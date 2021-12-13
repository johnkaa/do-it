<template>
  <div class="withdraw">
    <div class="withdraw__methods">
      <div class="withdraw__method" v-for="item in methods" :key="item" :class="{ active: item === method }" @click="updateMethod(item)">{{ item }}</div>
    </div>
    <div class="withdraw__doit" v-if="method === 'DOIT'">10 DOIT = 1$</div>
    <form class="withdraw__form" @submit.prevent="submit">
      <div class="withdraw__form-text">Name and last name</div>
      <my-input class="withdraw__form-input secondary" placeholder="Nikodem Swider" @updateField="updateName"/>
      <div class="withdraw__form-text">Your email address</div>
      <my-input class="withdraw__form-input secondary" placeholder="google@gmail.com" type="email" @updateField="updateEmail"/>
      <div class="withdraw__form-text">Amount</div>
      <my-input class="withdraw__form-input secondary" placeholder="100" type="number" @updateField="updateAmount"/>
      <my-button class="withdraw__form-btn">Withdraw</my-button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['getUser']),
  data() {
    return {
      method: 'Paypal',
      methods: ['Paypal', 'BTC', 'QIWI', 'DOIT'],
      name: '',
      email: '',
      amount: 0,
    }
  },
  methods: {
    async submit() {
      if(!this.name && !this.email && !this.amount) {
        return this.$toasted.error('All fields are required')
      }
      if(this.getUser.eur < this.amount) {
        return this.$toasted.error("You don't have enough funds")
      }
      if(this.method === 'DOIT') {
        if(this.getUser.eur < this.amount * 10) {
          return this.$toasted.error("You don't have enough funds")
        }
      }
      let day = new Date().getDate()
      let month = new Date().getMonth() + 1
      if(new Date().getDate() < 10) {
        day = '0' + new Date().getDate()
      }
      if((new Date().getMonth() + 1) < 10) {
        month = '0' + (new Date().getMonth() + 1)
      }
      const dateNow = day + '.' + month + '.' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
      const dateWithoutTime = day + '/' + month + '/' + new Date().getFullYear()
      try {
        const userBalanceRef = this.$fire.database.ref(`users/${this.getUser.id}/eur`)
        const userHistoryRef = this.$fire.database.ref(`users/${this.getUser.id}/balanceHistory/${(+new Date()-(+new Date()%100)) / 100}`)
        await userHistoryRef.set({
          date: dateNow,
          name: this.name,
          email: this.email,
          type: 'Withdraw',
          method: this.method,
          amount: `$${this.amount}`
        })
        if(this.method === 'DOIT') {
          const userBalanceDTCRef = this.$fire.database.ref(`users/${this.getUser.id}/dtc`)
          await userBalanceDTCRef.set(this.getUser.dtc + (this.amount * 10))
          await userBalanceRef.set(this.getUser.eur - this.amount * 10)
        } else {
          await userBalanceRef.set(this.getUser.eur - this.amount)
        }
        const paymentsHistoryRef = this.$fire.database.ref(`payments/${(+new Date()-(+new Date()%100)) / 100}`)
        await paymentsHistoryRef.set({
            date: dateWithoutTime,
            username: this.getUser.username,
            eur: this.getUser.eur,
            dtc: this.getUser.dtc,
            type: 'Withdraw',
            method: this.method,
            withdraw: `$${this.amount}`,
            deposit: '$0',
            amount: `$${this.amount}`
        })
        this.$toasted.success('Withdrawal was successful')
      } catch (e) {
        this.$toasted.error(e)
      }
    },
    updateMethod(method) {
      this.method = method
    },
    updateName(field) {
      this.name = field
    },
    updateEmail(field) {
      this.email = field
    },
    updateAmount(value) {
      this.amount = +value
    }
  }
}
</script>

<style lang="scss" scoped>
  .withdraw {
    position: relative;
    &__methods {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 35px;
    }
    &__method {
      color: #7A8899;
      background-color: #0F1215;
      font-size: 14px;
      line-height: 100%;
      padding: 8px 31px;
      border: 1px solid #20252B;
      cursor: pointer;
      &.active {
        color: #F5F5F5;
        background-color: #0F68E5;
      }
    }
    &__doit {
      color: #37B7FA;
      position: absolute;
      right: 20px;
      top: 10px;
    }
    &__form {
      max-width: 500px;
      &-text {
        color: #CCCDCD;
        font-weight: 700;
        margin-bottom: 5px;
      }
      &-input {
        margin-bottom: 16px;
      }
      &-btn {
        max-width: 160px;
        position: relative;
        left: 50%;
      }
    }
  }
  @media (max-width: 1250px) {
    .withdraw__form-btn {
      left: 0;
    }
  }
</style>
