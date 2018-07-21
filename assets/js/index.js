window.onload = function() {
    //on start
    stopwatch.welcomeAlert();

};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;

// Our stopwatch object ********************************************************
var stopwatch = {

    time: 0,

    reset: function() {

        stopwatch.time = 0;

        // DONE: Change the "display" div to "00:00."
        $(".timer").text("Time Remaining: " + "00:00");
    },

    start: function() {

        if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
        //**************************    SET TIMER    */
        stopwatch.time = 5;
        }
    },

    stop: function() {

        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function() {

        stopwatch.time--;

        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);
        $(".timer").text("Time Remaining: " + converted);

        //Time is Up
        if(stopwatch.time < 0){
            stopwatch.stop();
            console.log("times up");
            $(".timer").text("Time Remaining: " + "00:00");

            stopwatch.nextQuestionAlert();
        }
    },

    timeConverter: function(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
        seconds = "0" + seconds;
        }

        if (minutes === 0) {
        minutes = "00";
        }
        else if (minutes < 10) {
        minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

    //Alert Functions ******
    nextQuestionAlert: function() {    
    swal({
        title: "Out of Time!",
        icon: "error",
        text: "Get Ready For The Next Question!",
        button: "Next Question", 
    })
    .then(() => {
        //Start The Game
        stopwatch.start();
        $(".timer").text("Time Remaining: " + "00:05"); //Override***
        });
    },
    
    welcomeAlert: function() {    
    swal({
        title: "Get Ready For Trivia!",
        icon: "success",
        text: "Answer the questions before the timer runs out!",
        button: "Start Game", 
    })
    .then(() => {
        //Start The Game
        stopwatch.start();
        });
    }
};

// Logic for Questions

//Put questions in Array
//Put answers in Array

var rainQuestionArray = ["What is the shape of rain drops?", 
"What color is rain?", 
"What is the rainiest city?", 
"" , 
"", ]

// var correctAnswer = 



// Get Weather to set which set of questions
var APIKey = "166a433c57516f51dfab1f7edaed8413";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=New York,US&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {

    console.log(response);

    // Transfer content to HTML
    // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    // $(".wind").text("Wind Speed: " + response.wind.speed);
    // $(".humidity").text("Humidity: " + response.main.humidity);
    // $(".temp").text("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    });