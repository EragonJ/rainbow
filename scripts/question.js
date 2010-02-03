//combine with setQuestion()
function getQuestion()
{
	var Url = "fetch.php?url=" + targetUrl;
	request.onreadystatechange = setQuestion;
	request.open("GET",Url,true);
	request.send(null);
}

function setQuestion()
{
	var errorDOM    = document.getElementById("error");
	var ajaxDOM     = document.getElementById("ajaxLoader");

	if(request.readyState == 4)
	{
		if(request.status == 200)
		{
			if(request == null)
			{
				errorDOM.className = "requestError";
			}
			else
			{
				questionReady = true;
				question = request.responseText;
				ModifyQuestion();
				
				ajaxDOM.className = "loaded";
				//Bind question fade effect here
				questionFadeEffect();
			}
		}
	}
}

function ModifyQuestion()
{

	var questionDOM     = document.getElementById("question");
	var out_questionDOM = document.getElementById("out_question");
	var in_questionDOM  = document.getElementById("in_question");
	var sBig            = '<span class="bigWord">';
	var sMid            = '<span class="midWord">';
	var sSma            = '<span class="smaWord">';
	var sEnd            = '</span>';
	var emptyString     = "&nbsp;";
	var currentWord     = questionDOM.innerHTML;

	//create a 'fake' static variable called currentIndex
	if( typeof ModifyQuestion.currentIndex == 'undefined' )
	{
		ModifyQuestion.currentIndex = 0;
	}
	
	if( typeof ModifyQuestion.leftString == 'undefined' )
	{
		ModifyQuestion.leftString = '';
	}
	
	if( typeof ModifyQuestion.currentString == 'undefined' )
	{
		ModifyQuestion.currentString = question.substr(ModifyQuestion.currentIndex,1);
	}

	if( typeof ModifyQuestion.rightString == 'undefined' )
	{
		ModifyQuestion.rightString = question.substr(ModifyQuestion.currentIndex+1);
	}

	if(ModifyQuestion.currentIndex == 0)
	{
		questionDOM.innerHTML    = ModifyQuestion.currentString;
		in_questionDOM.innerHTML = sBig+ModifyQuestion.rightString.slice(0,1)+sEnd+
															 sMid+ModifyQuestion.rightString.slice(1,2)+sEnd+
														   sSma+ModifyQuestion.rightString.slice(2,3)+sEnd;
		ModifyQuestion.currentIndex ++;
	}
	else if(ModifyQuestion.currentIndex <= question.length)
	{
		ModifyQuestion.leftString    = question.substr(0,ModifyQuestion.currentIndex);
		ModifyQuestion.currentString = question.substr(ModifyQuestion.currentIndex,1);
		ModifyQuestion.rightString   = question.substr(ModifyQuestion.currentIndex+1);
		questionDOM.innerHTML        = ModifyQuestion.currentString;

		if(ModifyQuestion.currentIndex == 1)
		{
			out_questionDOM.innerHTML  = sBig+ModifyQuestion.leftString.slice(-1)+sEnd;
		}
		else if(ModifyQuestion.currentIndex == 2)
		{
			out_questionDOM.innerHTML  = sMid+ModifyQuestion.leftString.slice(-2,-1)+sEnd+
																	 sBig+ModifyQuestion.leftString.slice(-1)+sEnd;
		}
		else
		{
			out_questionDOM.innerHTML  = sSma+ModifyQuestion.leftString.slice(-3,-2)+sEnd+
																	 sMid+ModifyQuestion.leftString.slice(-2,-1)+sEnd+
																	 sBig+ModifyQuestion.leftString.slice(-1)+sEnd;
		}

		//To hold the in_question block
		if((ModifyQuestion.currentIndex+1)==question.length)
		{
			in_questionDOM.innerHTML     = emptyString;
		}
		else
		{
			in_questionDOM.innerHTML     = sBig+ModifyQuestion.rightString.slice(0,1)+sEnd+
																	   sMid+ModifyQuestion.rightString.slice(1,2)+sEnd+
																	   sSma+ModifyQuestion.rightString.slice(2,3)+sEnd;
		}

		ModifyQuestion.currentIndex ++ ;
	}

	//finished
	if(ModifyQuestion.currentIndex > question.length)
	{
		//To hold the in_question block
		in_questionDOM.innerHTML     = emptyString;
		out_questionDOM.innerHTML    = emptyString;
		questionDOM.innerHTML        = emptyString;

		alert("finished");
		return;
	}

	//when typo happened, the return value will help re-checking the codes
	return currentWord; 
}

