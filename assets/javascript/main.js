// --------- Wait's for the Document in HTML to load
$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDr4u0eBzVMZ47fIwP-JTEApEyWp_0S8vE",
    authDomain: "train-scheduler-bcc29.firebaseapp.com",
    databaseURL: "https://train-scheduler-bcc29.firebaseio.com",
    projectId: "train-scheduler-bcc29",
    storageBucket: "train-scheduler-bcc29.appspot.com",
    messagingSenderId: "399864491946"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  

  // Click function for Submit
  $('.submit').on('click', function (event) {
    event.preventDefault();
    // grabs the text input in the text field
    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var firstTime = $('#firstTime').val().trim();
    var frequency = $('#frequency').val().trim();
  

    // ------ A local storage to keep the information ------  \\
    var addedTrain = {
      name: trainName,
      dest: destination,
      fTime: firstTime,
      freq: frequency
    };

    console.log(addedTrain);
    database.ref('list').push(addedTrain);

    // Clearing the data inside the text boxes 
  $('#trainName').val('');
  $('#destination').val('');
  $('#frequency').val('');
  $('#nextArrival').val('');
  $('#minutesAway').val('');

  });
database.ref('list').on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().dest);
    // console.log(childSnapshot.val().freq);

    var dTrainName = childSnapshot.val().name;
    var dDestination = childSnapshot.val().dest;
    var dFirstTime = childSnapshot.val().fTime;
    var dFrequency = childSnapshot.val().freq;
    console.log(dTrainName);
    console.log(dDestination);
    console.log(dFirstTime);
    console.log(dFrequency);

    // ---conversions

    var freq = parseInt(frequency);

    var tFrequency = dFrequency;

    // Time is 3:30 AM
    var firstTrainTime = dFirstTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("HERE: "+firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));


  // Add each train's data into the table
  $("table > tbody").append("<tr><td>" + dTrainName + "</td><td>" + dDestination + "</td><td>" +
  dFrequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });



});