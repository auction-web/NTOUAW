changepage=function(page){//change page

	//var input = getElementById('search');
	if(window.location.href.indexOf('page') == -1)
		window.location.replace(window.location.href + '&page=' + page);
	/*else if (window.location.href.indexOf('?search=') != -1)
		window.location.replace(window.location.href.substring(0, window.location.href.length - 8) + '&page=' + page);*/
	else
		window.location.replace(window.location.href.substring(0, window.location.href.length - 6 - page.toString().length) + '&page=' + page);
	//window.location.assign(url + '&page=' + page);

}
//////////???/
module.exports = changepage;

