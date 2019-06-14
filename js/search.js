search = function(db, storage, input, itemfilter, page){

	var pagination = require("./pagination");
	var productQueryRef;
	var fuck = require("./fuck");

	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products
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
			var i = 0;
  			snapshot.forEach(doc => { 	
  				var temp = doc.data();
  				if(temp['product_title'].indexOf(input) != -1){
  					if( i >=(Number(page)-1)*8 && i <= (Number(page)*8)-1 ){
  					
  						fuck(storage, temp['product_id']);
				
						

						var show = document.getElementById('Products');
						var div = document.createElement("div");
						div.className = "col-12 col-sm-6 col-md-12 col-xl-6";
						div.innerHTML = 
						'<div class="single-product-wrapper" id = "single_product">' +

					            '<!-- Product Image -->' +
					            '<div class="product-img" >' +

					                '<a href="product-details.html?id=' + temp['product_id'] + '"><!--product_detail.html?product_id=xxx -->' +

					               '<img src="img/product-img/product1.jpg"  id="product' + temp['product_id'] + '_img1">' +  
					                '<!-- Hover Thumb -->' +
					                '<img class="hover-img" src="img/product-img/product2.jpg"  id="product' + temp['product_id'] + '_img2">' +  

					                '</a>' + 

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
					                    '<div class="ratings" id = "rating_' + i + '"><!-- product_evaluation -->' +
					                   
					                    '</div>' +             	
					                    '<div class="little-mark cart" >' +
					                        '<a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""></a>' +
					                    '</div>' +
					                '</div>' +
					            '</div>' +
					        '</div>' +
					    '</div>';


						show.appendChild(div);

						
					
				    }

					i = i + 1;


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




 	 		
 	 		console.log(i); //how many products we get in search
 	 		
 	 		pagination(Number(page));
		})
		.catch(err => {

				console.log('Error getting documents', err);
				cant_find(page);

		});//query of "kind_product = kind"
    
	}
	return productQueryRef;
}

module.exports = search;