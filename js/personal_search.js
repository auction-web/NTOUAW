var firebase= require("./firebase");
var db = firebase.firestore();
//get cookies
var cookies = getCookie('id');
var User_cookies = 'User' + cookies;
var User = User_cookies + '/';

var url_origun = location.href;
var url = decodeURI(url_origun);
var max_page = 0;
var search_input = '';
var search_itemfilter = '';

if(url.indexOf('?')!= -1){
   if(url.indexOf('search') != -1){
       console.log('search');
       var data = url.split('?')[1];
       var tab_id = '';
       search_input = data.split('&')[0].split('=')[1];
       tab = data.split('#')[1];
       search_itemfilter = data.split('&')[1].split('=')[1].split('#')[0];
       //console.log(search_input);
       //console.log(search_itemfilter);
       tabcontent = document.getElementsByClassName("tabcontent");
       for (i = 0; i < tabcontent.length; i++) {
           tabcontent[i].style.display = "none";
       }
       tablinks = document.getElementsByClassName("tablinks");
       for (i = 0; i < tablinks.length; i++) {
           tablinks[i].className = tablinks[i].className.replace(" active", "");
       }
       if(tab == 'PM'){
           tab_id = 'productmanage'
       }
       document.getElementById(tab_id).style.display = "block";
       target_tab = document.getElementsByClassName('PM');
       target_tab[0].className += " active";
       PMloadproduct(1, search_input, search_itemfilter);
    }
}