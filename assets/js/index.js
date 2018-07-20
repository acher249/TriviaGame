window.onload = function() {
    //on start
    welcomeAlert();

    //******use these functions in stopwatch object to build game********
    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
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

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
        //**************************    SET TIMER    */
        stopwatch.time = 5;
        }
    },

    stop: function() {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
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

            nextQuestionAlert();
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
    }
};


//Alert Functions ******

function nextQuestionAlert() {    
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
}

function welcomeAlert() {    
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
    };