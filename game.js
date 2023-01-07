var userClickedPattern = [];

var level = 0;
var started = false;

var gamePattern = [];

var butttonColours = ["red", "blue", "green", "yellow"];


$(document).keypress(function (){
    if(!started){
    // $("h1").text("level " + level);
    nextSequence();
    started = true;
    }
});


function nextSequence (){
    userClickedPattern = [];
    
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = butttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

       $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

       playSound(randomChosenColour);
}


$(".btn").click(function (){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer (currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }else{
        $("h1").text("Game Over, Press Any Key to Restart");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
 

function playSound (randomChosenColour){
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    var audioChosen = audio.play();
    $("." + randomChosenColour).audioChosen;
}


function animatePress (currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function (){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


function startOver (){
    gamePattern = [];
    level = 0;
    started = false;
}