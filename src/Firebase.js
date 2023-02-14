// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlDXoitkrLzla2_QM6th1AwUltoso3wck",
  authDomain: "notekeeper-79f78.firebaseapp.com",
  projectId: "notekeeper-79f78",
  storageBucket: "notekeeper-79f78.appspot.com",
  messagingSenderId: "233335376027",
  appId: "1:233335376027:web:85820dc9ffe19270c11e3e",
  measurementId: "G-YD0FST6LNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}