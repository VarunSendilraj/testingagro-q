"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
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
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://agroq-d66b7.firebaseio.com"
});
// Initialize Firebase
const db = firebase_admin_1.default.firestore();
exports.default = db;
//# sourceMappingURL=firebase_config.js.map