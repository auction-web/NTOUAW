function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	//alert(cname+"="+cvalue+"; "+expires);
	document.cookie = cname+"="+cvalue+"; "+expires+";path=/";
	//alert(document.cookie);
	//alert(getCookie(cname));
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}

function DelCookie(name){ 
	var exp = new Date(); 
	exp.setTime(exp.getTime() - 1); 
	var cval=getCookie(name); 
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/"; 
} 
function signout(){
	DelCookie('id');
        location.href = "./index.html";
}
