var firebase= require("./firebase");
var db = firebase.firestore();
var cookies = getCookie('id');
var User_cookies = 'User' + cookies;
var User = User_cookies + '/';
var cart_size;
var cart_data;
var html_r = 0;
db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").get().then(product_list => {
    cart_size = product_list.data()['Product1'].length;
    cart_data = product_list.data()['Product1'];
    console.log(cart_data);
    prepare_cart_list(cart_data, cart_size);
});

prepare_cart_list = function(cart_data, cart_size){
    for(var i = 0 ; i < cart_size; i++){
        var cart_list = document.getElementById('cart_list');
        cart_list.innerHTML = '';
        db.collection('Product').where('product_id', '==', cart_data[i]).get().then(product => {
            Cart_Dynamic_HTML(cart_list, product);
        });
    }
}

Cart_Dynamic_HTML = function(cart_list, snapshot){
    html_r++;
    console.log(html_r);
    var product_data = snapshot.docs[0].data();
    cart_list.innerHTML = cart_list.innerHTML +
                        '<tr>' + 
                            '<td>' +
                                '<input class = "checkbox" id="checkbox' + product_data['product_id'] + '" type = "checkbox">' +
                            '</td>' +
                            '<td class="cart_product_img">' +
                                '<a href="#"><img src="img/bg-img/cart1.jpg" alt="Product"></a>' +
                            '</td>' +
                            '<td class="cart_product_desc">' +
                                '<h5>' + product_data['product_title'] + '</h5>' +
                            '</td>' +
                            '<td class="price">' +
                                '<span id="price' + product_data['product_id'] + '">' + product_data['price'] + '</span>' +
                            '</td>' +
                            '<td class="qty">' +
                                '<div class="qty-btn d-flex">' +
                                    '<p>Qty</p>' +
                                    '<div class="quantity">' +
                                        '<span class="qty-minus" onclick="sub_qty(' + product_data['product_id'] + ')"><i class="fa fa-minus" aria-hidden="true"></i></span>' + 
                                        '<input type="number" class="qty-text" id="qty' + product_data['product_id'] + '" step="1" min="1" max="300" name="quantity" value="1">' +
                                        '<span class="qty-plus" onclick="add_qty(' + product_data['product_id'] + ')"><i class="fa fa-plus" aria-hidden="true"></i></span>' +
                                    '</div>' +
                                '</div>' +
                            '</td>' +
                        '</tr>';
    calculate_price(html_r);
}

sub_qty = function(id){
    var effect = document.getElementById('qty' + id);
    var qty = effect.value;
    if( !isNaN( qty ) && qty > 1 ){
        effect.value--;
    } 
    calculate_price();
    return false;
}

add_qty = function(id){
    var effect = document.getElementById('qty' + id);
    var qty = effect.value;
    if( !isNaN( qty )){
        effect.value++;
    }
    calculate_price();
    return false;
}

calculate_price = function(max_product = cart_size){
    var tab_total_price = document.getElementById("total_price");
    var total_price = 0;
    for(var i = 0; i < max_product; i++){
        var number = document.getElementById('qty' + cart_data[i]);
        var price = document.getElementById('price' + cart_data[i]);
        total_price = total_price + Number(number.value) * Number(price.textContent);
    }
    tab_total_price.textContent = total_price + "$";
}

delete_cart = function(){
    //db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").get().then(product_list => {
        //cart_size = product_list.data()['Product1'].length;
        //cart_data = product_list.data()['Product1'];
    var checkbox_all = document.getElementById('checkbox_all');
    if(checkbox_all.checked){
        cart_data = [];
    }
    else{
        for(var i = 0; i < cart_size; ){
            var checkbox = document.getElementById('checkbox' + cart_data[i]);
            if(checkbox.checked){
                cart_data.splice(i,1);
                cart_size--;
            }else{
                i++;
            }
        }
    }
    
    db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").update({
        Product1 : cart_data
    });
    prepare_cart_list(cart_data, cart_size);
    //});
}

checkout = function(){
    //db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").get().then(product_list => {
    //var cart_size = product_list.data()['Product1'].length;
    //var cart_data = product_list.data()['Product1'];
    var cart_cookies = "";
    var checkbox_all = document.getElementById('checkbox_all');
    for(var i = 0; i < cart_size; i++){
        var checkbox = document.getElementById('checkbox' + cart_data[i]);
        var number = document.getElementById('qty' + cart_data[i]);
        if(checkbox.checked || checkbox_all.checked){
            //cart_data.splice(i,1);
            cart_cookies = cart_cookies + cart_data[i] + "," + number.value + "|";
            //cart_size--;

        }
    }
    console.log(cart_cookies);
    setCookie("Cart_cookie",cart_cookies,1);
    setCookie("isCart",true);
    location.href = "./checkout.html";
    //});
}