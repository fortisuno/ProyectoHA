import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwLnpp5go-8hUKiNA7wUDxnVncacThgHs",
  authDomain: "proyectoha-65327.firebaseapp.com",
  databaseURL: "https://proyectoha-65327-default-rtdb.firebaseio.com",
  projectId: "proyectoha-65327",
  storageBucket: "proyectoha-65327.appspot.com",
  messagingSenderId: "797135952028",
  appId: "1:797135952028:web:49e27cc7994caeaaa57559",
  measurementId: "G-5W8S3F98N9"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db, auth}