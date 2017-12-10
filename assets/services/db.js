import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCsvsRfjNbr7shO9p4nG2Argq6QAxwDr8A",
    authDomain: "my-helper-4e161.firebaseapp.com",
    databaseURL: "https://my-helper-4e161.firebaseio.com",
    projectId: "my-helper-4e161",
    storageBucket: "my-helper-4e161.appspot.com",
    messagingSenderId: "1094907620636"
}

firebase.initializeApp(firebaseConfig)

export default firebase

