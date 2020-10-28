import firebaseAdmin from "firebase-admin";
import firetype from "@firebase/app-types";
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig:firetype.FirebaseOptions = {
    apiKey: "AIzaSyC8QpdR3EXSLip4o03td9G4BqX8KpRXz6Y",
    authDomain: "agroq-d66b7.firebaseapp.com",
    databaseURL: "https://agroq-d66b7.firebaseio.com",
    projectId: "agroq-d66b7",
    storageBucket: "agroq-d66b7.appspot.com",
    messagingSenderId: "582267081238",
    appId: "1:582267081238:web:52d0e2abc5c73ebe8d1b37",
    measurementId: "G-D0ZH6Z9PSF"
  };
  var serviceAccount = require("./firebase_key.json");

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://agroq-d66b7.firebaseio.com"
  });
  // Initialize Firebase


  const db = firebaseAdmin.firestore();

  
export default  db;