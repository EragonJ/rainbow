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
  if (!questionReady || gamePause || gameOver) {
    return;
  }

  if (left_input.className == "incorrect") {
    left_input.className = '';
    keyClear("left");

    //keyPool has to be re-initiallized
    keyPool = '';
  }

  if ('DELETE' == getKey(charCode)) {

    keyPool = keyPool.substr(0,(keyPool.length)-1);
    left_input.innerHTML = keyPool;
    keyClear("right");
  }
  else if ('SHIFT' == getKey(charCode)) {

    changeIME();
  }
  else if ('SPACE' == getKey(charCode)) {

    keyPool += keyChar;
  }
  // Normal keys and space
  else if ( -1 != getKey(charCode) && '?' != getKey(charCode)) {

    keyPool += getKey(charCode);
    left_input.innerHTML = keyPool;
  }
  // Unused key , skip symbols now and we will add them later
  else {

  }

  // catch 
  // errorDOM.className = "okay";

  // We have to collect all browsers' rules
  // it's hard-coded now , I'll change later
  //check1: word+digit

  // 1 -> (/^[a-zA-Z]+\d$/)
  if (keyPool.match(/[^0-9]+\d$/)) {

    keyConfirmed = true;
  }
  //check2: word+space
  // 2 -> (/^[a-zA-Z]+ $/)
  else if (keyPool.match(/[^0-9]+ $/)) {

    keyConfirmed = true;
    keyPool = keyPool.substr(0,(keyPool.length)-1)+'0';
  }
  else {

    left_input.className = '';
  }

  keySearch(keyPool,keyConfirmed);
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
  // else the key doesn't exisit and the user hasn't confirmed it yet , just clear the right part
  else {

    keyClear('right');
    return false;
  }
}

function showHint(hintString)
{
  document.getElementById("right_input").innerHTML = hintString;
}

function keyCheck(confirmedKey)
{

  var now_question = document.getElementById("question").innerHTML;

  // find the word and matched
  if (now_question == confirmedKey) {
    isKeyMatched(true);
    keyMemo(true,now_question,confirmedKey);

    keyClear('both');
    ModifyQuestion();

    return true;
  }
  // find the word but not matched
  else {

    var hintString = '';
    var revWords = keyRevCheck(now_question);

    for (var i=0; i<revWords.length; i++) {
      hintString += i + '. ' + revWords[i] + ' ';
    }

    isKeyMatched(false);
    keyMemo(false,now_question,confirmedKey,revWords);

    keyClear('right');
    showHint(hintString);
    ModifyQuestion();
    
    return false;
  }
}

function keyRevCheck(word)
{

  var keyCandidate = [];

  for (var e in IME[currIME]) {
    for (var l in IME[currIME][e]) {
      if (IME[currIME][e][l] == word) {
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

function keyMemo(which,originalKey,typedKey,revKeys)
{
  var currentKey = {};
  currentKey.which = which;
  currentKey.originalKey = originalKey;

  // The user may type in a non-exist word and make it undefined !
  // In this way, we have to make it empty and store into keyList
  if (typeof typedKey == 'undefined') {
    typedKey = " ";
  }

  currentKey.typedKey = typedKey;

  if (which == false) {
    currentKey.revKeys = revKeys;
  }

  keyList.push(currentKey);
}

function changeIME()
{
	var iconsDOM   = document.getElementById("icons");
	var imgBase    = "public/images/IME/";
  var imgSuffix  = ".png";

  // If this value is -1 , it means that current IME is not in IMElist , weird and may not happen
  var currIME_index = $.inArray(currIME,IMElist);

  currIME = (currIME_index == IMElist.length-1) ? IMElist[0] : IMElist[currIME_index+1];

  iconsDOM.src = imgBase+currIME+imgSuffix;

  keyClear('both');
}

/*
 * This function will help us fetch out script tag names and analyze the src attribute.
 * In this way , we can automatically get the IME names.
 */
function getIMElist()
{
  var list = [];

  $("script[src^='tables']").each(function(){
    var IMEname = $(this).attr('src').match(/\/(.*?)\.js/);
    if (IMEname) {
      list.push(IMEname[1]);
    }
  });

  return list;
}

/*
 * Refactor invIME later , too many selector overlapped
 */
function reFocus()
{
	var invIME = document.getElementById("invIME");
	invIME.focus();
}

/*
 * This getKey function is to help me solve the crose browser issue when using keyCode.
 */
function getKey(charCode)
{
  var keyTable = {
    0:[[192], [49 ], [50 ], [51 ], [52 ], [53 ], [54 ], [55 ], [ 56], [ 57],     [48], [109,189], [61,187], [ -1]],
    1:[ [-1], [81 ], [87 ], [69 ], [82 ], [84 ], [89 ], [85 ], [ 73], [ 79],     [80],     [219],    [221], [220]],
    2:[ [-1], [65 ], [83 ], [68 ], [70 ], [71 ], [72 ], [74 ], [ 75], [ 76], [59,186],     [222],    [ -1],  [-1]],
    3:[ [-1], [90 ], [88 ], [67 ], [86 ], [66 ], [78 ], [77 ], [188], [190],    [191],     [ -1],    [ -1],  [-1]],

    // leave all special keys in row 4 , feel free to update the mapping in customized situation
    4:[[16], [32], [8]] //[9], [20], 
  }; 

  var keyWord = {
    0:[['`'], ['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['0'], ['-'], ['='], ['?']],
    1:[['?'], ['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], ['['], [']'], ["\\"]],
    2:[['?'], ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';'], ["'"], ['?'], ['?']],
    3:[['?'], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [','], ['.'], ['/'], ['?'], ['?'], ['?']],

    // leave all special keys in row 4 , feel free to update the mapping in customized situation
    4:[['SHIFT'], ['SPACE'], ['DELETE']] //['TAB'], ['CAPS'], 
  }

  for (var row in keyTable) {
    for (var col in keyTable[row]) {
      for (var code in keyTable[row][col]) {
        if (keyTable[row][col][code] == charCode) {
          return keyWord[row][col][0];
        }
      }
    }
  }

  return -1;
}
