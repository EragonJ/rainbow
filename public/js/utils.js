function createRequest()
{
	try
	{
		//for non-M$ browsers
		request = new XMLHttpRequest();
	}	
	catch(tryMS)
	{
		try
		{
			//for M$ browsers
			request = new ActiveXObject("Msxm12.XMLHTTP");
		}
		catch(otherMS)
		{
			try
			{
				//for M$ browsers
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(failed)
			{
				request = null;
			}
		}
	}

	return request;
}

function addEventHandler(obj,eventName,handler)
{
	if(document.attachEvent)
	{
		obj.attachEvent("on"+eventName,handler);
	}
	else if(document.addEventListener)
	{
		obj.addEventListener(eventName,handler,false);
	}
}
