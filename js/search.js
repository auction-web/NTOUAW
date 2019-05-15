search = function(db, input, page){
	//var product_order = require("./product_order");
	//var cant_find= require("./cant_find");


	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products
	var productQueryRef = productsRef.get().then(snapshot => {

				
				var i = 0;

				//if(snapshot.docs[i].data()['product_tile'].indexOf(input) != -1)
				//product_order('Products', snapshot, page);//product_order(div_id, snapshot, page);

      			snapshot.forEach(doc => { //////////////////////////////////////////////////////////// while?? for??
      				//console.log(doc.id, '=>', doc.data());
      				var temp = doc.data();
      				if(temp['product_title'].indexOf(input) != -1){
						console.log(temp);



						var show = document.getElementById('Products');
				 		var div = document.createElement("div");
				 		div.className = "col-12 col-sm-6 col-md-12 col-xl-6";
				    	div.innerHTML = 
				    	'<div class="single-product-wrapper" id = "single_product">' +
				                '<!-- Product Image -->' +
				                '<div class="product-img">' +
				                    '<img src="img/product-img/product1.jpg" alt="">' + 
				                    '<!-- Hover Thumb -->' +
				                    '<img class="hover-img" src="img/product-img/product2.jpg" alt="">' +
				                '</div>' +

				                '<!-- Product Description -->' +
				                '<div class="product-description d-flex align-items-center justify-content-between">' +
				                    '<!-- Product Meta Data -->' +
				                    '<div class="product-meta-data">' +
				                        '<div class="line"></div>' +
				                        '<p class="product-price">$' + temp['price'] + '</p><!-- price -->' +
				                        '<a href="product-details.html?id=' + temp['product_id'] + '"><!--product_detail.html?product_id=xxx -->' +
				                            '<h6>' + temp['product_title'] + '</h6><!-- product_title -->' +
				                        '</a>' +
				                    '</div>' +
				                    '<!-- Ratings & Cart -->' +
				                    '<div class="ratings-cart text-right" id = "right_text">' +
				                        '<div class="ratings"><!-- product_evaluation -->' +
				                        	temp['product_evaluation'] + 
				                            '<i class="fa fa-star" aria-hidden="true"></i>' +
				                            '<i class="fa fa-star" aria-hidden="true"></i>' +
				                            '<i class="fa fa-star" aria-hidden="true"></i>' +
				                            '<i class="fa fa-star" aria-hidden="true"></i>' +
				                            '<i class="fa fa-star" aria-hidden="true"></i>' +
				                        '</div>' +             	
				                        '<div class="little-mark cart" >' +
				                            '<a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""></a>' +
				                        '</div>' +
				                    '</div>' +
				                '</div>' +
				            '</div>' +
				        '</div>';
				        show.appendChild(div);




						i = i + 1;

					}


     	 		});

     	 		var show_1 = document.getElementById('Products');
		 		var div_1 = document.createElement("div");
		 		div_1.className = "pageNumber_down col-12 ";
		 		div_1.innerHTML = '<div class="pageNumber_down col-12 ">' + 
		                '<!-- Pagination -->' + 
		                '<nav aria-label="navigation">' + 
		                    '<ul class="pagination justify-content-end mt-15">' + 
		                        '<li class="page-item active"><a class="page-link" href="javascript:changepage(1);">01.</a></li>' + 
		                        '<li class="page-item"><a class="page-link" href="javascript:changepage(2);">02.</a></li>' + 
		                        '<li class="page-item"><a class="page-link" href="javascript:changepage(3);">03.</a></li>' + 
		                        '<li class="page-item"><a class="page-link" href="javascript:changepage(4);">04.</a></li>' + 
		                    '</ul>' + 
		                '</nav>' + 
		            '</div>';
	            show_1.appendChild(div_1);


     	 		//product_order('Products', temp_query, page);//product_order(div_id, snapshot, page);

     	 		
     	 		console.log(i); //how many products we get in search
     	 	
    		})
    		.catch(err => {

  				console.log('Error getting documents', err);
  				cant_find();

  				//????
    		});//query of "kind_product = kind"
    return productQueryRef;

}

module.exports = search;