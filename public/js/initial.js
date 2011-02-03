// start the game
function start()
{
	var invIME          = document.getElementById("invIME");
	var promptTxt       = "Plz Enter an URL";
			exUrl           = "http://boshiamy.com/";
			request         = createRequest(); // This is for fetching questions
      gamePause       = false; // pause the game
      gameOver        = false; // the game is over
			questionReady   = false; 
			question        = ''; // store the whole question fetched from the url
      questionLength  = 0; 
      questionBlock   = {}; // store leftString , rightString and currentIndex(currentString) to manipulate questionBlock DOM
			targetUrl       = '';
      IMElist         = getIMElist();
			currIME         = IMElist[0];
      keyList         = []; // momorize all typed key no matter it's correct or not , for report
                        

  // Timers

      /*
       *  This timer will be set to updateBoardInfo after questionReady
       *  Remember to remove the scoreBoardTimer and questionReady later after the question is done
       */
      if (typeof passedTimer != 'undefined') {
        clearInterval(passedTimer);
      }
      if (typeof scoreBoardTimer != 'undefined') {
        clearInterval(scoreBoardTimer);
      }
      if (typeof gameInfoTimer != 'undefined') {
        clearInterval(gameInfoTimer);
      }

      passedTimer     = setInterval('updatePassedTime()',1000); // 1(s)
      scoreBoardTimer = setInterval('updateBoardInfo()',300); // 0.3(s)
      gameInfoTimer   = setInterval('updateGameInfo()',500); // 0.5(s)

  // Enhanced global variables for scoreBoard
      typeSpeed       = 0;
      correctRatio    = 0;
      incorrectRatio  = 0;
      finishRatio     = 0;
      passedTime      = 0;
      correctWord     = 0;
      incorrectWord   = 0; 
      totalWord       = 0; 

  // Constants
      CONSTANT        = {
        TYPE_SPEED_PRECISION:3,
        RATIO_PRECISION:2,
      };
		
  // Release all event first ,
  // Focus it , 
  // trigger keyMotion() when keydown , 
  // trigger reFocus() when blur
  $(invIME).unbind()
           .focus()
           .keydown(keyMotion)
           .blur(reFocus);

	//prompt to ask url
	targetUrl = prompt(promptTxt,exUrl);
	targetUrl = (''==targetUrl) ? exUrl : targetUrl;

	//get the original question from the specific url
	getQuestion();
}

// Pause the game
function pause()
{
  gamePause = !gamePause;
}

// Reset the game
function reset()
{
  // Reset Game Road
  clearGameRoad();

  // Reset innerHTML of in_questionDOM, out_questionDOM, questionDOM
  clearQuestion();
  
  // restart
  start();
}

// Game is over
function over()
{
  // We have to use a tempTimer to delay after the layout has been modified.
  var tempTimer = setTimeout(function(){
    gameOver = true;
    clearTimeout(tempTimer);

    $("#reportButton").fadeIn('fast');
  },1000);
}

function report()
{
  if (typeof keyList == 'undefined') {
    return;
  }

  var json_keyList = JSON.stringify(keyList);
  var json_boardInfo = JSON.stringify({
    passedTime:Math.floor(passedTime/60)+"分"+Math.floor(passedTime%60)+"秒",
    typeSpeed:typeSpeed,
    correctRatio:correctRatio,
    incorrectRatio:incorrectRatio,
    finishRatio:finishRatio,
    correctWord:correctWord,
    incorrectWord:incorrectWord,
    totalWord:totalWord+"/"+questionLength
  });
}
