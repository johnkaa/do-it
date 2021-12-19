<template>
  <div class="payments">
    <admin-panel class="payments__top"
                 addText="Payments"
                 :editDisable="true"
                 :filterDisable="true"
                 @updateSearch="updateSearch"
                 @add="showModal = true"
    />
    <my-modal class="add-payment" v-if="showModal" @close="showModal = false">
      <h2 slot="header">Add payment</h2>
      <div class="add-payment__body" slot="body">
        <div class="add-payment-title">Add/withdraw</div>
        <div class="add-payment__type">
          <div class="add-payment__type-item" :class="{ active: addPaymentMethod === 'deposit' }" @click="addPaymentMethod = 'deposit'">Add</div>
          <div class="add-payment__type-item" :class="{ active: addPaymentMethod === 'withdraw' }" @click="addPaymentMethod = 'withdraw'">Withdraw</div>
        </div>
        <div class="add-payment__system" v-if="addPaymentMethod === 'withdraw'">
          <div class="add-payment__system-item" :class="{ active: addPaymentSystem === 'paypal' }" @click="addPaymentSystem = 'paypal'">Paypal</div>
          <div class="add-payment__system-item" :class="{ active: addPaymentSystem === 'btc' }" @click="addPaymentSystem = 'btc'">BTC</div>
        </div>
        <div class="add-payment__info">
          <div class="add-payment__info-amount">
            <div class="add-payment__info-amount-text">Amount</div>
            <div class="add-payment__info-amount-input">
              <div @click="minus">-</div>
              <my-input :field="addPaymentAmount" type="number" @updateField="updateAddPaymentAmount"/>
              <div @click="plus">+</div>
            </div>
          </div>
          <div class="add-payment__info-username">
            <div class="add-payment__info-username-text">User</div>
            <my-dropdown class="add-payment__info-username-dropdown" :title="addPaymentUser || 'Select user'" :items="usersList" @updateSelect="updateAddPaymentUser"/>
          </div>
          <div class="add-payment__info-address" v-if="addPaymentMethod === 'withdraw'">
            <div class="add-payment__info-address-text">Payment Address</div>
            <my-input @updateField="updateAddPaymentAddress" />
          </div>
        </div>
      </div>
      <div class="add-payments__footer" slot="footer">
        <div class="add-payments__btn" @click="addPayment">
          <my-button>Send</my-button>
        </div>
      </div>
    </my-modal>
    <div class="payments__items">
      <div class="payments__item">
        <div class="payments__item-title" :class="{ active: sort === 'user' }" @click="sortByUser">User</div>
        <div class="payments__item-title" :class="{ active: sort === 'balance' }" @click="sortByBalance">Balance</div>
        <div class="payments__item-title" :class="{ active: sort === 'payout' }" @click="sortByPayout">Payout</div>
        <div class="payments__item-title" :class="{ active: sort === 'deposit' }" @click="sortByDeposit">Deposit</div>
        <div class="payments__item-title" :class="{ active: sort === 'system' }" @click="sortBySystem">System</div>
        <div class="payments__item-title" :class="{ active: sort === 'date' }" @click="sortByDate">Date</div>
      </div>
      <div class="payments__item" v-for="item in searchedPayments">
        <div class="payments__item-info">{{ item.username }}</div>
        <div class="payments__item-info">${{ item.eur }} | {{ item.dtc }} DOIT</div>
        <div class="payments__item-info">{{ item.withdraw }}</div>
        <div class="payments__item-info">{{ item.deposit }}</div>
        <div class="payments__item-info">{{ item.method }}</div>
        <div class="payments__item-info">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getPayments', 'getPlayers']),
    searchedPayments() {
      return this.payments.filter(element => {
        return element.username.toLowerCase().includes(this.search.toLowerCase())
          || element.date.toLowerCase().includes(this.search.toLowerCase())
          || element.method.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    Object.keys(this.getPayments).forEach(item => {
      this.payments.push(this.getPayments[item])
    })
    Object.keys(this.getPlayers).forEach(item => {
      this.usersList.push(this.getPlayers[item].username)
    })
    this.getDateNow()
  },
  data() {
    return {
      showModal: false,
      search: '',
      payments: [],
      sort: '',
      date: '',
      usersList: [],
      addPaymentMethod: 'deposit',
      addPaymentSystem: 'paypal',
      addPaymentAmount: 0,
      addPaymentAddress: '',
      addPaymentUser: '',
    }
  },
  methods: {
    async addPayment() {
      if(!this.addPaymentUser) {
        return this.$toasted.error('Select user')
      }
      if(!this.addPaymentAmount) {
        return this.$toasted.error('Wrong amount value')
      }
      let id
      let eur
      let dtc
      let payment
      Object.keys(this.getPlayers).forEach(item => {
        if(this.getPlayers[item].username === this.addPaymentUser) {
          eur = this.getPlayers[item].eur
          dtc = this.getPlayers[item].dtc
          id = this.getPlayers[item].id
        }
      })
      const userRef = await this.$fire.database.ref(`users/${id}/eur`)
      if(this.addPaymentMethod === 'deposit') {
        payment = {
          amount: '$' + this.addPaymentAmount,
          date: this.date,
          deposit: '$' + this.addPaymentAmount,
          withdraw: '$0',
          eur: eur,
          dtc: dtc,
          type: 'Deposit',
          username: this.addPaymentUser,
          method: 'Admin'
        }
        try {
          await userRef.set(eur + this.addPaymentAmount)
        } catch (e) {
          return this.$toasted.error(e)
        }
      } else {
        if(!this.addPaymentAddress) {
          return this.$toasted.error('Wrong payment address')
        }
        payment = {
          amount: '$' + this.addPaymentAmount,
          date: this.date,
          withdraw: '$' + this.addPaymentAmount,
          deposit: '$0',
          eur: eur,
          dtc: dtc,
          type: 'Withdraw',
          username: this.addPaymentUser,
          method: this.addPaymentSystem[0].toUpperCase() + this.addPaymentSystem.slice(1)
        }
        try {
          await userRef.set(eur - this.addPaymentAmount)
        } catch (e) {
          return this.$toasted.error(e)
        }
      }
      const paymentsRef = await this.$fire.database.ref(`payments/${(+new Date()-(+new Date()%100)) / 10}`)
      try {
        await paymentsRef.set(payment)
      } catch (e) {
        return this.$toasted.error(e)
      }
      const userHistoryRef = this.$fire.database.ref(`users/${id}/balanceHistory/${(+new Date()-(+new Date()%100)) / 10}`)
      await userHistoryRef.set({
        date: this.date,
        name: 'Admin',
        email: 'admin@admin.ru',
        type: this.addPaymentMethod[0].toUpperCase() + this.addPaymentMethod.slice(1),
        method: 'Admin',
        amount: `$${this.amount}`
      })
      this.payments.push(payment)
      this.$toasted.success('Payment add successfully')
    },
    updateSearch(field) {
      this.search = field
    },
    updateAddPaymentUser(select) {
      this.addPaymentUser = select
    },
    updateAddPaymentAmount(field) {
      this.addPaymentAmount = +field
    },
    updateAddPaymentAddress(field) {
      this.addPaymentAddress = field
    },
    plus() {
      this.addPaymentAmount += 10
    },
    minus() {
      this.addPaymentAmount -= 10
      if(this.addPaymentAmount < 0) {
        this.addPaymentAmount = 0
      }
    },
    getDateNow() {
      const dateObj = new Date()
      let day = dateObj.getDate()
      let month = (dateObj.getMonth() + 1)
      if(day < 10) {
        day = '0' + day
      }
      if(month < 10) {
        month = '0' + month
      }
      this.date = day + '/' + month + '/' + dateObj.getFullYear()
    },
    sortByUser() {
      this.sort = 'user'
      this.payments.sort((a,b) => a.username.localeCompare(b.username))
    },
    sortByBalance() {
      this.sort = 'balance'
      this.payments.sort((a,b) => a.eur - b.eur)
    },
    sortByPayout() {
      this.sort = 'payout'
      this.payments.sort((a,b) => a.withdraw.slice(1) - b.withdraw.slice(1))
    },
    sortByDeposit() {
      this.sort = 'deposit'
      this.payments.sort((a,b) => a.deposit.slice(1) - b.deposit.slice(1))
    },
    sortBySystem() {
      this.sort = 'system'
      this.payments.sort((a,b) => a.method.localeCompare(b.method))
    },
    sortByDate() {
      this.sort = 'date'
      this.payments.sort((a,b) => a.date.localeCompare(b.date))
    },
  }
}
</script>

<style lang="scss" scoped>
  .payments {
    &__items {
      border: 2px solid #20252B;
      padding: 13px 30px 0;
    }
    &__item {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      text-align: center;
      &-title {
        color: #E6E6E6;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        &:hover {
          background-color: rgba(#67707A, .3);
        }
        &::after {
          content: url(static/images/icons/sort-arrows.svg);
          display: inline-block;
          margin-top: 8px;
        }
        &.active {
          &::after {
            content: url(static/images/icons/sort-arrow.svg);
            transform: rotate(180deg);
            margin-top: 0;
          }
        }
      }
      &-info {
        color: #67707A;
        margin-bottom: 15px;
      }
    }
  }
  .add-payment {
    text-align: center;
    &-title {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 14px;
    }
    &__system,
    &__type {
      margin: 22px 0;
      display: flex;
      justify-content: center;
      &-item {
        padding: 12px 22px;
        border: 1px solid #1F334D;
        color: #6B8099;
        cursor: pointer;
        &.active {
          background-color: #177AEB;
          color: #fff;
        }
      }
    }
    &__info {
      &-amount {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        user-select: none;
        &-input {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #67707A;
          font-size: 14px;
          cursor: pointer;
          max-width: 120px;
        }
      }
      &-username {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-dropdown {
          width: 130px;
        }
      }
      &-address {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
