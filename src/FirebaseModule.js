import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyCs2KqYUTgRqwdrbSh-Hq5K6uKHzIsyaHk',
    authDomain: 'chatgpt-6317c.firebaseapp.com',
    databaseURL: 'https://chatgpt-6317c.nam5.firebasedatabase.app',
    projectId: 'chatgpt-6317c',
    storageBucket: 'chatgpt-6317c.appspot.com',
    messagingSenderId: '1087048171745',
    appId: '1:1087048171745:web:fdae8ede5cd0ddbf9077a0'
})

const db = firebase.firestore();

export { firebase, db };