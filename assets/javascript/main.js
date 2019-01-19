// --------- Wait's for the Document in HTML to load
$(document).ready( function() {
    
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

  function addTrain() {
      

// ------ Saves the value inserted in the text box ------  \\
      var trainName = $('#trainName').val().trim();
      var destination = $('#destination').val().trim();
      var frequency = $('#frequency').val().trim();
      var nextArrival = $('#nextArrival').val().trim();
      var minutesAway = $('#minutesAway').val().trim();
  
// ------ A local storage to keep the information ------  \\
  var addedTrain = {
      name: trainName,
      dest: destination,
      freq: frequency,
      nxtArr: nextArrival,
      minAw: minutesAway
  };

  console.log(addedTrain);
  database.ref().push(addedTrain);

// ------ Clearing the data inside the text boxes ------  \\
  $('#trainName').val('');
  $('#destination').val('');
  $('#frequency').val('');
  $('#nextArrival').val('');
  $('#minutesAway').val('');

  }
  
  addTrain();

// var tFrequency = 3;

// var firstTime = "03:30";

// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted)










});