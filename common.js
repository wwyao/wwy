/*
*判断使用的浏览器是什么浏览器
*return browserName
*/
function getBrowser(){
	var  str1 = navigator.userAgent.toLowerCase();
	if(str1.indexOf('msie')!==-1){
		return "ie";
	}else if (str1.indexOf('chrome')!==-1) {
		return "chrome";
	}else if(str1.indexOf('safari')!==-1){
		return "safari";
	}else if(str1.indexOf('firefox')!==-1){
		return "firefox";
	}else{
		return "other";
	}
}