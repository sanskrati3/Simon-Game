var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started = false;

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//generating random number
function nextSequence()
{
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*3)+1;
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //adding fading effect to the button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // adding sound when the button is being clicked
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 500);
}


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
        setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
    }

}


function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}
