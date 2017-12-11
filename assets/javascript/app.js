// Initialize Firebase
var config = {
    apiKey: "AIzaSyBkv6FmC-BKlN-pOt5T4yTjX5dzb45rqc0",
    authDomain: "groupfb120817.firebaseapp.com",
    databaseURL: "https://groupfb120817.firebaseio.com",
    projectId: "groupfb120817",
    storageBucket: "groupfb120817.appspot.com",
    messagingSenderId: "284215947796"
  };
  firebase.initializeApp(config);

  $("#item-search").on("click", function () {
    $("#amazon").html("Your price here");
  })