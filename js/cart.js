var firebase= require("./firebase");
var db = firebase.firestore();
var cookies = getCookie('id');
var User_cookies = 'User' + cookies;
var User = User_cookies + '/';
var cart_size;
var cart_data = [];
var html_r = 0;
var storageRef = firebase.storage().ref();
var cart_url = [];
var html_r = 0;

db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").get().then(product_list => {
    cart_data_t = product_list.data()['Product1'];
    //console.log(cart_data_t);
    cart_data_t.forEach(index => {
        //console.log("data : " + index);
        db.collection('Product').where('product_id', '==', index).get().then(product => {
            if(product.docs[0].data()['state'] != 5){
                //console.log(product.docs[0].data());
                cart_data.push(product.docs[0].data()['product_id']);
                //console.log(cart_data);
                cart_size = cart_data.length;
            }
            //console.log(cart_data_t[cart_data_t.length - 1]);
            if(index == cart_data_t[cart_data_t.length - 1]){
                db.collection('User23').doc(User_cookies).collection('myCart').doc('Cart').update({
                    Product1 : cart_data
                });
                prepare_cart_list(cart_data, cart_size);
            }
        });
    });
    
});

prepare_cart_list = function(cart_data, cart_size){
    html_r = 0;
    var cart_list = document.getElementById('cart_list');
    cart_list.innerHTML = '';
    cart_data.forEach(product_id => {
        //console.log("prepare : " + cart_data);
       
        db.collection('Product').where('product_id', '==', product_id).get().then(product => {
            Cart_Dynamic_HTML(cart_list, product);
        });
    });
}

Cart_Dynamic_HTML = function(cart_list, snapshot){
    html_r++;
    var product_data = snapshot.docs[0].data();
    //console.log(product_data);
    cart_list.innerHTML = cart_list.innerHTML +
                        '<tr>' + 
                            '<td>' +
                                '<input class = "checkbox" onclick="calculate_price()" id="checkbox' + product_data['product_id'] + '" type = "checkbox">' +
                            '</td>' +
                            '<td class="cart_product_img">' +
                                '<img id="img' + product_data['product_id'] + '"src="img/bg-img/cart1.jpg" alt="Product">' +
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
    load_img();
}

load_img = function(){
    
    //console.log("load_img : " + cart_data);
    cart_data.forEach(product_id => {
        //console.log(product_id);
        storageRef.child('Products/' + 'Products' + product_id + '/0').getDownloadURL().then(function(url) {
            var img = document.getElementById('img' + product_id);
            img.src = url;
            cart_url.push(url);
        }).catch(function(error) {
          // Handle any errors
        });
    });
    
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

calculate_price = function(max_page = html_r){
    //console.log("cal : " + cart_data);
    //console.log("cart_size : " + cart_size);
    var tab_total_price = document.getElementById("total_price");
    var total_price = 0;
    for(var i = 0; i < max_page; i++){
        var number = document.getElementById('qty' + cart_data[i]);
        var price = document.getElementById('price' + cart_data[i]);
        var checkbox = document.getElementById('checkbox' + cart_data[i]);
        var checkbox_all = document.getElementById('checkbox_all');
        //console.log(checkbox);
        if(checkbox.checked || checkbox_all.checked){
            total_price = total_price + Number(number.value) * Number(price.textContent);
        }
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
            console.log('cart_size : ' + cart_size);
            //console.log("i : " + i);
            //console.log(cart_data);
            var checkbox = document.getElementById('checkbox' + cart_data[i]);
            
            if(checkbox.checked){
                //console.log("delete : " + cart_data[i]);
                cart_data.splice(i,1);
                cart_size--;
            }else{
                i++;
            }
        }
    }
    //console.log(cart_data);
    db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").update({
        Product1 : cart_data
    });
    prepare_cart_list(cart_data, cart_size);
    //});
}

cart_checkout = function(){
    //db.collection('User23').doc(User_cookies).collection('myCart').doc("Cart").get().then(product_list => {
    //var cart_size = product_list.data()['Product1'].length;
    //var cart_data = product_list.data()['Product1'];
    var cart_cookies = "";
    
    var checkbox_all = document.getElementById('checkbox_all');
    
    for(var i = 0; i < cart_size; i++){
        var checkbox = document.getElementById('checkbox' + cart_data[i]);
        //console.log(cart_data[i]);
        var number = document.getElementById('qty' + cart_data[i]);
        if(checkbox.checked || checkbox_all.checked){
            //cart_data.splice(i,1);
            cart_cookies = cart_cookies + cart_data[i] + "," + number.value + "," + cart_url[i] + "|";
            //cart_size--;
        }
    }
    //console.log(cart_cookies);
    setCookie("Cart_cookie",cart_cookies,1);
    setCookie("isCart",true);
    location.href = "./checkout.html";
    //});
}