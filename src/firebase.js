import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCn-6Ay_lb_EWcpU3Q15R28uKXSFl84jQ8',
  authDomain: 'swe30003-ass3.firebaseapp.com',
  databaseURL: 'https://swe30003-ass3.firebaseio.com',
  storageBucket: 'swe30003-ass3.appspot.com'
}

export const app = firebase.initializeApp(config)
export const db = app.database()
