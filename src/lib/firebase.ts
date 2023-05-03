import firebase from 'firebase/app'
import 'firebase/messaging'

export function initializeFirebase (): void {
  const firebaseConfig = {
    apiKey: 'AIzaSyBu9Knt2GRZTuS08oBRSyOvZk2MdrQV5BA',
    authDomain: 'etpapi-70164.firebaseapp.com',
    projectId: 'etpapi-70164',
    storageBucket: 'etpapi-70164.appspot.com',
    messagingSenderId: '523804331845',
    appId: '1:523804331845:web:3d99a9076cf6271e44382c',
    measurementId: 'G-PZV9Y4T4FB'
  }

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
  else firebase.app()
}

export default firebase
