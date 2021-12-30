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

export default getDatabase(initializeApp(firebaseConfig))
