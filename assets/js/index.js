window.onload = function() {
    //on start
    stopwatch.welcomeAlert();

};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;
var currentQuestionIndex = 0;

var correctAnswerCount = 0;
var incorrectAnswerCount = 0;

// Our stopwatch object ********************************************************
var stopwatch = {

    time: 0,

    reset: function() {

        stopwatch.time = 10;
        $(".timer").text("Time Remaining: " + "00:10");
    },

    start: function() {

        if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
        //**************************    SET TIMER    */
        stopwatch.time = 10;
        }
    },

    stop: function() {

        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function() {

        stopwatch.time--;

        var converted = stopwatch.timeConverter(stopwatch.time);
        // console.log(converted);
        $(".timer").text("Time Remaining: " + converted);

        //Time is Up
        if(stopwatch.time < 0){
            stopwatch.stop();
            // console.log("times up");
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

    //Button Click


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
        stopwatch.reset();
        stopwatch.start();
        $(".timer").text("Time Remaining: " + "00:10"); //Override***
        //if no button clicked
        currentQuestionIndex ++;
        
        setHTML();
        });
    },
    
    welcomeAlert: function() {    
    swal({
        title: "Get Ready For Trivia!",
        icon: "success",
        text: "AnswerId the questions before the timer runs out!",
        button: "Start Game", 
    })
    .then(() => {
        //Start The Game
        stopwatch.start();
        setHTML();
        });
    },

    gaveOver: function() {    
    swal({
        title: "You Finished Trivia!",
        icon: "success",
        text: "Correct: " + correctAnswerCount + " ---- Incorrect: " + incorrectAnswerCount,
        button: "Continue", 
    })
    .then(() => {
        stopwatch.stop();
        //Do somthing when game finishes
        });
    }
};

//QUSETIONS ARRAY *********************************************

var rainQuestionArray = ["What is the shape of rain drops?", 
"What color is rain?", 
"What is the rainiest city?", 
"How much rain can fit in a one gallon jug?" , 
"What state of matter is rain?"];

//QUESTION OBJECTS**********************************************
//shape
var q0 = {
    AnswerArray: ["Square", "Droplet", "Hexagonal", "Rhombus"],
    AnswerId: "answer1"
}
//color
var q1 = {
    AnswerArray: ["Red", "Yellow", "Green", "Blue"],
    AnswerId: "answer3"
}
//city
var q2 = {
    AnswerArray: ["Manhattan", "San Diego", "Austin", "Seattle"],
    AnswerId: "answer3"
}
//volume
var q3 = {
    AnswerArray: ["1/2 gallon", "3/4 gallon", "One Gallon", "None"],
    AnswerId: "answer2"
}
//state of matter
var q4 = {
    AnswerArray: ["Gas", "Solid", "Liquid", "Gaslid"],
    AnswerId: "answer2"
}

//****************************************************************/
// get which button is clicked

//questionObjectAnswer ie: q0.AnswerId
function buttonClicked(clicked_id)
{
    // alert(clicked_id);

    //Get Object Answer
    if(currentQuestionIndex === 0){
        currentQuestionObjectAnswer = q0.AnswerId;
    } else if (currentQuestionIndex === 1){
        currentQuestionObjectAnswer = q1.AnswerId;
    }else if (currentQuestionIndex === 2){
        currentQuestionObjectAnswer = q2.AnswerId;
    }else if (currentQuestionIndex === 3){
        currentQuestionObjectAnswer = q3.AnswerId;
    }else {
        currentQuestionObjectAnswer = q4.AnswerId;
    }

    var clickedButton = document.getElementById(clicked_id);
    if (clickedButton.id == currentQuestionObjectAnswer){
        console.log("you picked the RIGHT answer");
        correctAnswerCount ++;
    }else{
        console.log("you picked the WRONG answer");
        incorrectAnswerCount ++;
    }
    // fill array with if answer was right or wrong
    currentQuestionIndex++;
    if(currentQuestionIndex > 4){
        stopwatch.gaveOver();
    }
    
    setHTML();
    
    stopwatch.reset();
}

//function to add to text button html. Pass it the AnswersArray.
function addButtonHTML(answerArray){
    for(i=0; i<answerArray.length; i++){

        //change the button html to the correct text
        $("#answer" + i).text(answerArray[i]);
        // console.log(answerArray[i]);
        //give the button the id of the butons contents
        // $("#answer" + i).attr("id", answerArray[i]);
    }
}

function addQuestionHTML(questionArray, index){
    $(".question").text(questionArray[index]);
    // console.log(questionArray[index]);
}

function setHTML(){
    if(currentQuestionIndex === 0){
        addButtonHTML(q0.AnswerArray);
        addQuestionHTML(rainQuestionArray, 0);
    } else if(currentQuestionIndex === 1){
        addButtonHTML(q1.AnswerArray);
        addQuestionHTML(rainQuestionArray, 1);
    } else if (currentQuestionIndex === 2){
        addButtonHTML(q2.AnswerArray);
        addQuestionHTML(rainQuestionArray, 2);
    } else if (currentQuestionIndex === 3){
        addButtonHTML(q3.AnswerArray);
        addQuestionHTML(rainQuestionArray, 3);
    } else {
        addButtonHTML(q4.AnswerArray);
        addQuestionHTML(rainQuestionArray, 4);
    } 
}



//Was going to get current weather and disply different trivia questions based on
// current weather. but the API doesn't give Sunny, Rainy, Coudy Response.

// Get Weather to decide which set of questions
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