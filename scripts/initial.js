window.onload = initial;

//Bind function to specific DOM
function initial()
{
	var invIME        = document.getElementById("invIME");
	var promptTxt     = "Plz Enter an URL";
			exUrl         = "http://boshiamy.com/";
			request       = createRequest();
			KMrequest     = createRequest();
		  CKrequest     = createRequest();
			questionReady = false;
			question      = '';
			targetUrl     = '';
			currIME       = 'liu';

		
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
