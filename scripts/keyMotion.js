//behavior of typing
function keyMotion(e)
{
	var left_input = document.getElementById("left_input");
	var errorDOM   = document.getElementById("error");
	var keyPool    = left_input.innerHTML;
	var charCode   = (e.which) ? e.which : event.keyCode;
	var Url        = "trans.php?IME=" + currIME + "&input=";
	var sumittable = false;
	var keyChar;
	//var keyPool    = document.getElementById("invIME").value;
 
	if(KMrequest == null)
	{
		errorDOM.className = "requestError";
	}
	else
	{

		//Check whether the question is ready or not
		if(!questionReady)
		{
			return;
		}

		if(left_input.className == "incorrect")
		{
			left_input.className = "";
			keyClear("left");

			//keyPool has to be re-initiallized
			keyPool = "";
		}

		keyChar = String.fromCharCode(charCode);

		if(charCode == 8)
		{
			keyPool = keyPool.substr(0,(keyPool.length)-1);
			left_input.innerHTML = keyPool;
		}
		else if(charCode == 91)
		{
			//Apple left Window Key
		}
		else if(charCode == 113)
		{
			//F2
			keyEffect();
		}
		else if((charCode<=90&&charCode>=48)||(charCode==32))
		{
			keyPool = keyPool + keyChar;
			left_input.innerHTML = keyPool;
		}
		else
		{
			
		}

		//catch 
		Url = Url + keyPool;
		errorDOM.className = "okay";
		KMrequest.onreadystatechange = keyMap;
		KMrequest.open("GET",Url,true);
		KMrequest.send(null);

		//check1: word+digit
		if(keyPool.match(/^\w+\d$/))
		{
			submittable = true;
		}
		//check2: word+space
		else if(keyPool.match(/^\w+ $/))
		{
			submittable = true;
		}
		else
		{
			submittable = false;
			left_input.className = "";
		}
		
		if(submittable)
		{
			Url = Url + "&check=true";
			KMrequest.onreadystatechange = retResult;
			KMrequest.open("GET",Url,true);
			KMrequest.send(null);
		}
	}	
}

//map to target php
function keyMap()
{
	if(KMrequest.readyState == 4)
	{
		if(KMrequest.status == 200)
		{
			document.getElementById("right_input").innerHTML = KMrequest.responseText;
		}
	}
}

function retResult()
{
	var errorDOM  = document.getElementById("error");
	var Url       = "trans.php?IME="+currIME+"&check=false&input=";
	var checkWord;

	if(KMrequest.readyState == 4)
	{
		if(KMrequest.status == 200)
		{
			//can't find the word in DB
			if(KMrequest.responseText == "nothing")
			{
				left_input.className = "incorrect";
				keyClear("right");
			}
			else
			{
				var question = document.getElementById("question").innerHTML;
				//find the word and matched
				if(question == KMrequest.responseText)
				{
					left_input.className = "correct";
					keyClear("both");
					ModifyQuestion();
				}
				//find the word but not matched
				else
				{
					left_input.className = "incorrect";
					keyClear("right");
					checkWord = ModifyQuestion();
					if(CKrequest == null)
					{
						errorDOM.className = "requestError";
					}
					else
					{
						Url = Url + checkWord;
						CKrequest.onreadystatechange = wordChecked;
						CKrequest.open("GET",Url,true);
						CKrequest.send(null);
					}
				}
			}
		}
	}
}

function keyClear(which)
{
	var left_input  = document.getElementById("left_input");
	var right_input = document.getElementById("right_input");
	var invIME      = document.getElementById("invIME");
	var emptyString = "";
	
	if(which == "left")
	{
		left_input.innerHTML = emptyString;
	}
	else if(which == "right")
	{
		right_input.innerHTML = emptyString;
		invIME.value = emptyString;
	}
	else if(which == "both")
	{
		left_input.innerHTML  = emptyString;
		right_input.innerHTML = emptyString;
		invIME.value = emptyString;
	}
}

function keyEffect()
{
	var iconsDOM   = document.getElementById("icons");
	var imgBase    = "images/";
	var imgArray   = new Array("liu.gif","tsang.gif");

	if(currIME == "liu")
	{
		currIME = "tsangjei";
		iconsDOM.src = imgBase+imgArray[1];
	}
	else if(currIME == "tsangjei")
	{
		currIME = "liu";
		iconsDOM.src = imgBase+imgArray[0];
	}
}

function wordChecked()
{
	if(CKrequest.readyState == 4)
	{
		if(CKrequest.status == 200)
		{
			document.getElementById("right_input").innerHTML = CKrequest.responseText.toUpperCase();
		}
	}
}

function reFocus()
{
	var invIME = document.getElementById("invIME");
	invIME.focus();
}
