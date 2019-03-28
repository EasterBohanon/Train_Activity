var config = {
  apiKey: "AIzaSyATv-13Oj7-HaxaQNnED5KkkObi0E7fbXg",
  authDomain: "train-schedule-eab03.firebaseapp.com",
  databaseURL: "https://train-schedule-eab03.firebaseio.com",
  projectId: "train-schedule-eab03",
  storageBucket: "train-schedule-eab03.appspot.com",
  messagingSenderId: "688942696683"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function () {
  event.preventDefault();

  trainName = $("#TrainName").val().trim();
  trainDestination = $("#Destination").val().trim();
  trainTime = $("#Time").val().trim();
  trainFreq = $("#Frequency").val().trim();
  // making sure those values are being grabbed
  console.log(trainName, trainDestination, trainTime, trainFreq);

  // creates new variable so we can push 
  var newTrain = {
    name: trainName,
    place: trainDestination,
    time: trainTime,
    frequency: trainFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train succesfully added");

  $("#TrainName").val("");
  $("#Destination").val("");
  $("#Time").val("");
  $("#Frequency").val("");


});

database.ref().on("child_added", function (childSnapshot) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().place;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  var timeArr = trainTime.split(":");
  var trainMoment = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainMoment);
  var tMinutes;
  var tArrival;
  if (maxMoment === trainMoment) {
    tArrival = trainMoment.format("hh:mm A");
    tMinutes = trainMoment.diff(moment(), "minutes");
  } else {

    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff(trainMoment, "minutes");
    var tRemainder = differenceTimes % trainFreq;
    tMinutes = trainFreq - tRemainder;
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }

  if (maxMoment === trainMoment) {
    tArrival = trainMoment.format("hh:mm A");
    tMinutes = trainMoment.diff(moment(), "minutes");
  } else {

    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff(trainMoment, "minutes");
    var tRemainder = differenceTimes % trainFreq;
    tMinutes = trainFreq - tRemainder;
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }
  
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFreq);
  console.log("Tminutes",tMinutes);
 
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFreq),
    $("<td>").text(trainTime),
    $("<td>").text(tArrival),
    $("<td>").text(tMinutes),

  );

  $("#trainTable > tbody").append(newRow);

  // $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  //         trainFreq + "</td><td>" + tArrival + "</td><td>" + tMinutes +"</td></tr>");
});


// });



