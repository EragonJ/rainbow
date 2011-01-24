//behavior of typing
function keyMotion(e)
{
	var left_input  = document.getElementById("left_input");
	var errorDOM    = document.getElementById("error");

	var keyPool     = left_input.innerHTML;
	var charCode    = (e.which) ? e.which : event.keyCode;
  var keyChar     = String.fromCharCode(charCode).toLowerCase();
	var keyConfirmed = false;
 
  // Check whether the question is ready or not
  if (!questionReady) {
    return;
  }

  if (left_input.className == "incorrect") {
    left_input.className = '';
    keyClear("left");

    //keyPool has to be re-initiallized
    keyPool = '';
  }

  // Backspace
  if (charCode == 8) {

    keyPool = keyPool.substr(0,(keyPool.length)-1);
    left_input.innerHTML = keyPool;
    keyClear("right");
  }
  // Space
  else if (charCode == 32) {

    keyPool += keyChar;
  }
  // Normal keys and space
  else if (charCode<=90&&charCode>=48) {

    keyPool += keyChar;
    left_input.innerHTML = keyPool;
  }
  // F2
  else if (charCode == 113) {

    changeIME();
  }
  // Unused key , skip symbols now and we will add them later
  else {

  }

  // catch 
  // errorDOM.className = "okay";

  //check1: word+digit
  if (keyPool.match(/^\w+\d$/)) {

    keyConfirmed = true;
  }
  //check2: word+space
  else if (keyPool.match(/^\w+ $/)) {

    keyConfirmed = true;
    keyPool = keyPool.substr(0,(keyPool.length)-1)+'0';
  }
  else {

    left_input.className = '';
  }

  // If we can't find it
  if (!keySearch(keyPool,keyConfirmed)) {

  }
}

function keySearch(keyPool,keyConfirmed)
{
  var keyBody;
  var keyIndex;

  if (keyConfirmed) {
    keyBody  = keyPool.substr(0,keyPool.length-1);
    keyIndex = keyPool.substr(-1,1);
  }
  else {
    keyBody  = keyPool;
  }

  // if the key exists
  if (typeof IME[currIME][keyBody] != 'undefined') {

    // and if the user has confirmed the key composition
    if (keyConfirmed) {

      return keyCheck(IME[currIME][keyBody][keyIndex]);
    }
    // otherwise, we show the candidate out
    else {
      var i = 0;
      var hintString = '';

      for (var element in IME[currIME][keyBody]) {
        hintString += ''+ (i++) +'. '+ IME[currIME][keyBody][element] +' ';   
      }

      showHint(hintString);
      return true;
    }
  }
  // if the key doesn't exist but the user has confirmed it , we just check 'undefined' word
  // Like 'sdafsaf '
  else if (typeof IME[currIME][keyBody] == 'undefined' && keyConfirmed) {

    return keyCheck();
  }
  // else the key doesn't exisit and the user hasn't confirmed it yet , just bypass
  else {

    return false;
  }
}

//map to target php
function showHint(hintString)
{
  document.getElementById("right_input").innerHTML = hintString;
}

function keyCheck(confirmedKey)
{

  var question = document.getElementById("question").innerHTML;

  // find the word and matched
  if (question == confirmedKey) {
    isKeyMatched(true);
    keyClear('both');
    ModifyQuestion();

    return true;
  }
  // find the word but not matched
  else {
    isKeyMatched(false);
    keyClear('right');

    var revWords = keyRevCheck(question);
    showHint(revWords.join(' '));
    ModifyQuestion();
    
    return false;
  }
}

function keyRevCheck(word)
{

  // prefix
  var keyCandidate = ["字根: "];
  var index = 0;
  for (var e in IME[currIME]) {
    for (var l in IME[currIME][e]) {
      if (IME[currIME][e][l] == word) {
        keyCandidate.push((index++)+') ');
        keyCandidate.push(e); 
      }
    }
  }
  return keyCandidate;
}

function isKeyMatched(which)
{
  if (true == which) {
    left_input.className = 'correct';
  }
  else {
    left_input.className = 'incorrect';
  }

  wordIncrease(which);
}

function keyClear(which)
{
	var left_input  = document.getElementById("left_input");
	var right_input = document.getElementById("right_input");
	var invIME      = document.getElementById("invIME");
	var emptyString = "";
	
	if (which == "left")
	{
		left_input.innerHTML = emptyString;
	}
	else if (which == "right")
	{
		right_input.innerHTML = emptyString;
		invIME.value = emptyString;
	}
	else if (which == "both")
	{
		left_input.innerHTML  = emptyString;
		right_input.innerHTML = emptyString;
		invIME.value = emptyString;
	}
}

function changeIME()
{
	var iconsDOM   = document.getElementById("icons");
	var imgBase    = "public/images/";
	var imgArray   = new Array("liu.gif","tsang.gif");

	if (currIME == "liu")
	{
		currIME = "tsangjei";
		iconsDOM.src = imgBase+imgArray[1];
	}
	else if (currIME == "tsangjei")
	{
		currIME = "liu";
		iconsDOM.src = imgBase+imgArray[0];
	}
}

function reFocus()
{
	var invIME = document.getElementById("invIME");
	invIME.focus();
}
