function updateGameInfo() {
  if (questionReady && !gamePause && !gameOver) {
    updateGameRoad(); 
  }
}

function updateGameRoad() {
  var AI_DIFFICULTY = 1;

  // I have to fix position problem for image !
  var game_road_width     = $(".game_road").width();
  var ai_gameRoad_width   = game_road_width - $("#game_ai .characters").width();
  var user_gameRoad_width = game_road_width - $("#game_user .characters").width();

  $("#game_ai .characters").each(function(){
    var old_left = parseFloat($(this).css('left'));

    if (old_left >= ai_gameRoad_width) {
      return;
    }
    else {
      var new_left = old_left + AI_DIFFICULTY;
      $(this).animate({left:new_left},'fast');
    }
  });

  $("#game_user .characters").each(function(){
    var old_left = parseFloat($(this).css('left'));

    if (old_left >= user_gameRoad_width) {
      return;
    }
    else {
      var new_left = (user_gameRoad_width * finishRatio / 100);
      $(this).animate({left:new_left},'fast');
    }
  });
}

function clearGameRoad()
{
  $(".characters").css({left:"0px"});  
}
