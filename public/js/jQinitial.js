$(document).ready(function(){

	// Round corner beautifying
	$("#answer #ide").corner("round 7px");
	$("#answer #left_input").corner("");
	$("#answer #right_input").corner("");
	$("#scoreBoard").corner("round 7px");
  $("#scoreBoard div").corner("round 3px");


  // utils
  $("#scoreBoard").draggable({cursor:'all-scroll'});

	//
	$("#memo").hide();

  // All about functional buttons
  $("#startButton").click(start);
  $("#pauseButton").click(pause);
  $("#resetButton").click(reset);
  $("#overButton").click(over);
  $("#reportButton").click(report);

})

function questionFadeEffect()
{
	$("#question_block #in_question").fadeOut();
	$("#question_block #out_question").fadeOut();
	$("#question_block #question").fadeOut();
	$("#question_block #question").fadeIn();
	$("#question_block #in_question").fadeIn();
	$("#question_block #out_question").fadeIn();
}
