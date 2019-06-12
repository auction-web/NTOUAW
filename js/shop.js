
	//var firebase= require("./firebase");
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
	//var pagination = require("./pagination");
	//var sendSearch = require("./sendSearch.js");//

	var db = firebase.firestore();
	var storage = firebase.storage();

	var url_origun = location.href;
	var url = decodeURI(url_origun);

	var kind = '';
	var page = '';//page 1(0~7), page 2(8~15), page 3(16~23), page n( (n-1)*8 ~ (n*8)-1 )
	var input = '';
	var is_Search = false;
	var itemfilter = '';

	//file:///D:/web/NTOUAW-master/shop.html?search=asd&itemfilter=productname#&page=1


	//three kinds of url  1.kind+page 2.search+page    //3.search(home search)
	
	
	//alert(url);

	//if(url.indexOf('kind')==-1)////////////////////////////////////??????????????????????????????????//
	//	return;

	if(url.indexOf('?') != -1){
		if(url.indexOf('search') != -1){
			is_Search = true;
			input = url.split('?')[1].split('&')[0].split('=')[1];
			//input = input.substr(0, input.length - 1); //search
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
		//alert(kind);//search function=> sendSearch()
		//alert('in search');
		/////////////////////////////////////////////////////////////imp in version 2
		/*var e = document.getElementById("sel");
		var str = e.options[e.selectedIndex].value;
		//selectedIndex = 0 or 1 

		if (str == 'productname')
			alert('choose: productname');
		else if (str == 'seller')
			alert('choose: seller');*/

	

		/////////////////////////////////////////////////////////////

		//get by Url or onSubmit????

		//this is on url

		if(input === "")
			alert("Please search something!");
		else
			var search_call = search(db, storage, input, itemfilter, page);

		//search...

		//if(promise)
	}
	else{
		//alert('in kind');

		var products_all = getKindPoducts(db, storage, kind, page);//type: promise
		console.log('getKindPoducts');
		console.log(products_all);
		

		//if(promise)
	}

	document.getElementById("catagories").children[Number(kind)].className = "active";

	//alert('itemfilter: '+itemfilter);
	//alert("is_Search: " + is_Search)
	//alert("kind: " + kind);
	//alert("page: " + page);
	//alert("input: " + input);
	//pagination(Number(page));


	
    

   // product_order(id, snapshot, Number(page)); //id for create html tags//

  	
//search is another func

//module.exports = shop;

	



