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


  // Ajax Call

  queryURL= "http://api.walmartlabs.com/v1/items?apiKey=m293p2wqduce6kc3xusuz4ug&upc=035000521019";
  
  // var data = {
  //   'AssociateTag': 'digitalfans0b-20',
  //   'AWSAccessKeyId': 'AKIAIFTONKL2MBEGR3NA',
  //   'Signature':'SSLm7L6lU0Iw3/soPpU7iCQ+mSYe5Ag/O1gvct0I'
  // }
 
  $.ajax({
    datatype: "jsonp",
    url: queryURL,
    method: "get"
    // Headers: {"X-Originating-Ip": "69.196.40.176"},
}).done(function(res){
  console.log(res);
});

// Key: m293p2wqduce6kc3xusuz4ug

