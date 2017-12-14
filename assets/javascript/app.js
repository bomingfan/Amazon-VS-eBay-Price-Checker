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


function showInfo(item) {

   // Ebay API and AJAX items
    event.preventDefault();
  
    $("#ebay").empty();
  
    var appKey = "DrewZele-priceche-PRD-c5d8a3c47-8e4e1b10";
    // item = $("#enter-product").val().trim();
    var queryURL = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=" + appKey + "&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + item + "&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0"
  
    console.log(queryURL);
    $.ajax({
      dataType: "jsonp",
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      console.log(response);
  
      var ebayItem = response.findItemsByKeywordsResponse[0].searchResult[0]
  
      for (i = 0; i < 10; i++) {
  
        $("#ebay").append("<h4>" + ebayItem.item[i].title["0"] + "</h4>");
        $("#ebay").append("<img src = " + ebayItem.item[i].galleryURL["0"] + " class='img-thumbnail'>");
        $("#ebay").append("<p> $" + ebayItem.item[i].sellingStatus["0"].currentPrice["0"].__value__ + "</p>");
        $("#ebay").append("<p><a href = " + ebayItem.item[i].viewItemURL["0"] + ">Click here for eBay page</a></p><br>")
      }
  
    }).catch(function (error) {
      console.log("status", error.status);
      console.log(error);
    });
  
    // Walmart Ajax Call
  
    $("#walmart").empty();
  
    var Key = "m293p2wqduce6kc3xusuz4ug";
    queryURL = "https://api.walmartlabs.com/v1/search?apiKey=" + Key + "&query=" + item;
  
    $.ajax({
      url: queryURL,
      method: "GET",
      // contentType: 'text/plain',
      // xhrFields: {withCredentials: false},
      dataType: "jsonp",
      // Headers: {'Access-Control-Allow-Origin': '*'}
    }).done(function (res) {
      console.log(res);
  
      for (i = 0; i < res.items.length; i++) {
  
        var newDiv = $("<div>");
        newDiv.html("<h4>" + res.items[i].name + "</h4>");
        newDiv.append("<a href = " + res.items[i].productUrl + " target='_blank'><img src = " + res.items[i].imageEntities["0"].mediumImage + " class='img-thumbnail'></a>");
        newDiv.append("<p>$" + res.items[i].salePrice + "</p>");
        newDiv.append("<a class='button' href = " + res.items[i].addToCartUrl + " target='_blank'>Add To Cart</a>");
        $("#walmart").append(newDiv);
  
      };
  
    });

}



// make a new button for them to click on later
function makeButton(input) {
  var newBtn = $("<button>");
  newBtn.attr("type", "button");
  newBtn.addClass("btn btn-primary");
  newBtn.text(input);
  newBtn.attr("data-search", input);
  $('#buttons').append(newBtn);
}


// Create a variable to reference the database.
var database = firebase.database();

// Link to Firebase Database for viewer tracking
var connectionsRef = database.ref("/connections")
var connectedRef = database.ref(".info/connected")

// Whenever a user clicks the item-search button
$("#item-search").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var productName = $("#enter-product").val().trim();

  showInfo(productName);

  // Save the new price in Firebase
  database.ref().push({
    productName: productName,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });


});


// Add ourselves to presence list when online.
connectedRef.on("value", function (snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true)

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove()
  }
})

// Number of online users is the number of objects in the presence list.
connectionsRef.on("value", function (snap) {
  
    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#count").text(snap.numChildren())
  })


// Add them to the HTML in our table

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(3).on("child_added", function (snapshot) {
  // $('.buttons').empty();

  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.productName);
  console.log(sv.dateAdded);


  // make buttons
  makeButton(sv.productName);

  var element = document.querySelector("#buttons");
  console.log("number of children: " + element.childElementCount);
  // remove the first button
  if (element.childElementCount === 4) {
    console.log("inside");
    $("#buttons button:nth-last-child(4)").remove();
  }



  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

$(document).on("click", "button", function () {
  
  // Get the input values
  var itemName = $(this).attr("data-search");

  showInfo(itemName);

  });