var startCard = $(".startCard");
var mainCard = $(".mainCard");

window.onload = function() {
    //on start
    function welcomeAlert() {
    mainCard.hide();
    
    swal({
        title: "Get Ready For Trivia!",
        icon: "success",
        text: "Answer the questions before the timer runs out!",
        button: "Continue", 
    });  
    }
    setTimeout(welcomeAlert, 1);

    $("#startButton").on("click", startGame);

    //******use these functions in stopwatch object to build game********
    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
};

function startGame(){
    startCard.hide();
    mainCard.show();
}

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false;

// Our stopwatch object ********************************************************
var stopwatch = {

    time: 0,
    lap: 1,

    reset: function() {

        stopwatch.time = 0;
        stopwatch.lap = 1;

        // DONE: Change the "display" div to "00:00."
        $("#display").text("00:00");
    },

    start: function() {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
        }
    },

    stop: function() {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function() {

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time++;

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
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