// firebase.js
import firebase from 'firebase/compat/app'; // Adjust the import to use compat version
import 'firebase/compat/auth'; // Adjust th
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAekuVL9tDifeuXdhTEr2MYbAk2cnOnkqQ",
    authDomain: "rental-warehouse.firebaseapp.com",
    projectId: "rental-warehouse",
    storageBucket: "rental-warehouse.appspot.com",
    messagingSenderId: "316389674758",
    appId: "1:316389674758:web:4f338437c8966dbc499887"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, GoogleAuthProvider };