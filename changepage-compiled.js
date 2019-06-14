(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
changepage=function(page){//change page



	var pre_page = window.location.href.indexOf('page');


	if(window.location.href.indexOf('page') == -1)
		window.location.replace(window.location.href + '&page=' + page);
	else
		window.location.replace(window.location.href.substring(0, pre_page + 5)  +  page); // 6 - (page-1).toString().length) + '&page=';

	//bottom-up

}

module.exports = changepage;


},{}]},{},[1]);
