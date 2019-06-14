changepage=function(page){//change page



	var pre_page = window.location.href.indexOf('page');


	if(window.location.href.indexOf('page') == -1)
		window.location.replace(window.location.href + '&page=' + page);
	else
		window.location.replace(window.location.href.substring(0, pre_page + 5)  +  page); // 6 - (page-1).toString().length) + '&page=';

	//bottom-up

}

module.exports = changepage;

