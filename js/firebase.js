var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyC08n0osBfvRneqZXBPfjN1PukMVF4mezw",
    authDomain: "ntousellstudent.firebaseapp.com",
    databaseURL: "https://ntousellstudent.firebaseio.com",
    projectId: "ntousellstudent",
    storageBucket: "ntousellstudent.appspot.com",
    messagingSenderId: "131442063335"
  };

firebase.initializeApp(config);
module.exports = firebase
