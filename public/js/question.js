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
				question = request.responseText || "當您看到以下訊息，就代表讀取失敗囉。";
        questionLength = question.length;
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

	//create a 'fake' static variable called currentIndex
	if( typeof questionBlock.currentIndex == 'undefined' )
	{
		questionBlock.currentIndex = 0;
	}
	
	if( typeof questionBlock.leftString == 'undefined' )
	{
		questionBlock.leftString = '';
	}
	
	if( typeof questionBlock.currentString == 'undefined' )
	{
		questionBlock.currentString = question.substr(questionBlock.currentIndex,1);
	}

	if( typeof questionBlock.rightString == 'undefined' )
	{
		questionBlock.rightString = question.substr(questionBlock.currentIndex+1);
	}

	if(questionBlock.currentIndex == 0)
	{
		questionDOM.innerHTML    = questionBlock.currentString;
		in_questionDOM.innerHTML = sBig+questionBlock.rightString.slice(0,1)+sEnd+
															 sMid+questionBlock.rightString.slice(1,2)+sEnd+
														   sSma+questionBlock.rightString.slice(2,3)+sEnd;
		questionBlock.currentIndex ++;
	}
	else if(questionBlock.currentIndex <= question.length)
	{
		questionBlock.leftString    = question.substr(0,questionBlock.currentIndex);
		questionBlock.currentString = question.substr(questionBlock.currentIndex,1);
		questionBlock.rightString   = question.substr(questionBlock.currentIndex+1);
		questionDOM.innerHTML        = questionBlock.currentString;

		if(questionBlock.currentIndex == 1)
		{
			out_questionDOM.innerHTML  = sBig+questionBlock.leftString.slice(-1)+sEnd;
		}
		else if(questionBlock.currentIndex == 2)
		{
			out_questionDOM.innerHTML  = sMid+questionBlock.leftString.slice(-2,-1)+sEnd+
																	 sBig+questionBlock.leftString.slice(-1)+sEnd;
		}
		else
		{
			out_questionDOM.innerHTML  = sSma+questionBlock.leftString.slice(-3,-2)+sEnd+
																	 sMid+questionBlock.leftString.slice(-2,-1)+sEnd+
																	 sBig+questionBlock.leftString.slice(-1)+sEnd;
		}

		//To hold the in_question block
		if((questionBlock.currentIndex+1)==question.length)
		{
			in_questionDOM.innerHTML     = emptyString;
		}
		else
		{
			in_questionDOM.innerHTML     = sBig+questionBlock.rightString.slice(0,1)+sEnd+
																	   sMid+questionBlock.rightString.slice(1,2)+sEnd+
																	   sSma+questionBlock.rightString.slice(2,3)+sEnd;
		}

		questionBlock.currentIndex ++ ;
	}

	//finished
	if(questionBlock.currentIndex > question.length)
	{
		//To hold the in_question block
		in_questionDOM.innerHTML     = emptyString;
		out_questionDOM.innerHTML    = emptyString;
		questionDOM.innerHTML        = emptyString;

		alert("finished");
    over();
	}
}

function clearQuestion()
{
	var questionDOM     = document.getElementById("question");
	var out_questionDOM = document.getElementById("out_question");
	var in_questionDOM  = document.getElementById("in_question");

  $(questionDOM).html('');
  $(out_questionDOM).html('');
  $(in_questionDOM).html('');
}
