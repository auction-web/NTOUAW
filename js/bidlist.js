var firebase= require("./firebase");
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
//get cookies
var cookies = getCookie('id');
var User_cookies = 'User' + cookies;
var User = User_cookies + '/';

var url_origun = location.href;
var url = decodeURI(url_origun);
var max_page = 0;
var search_input = '';
var search_itemfilter = '';
var item_per_page = 10;


BP_Dynamic_HTML = function(page, snapshot, item, itemfilter){
    var i_list = [];
    var ignore = 0;
    var show = document.getElementById('bidlist_t');
    show.innerHTML = '';
    max_page = Math.floor(snapshot.size / item_per_page) + 1;
    var page_start = 0;
    var recent_page_item = 0;
    if(item == ''){
        page_start = (Number(page) - 1) * item_per_page;
        recent_page_item = Number(page) * item_per_page;
    }
    else{
        if(Number(page) != 1){
            for(var i = 0; i < snapshot.size; i++){
                //console.log('i : ' + i);
                if(snapshot.docs[i].data()[itemfilter].toString().indexOf(String(item)) != -1){
                    ignore++;
                    if(ignore == (Number(page) - 1) * item_per_page){
                        page_start = i + 1;
                        recent_page_item = i + 1 + item_per_page;
                        break;
                    }
                    //console.log(ignore);
                }
                page_start = i + 1;
                recent_page_item = i + 1 + item_per_page;
            }
        }
        else{
            recent_page_item = Number(page) * item_per_page;
        }
    }
    
    //console.log('ignore : ' + ignore);
    //console.log("max_size : " + snapshot.size);
    if(recent_page_item >= snapshot.size){
        recent_page_item = snapshot.size;
    }
    //console.log('start : ' + page_start);
    //console.log("end : " + recent_page_item);
    ignore = 0;
    for(var i = page_start; i < recent_page_item;){
        if((i + ignore) >= snapshot.size){
            break;
        }
        var target = snapshot.docs[i + ignore].data()[itemfilter];
        var next = false;
        if(item == '' && (i + ignore) != snapshot.size){
            next = true;
        }
        else if(String(target).indexOf(String(item)) != -1){
            next = true;
        }
        else if(String(target).indexOf(String(item)) == -1){
            ignore++;
            continue;
        }
        i_list.push(i+ignore);
        if(next){
            i++;
        }
    }
    //console.log(i_list);
    i_list.forEach(i => {
        db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[i]['id']).collection('Products').get().then(bid_product => {
            //console.log(bid_product.docs[0].data()['product_id']);
            db.collection('Product').where('product_id', '==', bid_product.docs[0].data()['product_id']).get().then(product => {
                var now = new Date();   
                var end = product.docs[0].data()['finish_time'].toDate();
                console.log(end);
                console.log(now);
                
                var product_data = snapshot.docs[i].data();
                //console.log(product);
                var product_state;
                //console.log(product_data);
                var confirm_state = 'disabled';
                var eval_state = 'disabled';
                if(product_data['order_state'] == 0){
                    product_state = '競標進行中';
                }
                else if(product_data['order_state'] == 2){
                    product_state = '已完成';
                    if(!product_data['is_buyer_evaluated']){
                        eval_state = '';
                    }
                }
                else if(product_data['order_state'] == 3){
                    product_state = '得標';
                    confirm_state = '';
                }
                else if(produc_data['order_state'] == 5){
                    product_state = '未得標';
                }
                if(now > end){
                    console.log("change state");
                    if(bid_product.docs[0].data()['product_price'] == product.docs[0].data()['price']){
                        product_state = '得標';
                        confirm_state = '';
                        db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[i]['id']).update({
                            order_state : 3
                        });
                        db.collection('User23').where('User_name', '==', product_data['seller_account']).get().then(seller_id => {
                            
                            db.collection('User23').doc(seller_id.docs[0]['id']).collection('iamSeller').where('order_id', '==', product_data['order_id']).get().then(seller_order => {
                                db.collection('User23').doc(seller_id.docs[0]['id']).collection('iamSeller').doc(seller_order.docs[0]['id']).update({
                                    order_state : 3
                                });
                            });
                        });
                    }
                    else{
                        product_state = '未得標';
                        db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[i]['id']).update({
                            order_state : 5
                        });
                        db.collection('User23').where('user_name', '==', product_data['seller_account']).get().then(seller_id => {
                            console.log(seller_id);
                            db.collection('User23').doc(seller_id.docs[0]['id']).collection('iamSeller').where('order_id', '==', product_data['order_id']).get().then(seller_order => {
                                console.log(seller_order);
                                db.collection('User23').doc(seller_id.docs[0]['id']).collection('iamSeller').doc(seller_order.docs[0]['id']).update({
                                    order_state : 5
                                });
                            });
                        });
                    }
                    
                }
                var date = product_data['build_time'].toDate();
                //console.log(date);
                show.innerHTML = show.innerHTML + '<tr>' +
                                    '<td>' +
                                        '<span class = "date">' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + '</span>' +
                                    '</td>' +
                                    '<td>' +
                                        '<a class = "listID" href = "./listdetail.html?order_id=' + product_data['order_id'] + '&isbuyer=1">' + product_data['order_id'] + '</a>' +
                                    '</td>' +
                                    '<td>' +
                                        '<a class = "listID" href = "./product-bid.html?id=' + bid_product.docs[0].data()['product_id'] +'">' + bid_product.docs[0].data()['product_title'] + '</a>' +
                                    '</td>' +
                                    '<td>' +
                                        '<span class = "selfdefine">' + bid_product.docs[0].data()['product_price'] + '</span>' +
                                    '</td>' +
                                    '<td>' +
                                        '<span class = "quantity">' + bid_product.docs[0].data()['product_quantity'] + '</span>' +
                                    '</td>' +
                                    '<td>' +
                                        '<span class = "selfdefine">' + product.docs[0].data()['price'] + '</span>' +
                                    '</td>' +
                                    '<td>' +
                                        '<a class = "seller" href = "">' + product_data['seller_account'] + '</a>' +
                                    '</td>' +
                                    '<td>' +
                                        '<span id="BP_order_state' + product_data['order_id'] + '">' + product_state + '</span>' +
                                    '</td>' +
                                    '<td>' +
                                        '<input class = "list_button" id = "BP_check' + product_data['order_id'] + '" type = "button" onclick = "BP_confirm(' + product_data['order_id'] + ')" value = "確認" ' + confirm_state + '>' +
                                    '</td>' + 
                                    '<td>' +
                                        '<input class = "list_button" id = "BP_eval' + product_data['order_id'] + '" type = "button" onclick="product_eval_reason(\'BP\', ' + product_data['order_id'] + ', 0);" value = "評價" ' + eval_state + '>' +
                                    '</td>' +
                                '</tr>';
            });
        });
    });
        
        
}

