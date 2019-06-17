
	window.addEventListener('hashchange', function(e) {
	    console.log(e.oldURL);
	    console.log(e.newURL);
	    window.location.reload(false);
	}, false);
	

	var firebase = require("./firebase");
	var product_order = require("./product_order");//
	var getKindPoducts = require("./getKindPoducts");//
	var getKindPoducts_filter = require("./getKindPoducts_filter");//
	var search = require("./search");//
	var search_filter = require("./search_filter");
	var cant_find= require("./cant_find");


	var db = firebase.firestore();
	var storage = firebase.storage();

	var url_origun = location.href;
	var url = decodeURI(url_origun);

	//str
	var kind = '';
	var page = '';//page 1(0~7), page 2(8~15), page 3(16~23), page n( (n-1)*8 ~ (n*8)-1 )
	var input = '';
	var is_Search = false;//????????????????????????????????????????????????????????????????????
	var is_Condition = false;
	var itemfilter = '';

	//number
	var price_max = '';
	var price_min = '';
	var fee_max = '';
	var fee_min = '';
	var select_evaluation = '';
	var select_bid = '';
	//999999 means unlimited

	if(url.indexOf('?') != -1){//split URL, get var
		if (url.indexOf('price_max') != -1){//has filter

			is_Condition = true;

			if(url.indexOf('search') != -1){//has "search"
				is_Search = true;
				input = url.split('?')[1].split('&')[6].split('=')[1];
				itemfilter = url.split('?')[1].split('&')[7].split('=')[1];
				page = url.split('?')[1].split('&')[8].split('=')[1];
			}
			else{//has "kind"
				kind = url.split('?')[1].split('&')[6].split('=')[1];
				page = url.split('?')[1].split('&')[7].split('=')[1];
				
			}


			price_min = parseInt(url.split('?')[1].split('&')[0].split('=')[1], 10);
			price_max = parseInt(url.split('?')[1].split('&')[1].split('=')[1], 10);
			fee_min = parseInt(url.split('?')[1].split('&')[2].split('=')[1], 10);
			fee_max = parseInt(url.split('?')[1].split('&')[3].split('=')[1], 10);
			select_evaluation = parseInt(url.split('?')[1].split('&')[4].split('=')[1], 10);
			select_bid = parseInt(url.split('?')[1].split('&')[5].split('=')[1], 10);//???   -->  #

			if(isNaN(price_max) && isNaN(price_min) && isNaN(fee_max) && isNaN(fee_min) && select_evaluation == 0 && select_bid == 0){window.history.back();}
			/*if(select_evaluation == 0){}
			if(select_bid == 0){}*/

			if(isNaN(price_max) || price_max < 0)
				price_max = 999999;
			if(isNaN(price_min) || price_min < 0)
				price_min = 999999;
			if(isNaN(fee_max) || fee_max < 0)
				fee_max = 999999;
			if(isNaN(fee_min) || fee_min < 0)
				fee_min = 999999;
		



			if(price_max < price_min){
				var temp = price_max;
				price_max = price_min;
				price_min = temp;
			}
			if(fee_max < fee_min){
				var temp = fee_max;
				fee_max = fee_min;
				fee_min = temp;
			}


			console.log("price_min = " + price_min);
			console.log("price_max = " + price_max);
			console.log("fee_min = " + fee_min);
			console.log("fee_max = " + fee_max);
			console.log("select_evaluation = " + select_evaluation);
			console.log("select_bid = " + select_bid);
			console.log("kind = " + kind);
			console.log("input = " + input);
			console.log("itemfilter = " + itemfilter);
			console.log("page = " + page);

		}
		else{//no filter
			if(url.indexOf('search') != -1){//has 'search'
				is_Search = true;
				input = url.split('?')[1].split('&')[0].split('=')[1];
				itemfilter = url.split('?')[1].split('&')[1].split('=')[1];
				itemfilter = itemfilter.substr(0, itemfilter.length - 1); //itemfilter - #
				page = url.split('?')[1].split('&')[2].split('=')[1];
			}
			else{//has "kind"
				kind = url.split('?')[1].split('&')[0].split('=')[1];
				page = url.split('?')[1].split('&')[1].split('=')[1];
			}
		}


	}

	/// then (filter + search) or (filter + kind), change action, change input value //if condition wrong,  action = "#" ??
	//filter must after (kind or search)

	//shop.html?price_range_max=&price_range_min=&fee_range_max=&fee_range_min=&select_evaluation=0&select_bid=0#&kind=0&page=1      
	//shop.html?price_range_max=&price_range_min=&fee_range_max=&fee_range_min=&select_evaluation=0&select_bid=0#&search=薯條&itemfilter=productname&page=1      

	if(is_Condition){

		if(is_Search){
			var temp = document.getElementById('search');
			temp.value = input;

			var temp_2 = document.getElementById('filter_action');
			temp_2.action = "#&search=" + input + "&itemfilter=" + itemfilter + "&page=" + page;

			if(input === ""){
				alert("Please search something!");
				cant_find(1);
			}
			else{
				//var search_call = search(db, storage, input, itemfilter, page);
				var search_call = search_filter(db, storage, input, itemfilter, page, price_max, price_min, fee_max, fee_min, select_evaluation, select_bid);
			}
		}
		else{//change input value & selected
			var temp = document.getElementById('filter_action');
			temp.action = "#&kind=" + kind + "&page=" + page;

			

			//var products_all = getKindPoducts(db, storage, kind, page);//type: promise
			//console.log('getKindPoducts');
			var products_all = getKindPoducts_filter(db, storage, kind, page, price_max, price_min, fee_max, fee_min, select_evaluation, select_bid);
			//someinput can't work, ex.two fields
			console.log('getKindPoducts_filter');

			
			
		}

		if(price_min != 999999)
			document.getElementById('price_min').value = price_min;

		if(price_max != 999999)
			document.getElementById('price_max').value = price_max;

		if(fee_min != 999999)
			document.getElementById('fee_min').value = fee_min;

		if(fee_max != 999999)
			document.getElementById('fee_max').value = fee_max;
	

		/*if(select_evaluation!=0) // selected 前後端(X)
			document.getElementsByClassName('current').children[select_evaluation-2].setAttribute("selected", "selected");


		if(select_bid!=0)
			document.getElementById('sortByBid').children[select_bid].setAttribute("class", "option selected");*/

	}
	else{//change action
		if(is_Search){
			var temp = document.getElementById('search');
			temp.value = input;


			var temp_2 = document.getElementById('filter_action');
			temp_2.action = "#&search=" + input + "&itemfilter=" + itemfilter + "&page=" + page;

			if(input === ""){
				alert("Please search something!");
				cant_find(1);
			}
			else
				var search_call = search(db, storage, input, itemfilter, page);


		}
		else{
			var temp = document.getElementById('filter_action');
			temp.action = "#&kind=" + kind + "&page=" + page;


			var products_all = getKindPoducts(db, storage, kind, page);//type: promise
			console.log('getKindPoducts');

		}
	}

	document.getElementById("catagories").children[Number(kind)].className = "active";




	



