search_filter = function(db, storage, input, itemfilter, page, price_max, price_min, fee_max, fee_min, select_evaluation, select_bid){

	var loadimg = require("./loadimg");
	var pagination = require("./pagination");
	var cant_find = require("./cant_find");
	var rating = require("./rating");
	var productQueryRef;
	

	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products

	if(price_max == 999999 && price_min == 999999)
    	{}
	else{
		if(price_max == price_min)
		  productsRef = productsRef.where('price', '==', price_min);
		else
		  productsRef = productsRef.where("price", ">=", price_min).where("price", "<=", price_max);
	}

	if(fee_max == 999999 && fee_min == 999999)//add a attribute?? order??
		{}
	else{
		if(fee_max == fee_min)
		  productsRef = productsRef.where('delivery_fee', '==', fee_min);
		else
		  productsRef = productsRef.where("delivery_fee", ">=", fee_min).where("delivery_fee", "<=", fee_max);
	}

	if(select_evaluation != 0)
		productsRef = productsRef.where("product_evaluation", ">=", select_evaluation);

	if(select_bid != 0){
		if(select_bid == 1)
		  productsRef = productsRef.where('is_Bid', '==', false);
		else if(select_bid == 2)
		  productsRef = productsRef.where('is_Bid', '==', true);
	}

	if(itemfilter == 'seller'){
		productQueryRef = productsRef.where('seller_account', '==', input).get()//???
		.then(snapshot => {
			product_order('Products', storage, snapshot, page);
		})
		.catch(err => {
			console.log('Error getting documents', err);
			cant_find(page);
		});
	}
	else{
		productQueryRef = productsRef.get().then(snapshot => {
			var total = 0; //also equal to total searched index
			var showing = 0;// showing products index
  			snapshot.forEach(doc => { 	
  				var temp = doc.data();
  				if(temp['product_title'].indexOf(input) != -1){
  					if( total >=(Number(page)-1)*8 && total <= (Number(page)*8)-1 ){
  					
  						loadimg(storage, temp['product_id']);
				

						var show = document.getElementById('Products');
						var div = document.createElement("div");
						div.className = "col-12 col-sm-6 col-md-12 col-xl-6";
						div.innerHTML = 
						'<div class="single-product-wrapper" id = "single_product">' +

					            '<!-- Product Image -->' +
					            '<div class="product-img" >' +

					                '<a href="product-details.html?id=' + temp['product_id'] + '" id = "product' + total + '_link1"><!--product_detail.html?product_id=xxx -->' +

					               '<img src="img/product-img/no-product-image.jpg"  id="product' + temp['product_id'] + '_img1">' +  
					                '<!-- Hover Thumb -->' +
					                '<img class="hover-img" src="img/product-img/no-product-image.jpg"  id="product' + temp['product_id'] + '_img2">' +  

					                '</a>' + 

					            '</div>' +


					            '<!-- Product Description -->' +
					            '<div class="product-description d-flex align-items-center justify-content-between">' +
					                '<!-- Product Meta Data -->' +
					                '<div class="product-meta-data">' +
					                    '<div class="line"></div>' +
					                    '<p class="product-price">$' + temp['price'] + '</p><!-- price -->' +
					                    '<a href="product-details.html?id=' + temp['product_id'] + '" id = "product' + total + '_link2"><!--product_detail.html?product_id=xxx -->' +
					                        '<h6>' + temp['product_title'] + '</h6><!-- product_title -->' +
					                    '</a>' +
					                '</div>' +
					                '<!-- Ratings & Cart -->' +
					                '<div class="ratings-cart text-right" id = "right_text_'+ total + '">' +
					                    '<div class="ratings" id = "rating_' + total + '"><!-- product_evaluation -->' +
					                   
					                    '</div>' +             	
					                    '<div class="little-mark cart" >' +
					                        '<a href="javascript:void(0)" onclick="add_cart(' + temp['product_id'] + ');" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""></a>' +
					                    '</div>' +
					                '</div>' +
					            '</div>' +
					        '</div>' +
					    '</div>';


						show.appendChild(div);

						if(temp['is_Bid']){// or do stupid
				        	var show_1 = document.getElementById('right_text_' + total);
				        	//var show_1 = document.getElementById('right_text');
				 			var div_1 = document.createElement("div");
				 			div_1.className = "little-mark cart";
				        	div_1.innerHTML = '<img src="img/core-img/auctionClock.png" alt="">';
				        	//show_1.appendChild(div_1);
							show_1.insertBefore(div_1, show_1.children[1]);

				            var show_2 = document.getElementById('product' + total + '_link1');
				            var show_3 = document.getElementById('product' + total + '_link2');

				            show_2.href = "product-bid.html?id=" + temp['product_id'];
				            show_3.href = "product-bid.html?id=" + temp['product_id'];
				                      
       					}

						rating(total, temp['product_evaluation']);

						showing = showing + 1;
					
				    }

					total = total + 1;


				}
				//if(i >= 8)
				//	return true; //can break from forEach
				

 	 		});

 	 		var show_1 = document.getElementById('Products');
	 		var div_1 = document.createElement("div");
	 		div_1.className = "pageNumber_down col-12 ";
	 		div_1.innerHTML = '<div class="pageNumber_down col-12 ">' + 
	                '<!-- Pagination -->' + 
	                '<nav aria-label="navigation">' + 
	                    '<ul class="pagination justify-content-end mt-15" id = "pagination_bottom">' + 
	               
	                    '</ul>' + 
	                '</nav>' + 
	            '</div>';
            show_1.appendChild(div_1);




 	 		
 	 		console.log(total); //how many products we get in search

 	 		if(showing == 0)
 	 			cant_find(page);
 	 		else
 	 		{
	 	 		//how many product we got
		        var show_2 = document.getElementById('total_products');
		        if(Number(page)*8 >= total)
		            show_2.innerHTML = '<p class="howamnypages" >Showing ' + ((Number(page)-1)*8+1) + '-' + showing + ' of ' + total + '</p>';
		        else
		            show_2.innerHTML = '<p class="howamnypages" >Showing ' + ((Number(page)-1)*8+1) + '-' + Number(page)*8 + ' of ' + total + '</p>';
	    	}	


	 	 		
	 	 	pagination(Number(page));

		})
		.catch(err => {

				console.log('Error getting documents', err);
				cant_find(page);

		});//query of "kind_product = kind"
    
	}
	return productQueryRef;
}

module.exports = search_filter;