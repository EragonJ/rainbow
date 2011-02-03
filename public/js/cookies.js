function setCookie(name,value)
{
  document.cookie = name+"="+escape(value);
}

function getCookie(name,value)
{
  var cookieCheck = false;
  var index = document.cookie.search(name+"="+value);
  var length = value.toString().length;
  if (index!=-1) {
    var sValue = document.cookie.substr(index+name.length+1,length);
    if(sValue==escape(value)){
      cookieCheck = true;
    }    
  }    
  return cookieCheck;
}  

function delCookie(name,value)
{
  var exp = new Date();
  exp.setTime(exp.getTime()-1);
  document.cookie = name+"="+escape(value)+";expires="+exp.toGMTString();
}

function checkCookieEnabled(name,value)
{
  setCookie(name,value);
  var result = getCookie(name,value);
  delCookie(name,value);

  return result;
}
