$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCBLeThRzde99KzvAy-Uc7-x9anNey4x9A",
    authDomain: "fire-train.firebaseapp.com",
    databaseURL: "https://fire-train.firebaseio.com",
    projectId: "fire-train",
    storageBucket: "",
    messagingSenderId: "962106421042"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var tName;
  var destination;
  var timeBetween;
  var firstTrain;

  $("#addTrain").on("click",function(){
  	event.preventDefault();
  	tName = $("#trainName").val().trim();
  	console.log("new T name: "+tName);
  	destination = $("#trainDest").val().trim();
  	console.log("headed to: "+destination);
  	firstTrain = $("#trainStart").val().trim();
  	console.log("first train time: "+firstTrain);
  	timeBetween = $("#trainFreq").val().trim();
  	console.log("how long between: "+timeBetween);

  	database.ref().push({
  		name: tName,
  		destination: destination,
  		first: firstTrain,
  		frequency: timeBetween
  	});
  });

  database.ref().on("child_added",function(update){
  	console.log(update.val());
  	var tableRow=$("<tr>");
  	tableRow.append("<td>"+update.val().name+"</td>");
  	tableRow.append("<td>"+update.val().destination+"</td>");
  	tableRow.append("<td>"+update.val().frequency+" mins </td>");
  	var firstTrainConvert = moment(update.val().first,"hh:mm").subtract(1,"years");
  	console.log(firstTrainConvert);
  	var currentTime = moment().format("hh:mm");
  	console.log("current time: "+currentTime);
  	var timeDiff = moment().diff(moment(firstTrainConvert),"minutes");
  	var timeLeft = timeDiff % update.val().frequency;
  	var minTill = update.val().frequency - timeLeft;
  	console.log("next train in min: "+minTill);
  	var nextTrain = moment().add(minTill,"minutes").format("LT");
  	console.log("next train time: "+nextTrain);
  	tableRow.append("<td>"+nextTrain+"</td>");
  	tableRow.append("<td>"+minTill+" mins</td>");
  	$("tbody").append(tableRow);
  });

})