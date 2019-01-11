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
//  Making my variable to get this train running
  // name = "";
  // destination = "";
  // time = "";
  // frequency = 0;

  $("#submit").on("click", function(){
    event.preventDefault();

    trainName = $("#TrainName").val().trim();
    trainDestination = $("#Destination").val().trim();
    trainTime= $("#Time").val().trim();
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

  database.ref().on("child_added",function(childSnapshot){
    console.log(childSnapshot.val()); 
    var trainName = childSnapshot.val().name;
    var trainDestination  = childSnapshot.val().place;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFreq);
   
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFreq),
      $("<td>").text(trainTime)
    );
    
    $("#table > tbody").append(newRow);
  });
