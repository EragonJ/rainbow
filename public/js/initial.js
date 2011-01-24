window.onload = initial;

//Bind function to specific DOM
function initial()
{
	var invIME          = document.getElementById("invIME");
	var promptTxt       = "Plz Enter an URL";
			exUrl           = "http://boshiamy.com/";
			request         = createRequest(); // This is for fetching questions
			questionReady   = false;
			question        = '';
			targetUrl       = '';
			currIME         = 'liu';

  // Timers

      /*
       *  This timer will be set to updateBoardInfo after questionReady
       *  Remember to remove the scoreBoardTimer and questionReady later after the question is done
       */
      scoreBoardTimer = setInterval('updateBoardInfo()',1000);

  // Enhanced global variables for scoreBoard
      typeSpeed       = 0;
      correctRatio    = 0;
      incorrectRatio  = 0;
      passedTime      = 0;
      correctWord     = 0;
      incorrectWord   = 0; 
      totalWord       = 0; 
		
	//Set focus event to text
	invIME.focus();

	//set keyMotion function to onkeydown event
	invIME.onkeydown = keyMotion;

	//set reFocus function to onblur event 
	invIME.onblur    = reFocus;

	//prompt to ask url
	targetUrl = prompt(promptTxt,exUrl);
	targetUrl = (''==targetUrl) ? exUrl : targetUrl;

	//get the original question from the specific url
	getQuestion();
}
