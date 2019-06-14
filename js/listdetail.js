var firebase= require("./firebase");
var db = firebase.firestore();
var show = document.getElementById('table');
var seller_buyer=1;
var check;
var aa;
var url = location.href; // product-detail.html
aa = (url.split('?')[1]).split('&');
var order=Number((aa[0].split('='))[1]);
var input=Number((aa[1].split('='))[1]);
var cook=getCookie('id');
var User1='User'+cook;
var User=User1+'/';
console.log(order);
console.log(input);
if(cook==""){
	alert("請先登入，跳轉至登入頁面");
	location.href = "./index.html";
}
if(input==0){
	check='iamSeller';
}
else{
	check='iamBuyer';
}
show.innerHTML = '';
var user_prod_data = db.collection('User23').doc(User1).collection(check)
	.where('order_id', '==',order).get().then(snapshop =>{
	snapshop.forEach(product => {
			console.log(product['id']);
			db.collection('User23').doc(User1).collection(check).doc(product['id']).collection('Products')
			.get().then(snapshop=>{
				snapshop.forEach(doc=>{
						show.innerHTML=show.innerHTML+'<tr>'+'<td class="cart_product_img">'+
                           '<a href="#"><img src="img/bg-img/cart1.jpg" alt="Product"></a>'+
                      '</td>'+
                      '<td class="cart_product_desc">'+
                           '<h5>'+doc.data()['product_title']+'</h5>'+
                      '</td>'+
                      '<td class="price">'+
                           '<span>'+'$'+doc.data()['product_price']+'</span>'+
                      '</td>'+
                      '<td class="qty">'+
                           '<div class="qty-btn d-flex">'+
								'<p>Qty</p>'+
                                '<div class="quantity">'+
                                    '<input type="number" disabled = "disabled" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1">'+
                                '</div>'+
                           '</div>'+
                      '</td>'+
					  '<td class = "note">'+
                           '<textarea disabled placeholder='+doc.data()['remark']+'></textarea>'+
                      '</td>'+
                '</tr>';
				});
			});
    });
	
	
});


                               