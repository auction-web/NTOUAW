
	window.addEventListener('hashchange', function(e) {
	    console.log(e.oldURL);
	    console.log(e.newURL);
	    window.location.reload(false);
	}, false);
	

	var firebase = require("./firebase");
	var product_order = require("./product_order");//
	var getKindPoducts = require("./getKindPoducts");//
	var search = require("./search");//
	var cant_find= require("./cant_find");


	var db = firebase.firestore();
	var storage = firebase.storage();

	var url_origun = location.href;
	var url = decodeURI(url_origun);

	var kind = '';
	var page = '';//page 1(0~7), page 2(8~15), page 3(16~23), page n( (n-1)*8 ~ (n*8)-1 )
	var input = '';
	var is_Search = false;
	var itemfilter = '';


	if(url.indexOf('?') != -1){
		if(url.indexOf('search') != -1){//has 'search'
			is_Search = true;
			input = url.split('?')[1].split('&')[0].split('=')[1];
			itemfilter = url.split('?')[1].split('&')[1].split('=')[1];
			itemfilter = itemfilter.substr(0, itemfilter.length - 1); //itemfilter - #
			page = url.split('?')[1].split('&')[2].split('=')[1];
		}
		else{
			kind = url.split('?')[1].split('&')[0].split('=')[1];
			page = url.split('?')[1].split('&')[1].split('=')[1];
		}
	}

	if(is_Search){


		if(input === ""){
			alert("Please search something!");
			cant_find(1);
		}
		else
			var search_call = search(db, storage, input, itemfilter, page);

	}
	else{

		var products_all = getKindPoducts(db, storage, kind, page);//type: promise
		console.log('getKindPoducts');
		
	}

	document.getElementById("catagories").children[Number(kind)].className = "active";




	



