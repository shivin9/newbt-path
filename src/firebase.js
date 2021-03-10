import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBVb0dhcVG2mb83S3SVlbrRQBpxqwhnS1o",
    authDomain: "bt3103-week5-discovery-2021.firebaseapp.com",
    projectId: "bt3103-week5-discovery-2021",
    storageBucket: "bt3103-week5-discovery-2021.appspot.com",
    messagingSenderId: "697783151970",
    appId: "1:697783151970:web:f9fe1cebefccf57fde503b",
    measurementId: "G-LDLMTVKMEH"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
export default database;