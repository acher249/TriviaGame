window.onload = function() {
    //on start
    stopwatch.welcomeAlert();

};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;
var currentQuestionIndex = 0;

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
        stopwatch.time = 15;
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
        stopwatch.start();
        $(".timer").text("Time Remaining: " + "00:15"); //Override***
        //if no button clicked
        currentQuestionIndex ++;
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
        addButtonHTML(q0.AnswerArray);
        addQuestionHTML(rainQuestionArray, 0);
        currentQuestionIndex ++;
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
var q0 = {
    AnswerArray: ["square", "droplet", "hexagonal", "rhombus"],
    Answer: "droplet"
}
var q1 = {
    AnswerArray: ["square", "droplet", "hexagonal", "rhombus"],
    Answer: "droplet"
}
var q2 = {
    AnswerArray: ["square", "droplet", "hexagonal", "rhombus"],
    Answer: "droplet"
}
var q3 = {
    AnswerArray: ["square", "droplet", "hexagonal", "rhombus"],
    Answer: "droplet"
}
var q4 = {
    AnswerArray: ["square", "droplet", "hexagonal", "rhombus"],
    Answer: "droplet"
}

//function to add to text button html. Pass it the AnswersArray.
function addButtonHTML(answerArray){
    for(i=0; i<answerArray.length; i++){
        //change the button html to the correct text
        $("#answer" + i).text(answerArray[i]);
        //give the button the id of the butons contents
        $("#answer" + i).attr("id", answerArray[i]);
        console.log(answerArray[i]);
    }
}

function addQuestionHTML(questionArray, index){
    $(".question").text(questionArray[index]);
    console.log(questionArray[index]);
}



//****************************************************************/
// get which button is clicked

//Assign current question to the correct object
if(currentQuestionIndex === 0){
    currentQuestionObjectAnswer = q0.Answer;
} else if (currentQuestionIndex === 1){
    currentQuestionObjectAnswer = q1.Answer;
}else if (currentQuestionIndex === 2){
    currentQuestionObjectAnswer = q2.Answer;
}else if (currentQuestionIndex === 3){
    currentQuestionObjectAnswer = q3.Answer;
}

//questionObjectAnswer ie: q0.Answer
function buttonClicked(clicked_id)
{
    // alert(clicked_id);
    // fill array with if answer was right or wrong
    currentQuestionIndex++;
    var clickedButton = document.getElementById(clicked_id);
    if (clickedButton.id == currentQuestionObjectAnswer){
        console.log("you picked the RIGHT answer");
    }else{
        console.log("you picked the WRONG answer");
    }
    // push the next question and next answers
}




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