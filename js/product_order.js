product_order = function(id, storage, snapshot, page){//div_id

    var pagination = require("./pagination");
    var rating = require("./rating");
    var fuck = require("./fuck");
    //snapshot.size

	//id for create html tags
	for (var i = (Number(page)-1)*8; i < Number(page)*8; i++){


 		var temp = snapshot.docs[i].data();
		var temp_id = snapshot.docs[i].id;
		console.log(temp_id);
		console.log(temp);
 		//show products....
/*
        var productsRef_1 = storage.ref().child('Products/Products' + temp['product_id'] + '/0').getDownloadURL().then(function(url) {
            console.log(temp['product_id']);   
            var show_img = document.getElementById('product' + temp['product_id'] + '_img1');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img0!!");
        });

        var productsRef_2 = storage.ref().child('Products/Products' + temp['product_id'] + '/1').getDownloadURL().then(function(url) {
            console.log(temp['product_id']);
            var show_img = document.getElementById('product' + temp['product_id'] + '_img2');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img1!!");
        });
*/
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
 		
 		
        if(temp['is_Bid']){// or do stupid
        	var show_1 = document.getElementById('right_text');
        	//var show_1 = document.getElementById('right_text');
 			var div_1 = document.createElement("div");
 			div_1.className = "little-mark cart";
        	div_1.innerHTML = '<a href="" data-toggle="tooltip" data-placement="left" title="Bid Product"><img src="img/core-img/auctionClock.png" alt=""></a>';
        	//show_1.appendChild(div_1);
			show_1.insertBefore(div_1, show_1.children[1]);
                      
        }
        //console.log(temp['product_evaluation']);
        rating(i, temp['product_evaluation']);


 		

        var show_2 = document.getElementById('total_products');
        if(Number(page)*8 >= snapshot.size)
            show_2.innerHTML = '<p class="howamnypages" >Showing ' + ((Number(page)-1)*8+1) + '-' + snapshot.size + ' of ' + snapshot.size + '</p>';
        else
            show_2.innerHTML = '<p class="howamnypages" >Showing ' + ((Number(page)-1)*8+1) + '-' + Number(page)*8 + ' of ' + snapshot.size + '</p>';

        if(((i + 1) % 8 == 0) || (i == snapshot.size - 1)){
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

            pagination(Number(page));
            break;
        }

    

	}
    

/*   for (var a = (Number(page)-1)*8; a < Number(page)*8; a++){

        var temp = snapshot.docs[a].data();

        var productsRef_1 = storage.ref().child('Products/Products' + temp['product_id'] + '/0').getDownloadURL().then(function(url) {
            console.log(a);   
            var show_img = document.getElementById('product' + a + '_img1');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img0!!");
        });

        var productsRef_2 = storage.ref().child('Products/Products' + temp['product_id'] + '/1').getDownloadURL().then(function(url) {
            console.log(i);
            var show_img = document.getElementById('product' + i + '_img2');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img1!!");
        });
    }
*/

/*
        var productsRef_1 = storage.ref().child('Products/Products' + temp['product_id'] + '/0').getDownloadURL().then(function(url) {
            console.log(i);   
            var show_img = document.getElementById('product0_img1');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img0!!");
        });

        var productsRef_1 = storage.ref().child('Products/Products' + temp['product_id'] + '/0').getDownloadURL().then(function(url) {
            console.log(i);   
            var show_img = document.getElementById('product1_img1');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img0!!");
        });

        var productsRef_1 = storage.ref().child('Products/Products' + temp['product_id'] + '/0').getDownloadURL().then(function(url) {
            console.log(i);   
            var show_img = document.getElementById('product2_img1');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + temp['product_id'].toString() + " error get img0!!");
        }); 
*/




}

module.exports = product_order;