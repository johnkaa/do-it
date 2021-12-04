import Vue from 'vue'
import Vuex from 'vuex'
import { onValue, ref } from "firebase/database"
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAzrqOOibxUJ6jVh1zOELkKzuRwzbCAEOA",
  authDomain: "doit-8389f.firebaseapp.com",
  databaseURL: "https://doit-8389f-default-rtdb.firebaseio.com",
  projectId: "doit-8389f",
  storageBucket: "doit-8389f.appspot.com",
  messagingSenderId: "782696520349",
  appId: "1:782696520349:web:38e57f2ce839ebd7d19274"
};

const db = getDatabase(initializeApp(firebaseConfig))

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, uid) {
      try {
        const usersRef = ref(db, 'users')
        onValue(usersRef, (snapshot) => {
          const users = snapshot.val()
          Object.keys(users).forEach((userDB) => {
            if(users[userDB].uid === uid) {
              state.user = users[userDB]
            }
          })
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  actions: {}
})

export default store