BPloadproduct = function (page, item = '', itemfilter = ''){
    search_input = item;
    search_itemfilter = itemfilter;
    var number = 0;
    var user_prod_data = 0;
    //alert("loading");
    //alert(User_cookies);
    user_prod_data = db.collection('User23').doc(User_cookies).collection('iamBuyer').orderBy('build_time', 'desc').where('is_bid', '==', true);
    user_prod_data.get().then(snapshot=>{
        BP_Dynamic_HTML(page, snapshot, search_input, search_itemfilter);
    });
    
    //alert(user_prod_data);
    
}

BPchangePage = function(page){
    var show = document.getElementById("BPpagination");
    BPloadproduct(page, search_input, search_itemfilter);
    if(page >= 2){
        show.innerHTML = '';
        for(var i = Number(page) - 1; i < page + 3; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="BPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="BPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
    else{
        show.innerHTML = ''
        for(var i = Number(page); i < page + 4; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="BPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="BPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
}

BP_confirm = function(order_id){
    console.log("confirm");
    db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshop =>{
        snapshop.forEach(product => {
            //change order state
            var confirm_button = document.getElementById('BP_check' + order_id);
            confirm_button.disabled = true;
            var order_state = document.getElementById('BP_order_state' + order_id);
            console.log(order_state);
            order_state.textContent = "已完成";
            var eval_state = document.getElementById('BP_eval' + order_id);
            console.log(eval_state);
            eval_state.disabled = false;
            
            order_id = product.data()['order_id'];
            seller_account = product.data()['seller_account'];
            db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(product['id']).update({
                order_state : 2
            });
            
            db.collection('User23').where('user_name', '==', seller_account).get().then(user => {
                var user_id = user.docs[0]['id'];
                db.collection('User23').doc(user_id).collection('iamSeller').where('order_id', '==', order_id).get().then(order => {
                    db.collection('User23').doc(user_id).collection('iamSeller').doc(order.docs[0]['id']).update({
                        order_state : 2
                    });
                    //add sold number
                    db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshot =>{
                        db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[0]['id']).collection('Products').get().then(products => {
                            products.forEach(list_product => {
                                var list_product_data = list_product.data();
                                var list_product_data_id = list_product_data['product_id'];
                                var list_product_data_quy = list_product_data['product_quantity'];
                                //product
                                db.collection('Product').where('product_id', '==', list_product_data_id).get().then(shop_product => {
                                    var sold = shop_product.docs[0].data()['sold'];
                                    sold = sold + list_product_data_quy;
                                    db.collection('Product').doc(shop_product.docs[0]['id']).update({
                                        sold : sold
                                    });
                                    //user
                                    var seller_account = shop_product.docs[0].data()['seller_account']
                                    db.collection('User23').where('account', '==', seller_account).get().then(seller => {
                                        db.collection('User23').doc(seller.docs[0]['id']).collection('iamSeller').where('product_id', '==', list_product_data_id).get().then(user_product => {
                                            var sold = user_product.docs[0].data()['sold'];
                                            sold = sold + list_product_data_quy;
                                            db.collection('User23').doc(seller.docs[0]['id']).collection('iamSeller').doc(user_product.docs[0]['id']).update({
                                                sold : sold
                                            });
                                        });
                                    });
                                    
                                });
                                //console.log(list_product_data);
                            });
                        });
                    });
                });
            });
        });
    });
}