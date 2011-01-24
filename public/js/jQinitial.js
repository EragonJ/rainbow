$(document).ready(function(){

	//Beautifying
	$("#answer #ide").corner("round 7px");
	$("#answer #left_input").corner("");
	$("#answer #right_input").corner("");

	//
	$("#memo").hide();
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
