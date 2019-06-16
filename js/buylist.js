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
var search_itemfilter = '';
var search_input = '';
var item_per_page = 10;

NP_Dynamic_HTML = function(page, snapshot, item, itemfilter){
    var ignore = 0;
    var show = document.getElementById('buylist_t');
    show.innerHTML = ''
    //console.log("Dynamic_HTML");
    //console.log(snapshot);
    //snapshot.size
    max_page = Math.floor(snapshot.size / item_per_page) + 1;
    var page_start = 0;
    var recent_page_item = 0;
    if(item == ''){
        page_start = (Number(page) - 1) * item_per_page;
        recent_page_item = item_per_page * page;
    }
    else{
        for(var i = 0; i < snapshot.size; i++){
            if(ignore == (page - 1) * item_per_page){
                if(page > 1){
                    ignore++;
                }
                page_start = ignore;
                recent_page_item = item_per_page * page;
                ignore = 0;
//                console.log("ignore" +　ignore);
//                console.log(page_start);
//                console.log(recent_page_item);
//                console.log("find search page start");
                break;
            }
            if(snapshot.docs[i].data()[itemfilter].indexOf(item) != -1){
                ignore++;
                //console.log(ignore);
            }
        }
    }
    
    for(var i = page_start; i < recent_page_item;){
        var target = snapshot.docs[i + ignore].data()[itemfilter];
        //console.log(snapshot.docs[i + ignore].data());
        var next = false;
        //console.log(i + ignore);
        if(item == '' && (i + ignore) != snapshot.size){
            ////console.log("next i++");
            next = true;
        }
        else if((i + ignore) == snapshot.size){
            //ignore = ignore + i;
            break;
        }
        else if(String(target).indexOf(item) != -1){
            next = true;
        }
        else if(String(target).indexOf(item) == -1){
            ignore++;
            continue;
        }
        
        //console.log(snapshot.docs[i + ignore].data());
        var buylist_data = snapshot.docs[i + ignore].data();
        //console.log(product_data);
//        var sellerdata = db.collection('User23').doc('User' + buylist_data['buyer_account']).get().then(sldata =>{
//            console.log(sldata.data());
//            
//        });
        //console.log()
        //console.log('buylist');
        
        if(buylist_data['is_Order'] == true){
            var buylist_state;
            //console.log(product_data);
            var evaluate_state = 'disabled';
            var confirm_state = 'disabled';
            var cancel_state = '';
            if(buylist_data['order_state'] == 0){
                buylist_state = '交易處理中';
                confirm_state = '';
            }
            else if(buylist_data['order_state'] == 1){
                buylist_state = '取消申請中';
            }
            else if(buylist_data['order_state'] == 2){
                buylist_state = '已完成';
                if(buylist_data['is_buyer_evaluated']){
                    evaluate_state = 'disabled';
                }
                else{
                    evaluate_state = '';
                }
                
                cancel_state = 'disabled';
            }
            else if(buylist_data['order_state'] == 4){
                buylist_state = '訂單取消';
                cancel_state = 'disabled';
            }
            var date = buylist_data['build_time'].toDate();
            show.innerHTML =  show.innerHTML + '<tr>' +
                                '<td>' +
                                    '<span class = "date">' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<a class = "seller" href = "./listdetail.html?order_id=' + buylist_data['order_id'] + '&isbuyer=1">' + buylist_data['order_id'] + '</a>' +
                                '</td>' +
                                '<td class="price">' +
                                    '<span class = "selfdefine">$' + buylist_data['total_price'] + '</span>' +
                                '</td>' +
                                '<td class="">' +
                                    '<a class = "seller" href = "">' + buylist_data['seller_account'] + '</a>' +
                                '</td>' +
                                '<td class = "">' +
                                    '<span id = "NP_order_state' + buylist_data['order_id'] + '">' + buylist_state + '</span>' +
                                '</td>' +
                                
                                '<td>' +
                                    '<input class = "list_button" id = "NP_cancel' + buylist_data['order_id'] + '" type = "button" onclick = "product_eval_reason(\'NP\', ' + buylist_data['order_id'] + ', 1);" value = "取消訂單" ' + cancel_state + '>' +
                                '</td>' + 
                                '<td>' +
                                    '<input class = "list_button" id = "NP_check' + buylist_data['order_id'] + '" type = "button" onclick = "confirm(' + buylist_data['order_id'] + ')" value = "確認" ' + confirm_state + '>' +
                                '</td>' + 
                                '<td>' +
                                    '<input class = "list_button" id="NP_eval' + buylist_data['order_id'] + '" type = "button" onclick = "product_eval_reason(\'NP\', ' + buylist_data['order_id'] + ', 0);" value = "評價" ' + evaluate_state + '>' +
                                '</td>' +
                            '</tr>'
        }
        if(next){
            i++;
        }
    }
}

NPloadproduct = function(page, item = '', itemfilter = ''){
    search_input = item;
    search_itemfilter = itemfilter;
    var number = 0;
    var user_prod_data = 0;
    //alert("loading");
    //alert(User_cookies);
    user_prod_data = db.collection('User23').doc(User_cookies).collection('iamBuyer').orderBy('build_time', 'desc').where('is_bid', '==', false);
    user_prod_data.get().then(snapshot=>{
        NP_Dynamic_HTML(page, snapshot, item, itemfilter);
    });
    //alert(user_prod_data);
}

NPchangePage = function(page){
    var show = document.getElementById("NPpagination");
    NPloadproduct(page, search_input, search_itemfilter);
    if(page >= 2){
        show.innerHTML = ''

        for(var i = Number(page) - 1; i < page + 3; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="NPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="NPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
    else{
        show.innerHTML = ''
        for(var i = Number(page); i < page + 4; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="NPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="NPchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
}

cancel = function(tab, order_id, state){
    var order_state;
    var check;
    if(tab == 'NP'){
        order_state = document.getElementById('NP_order_state' + order_id);
        check = document.getElementById('NP_check' + order_id);
    }
    else if(tab == 'SL'){
        console.log("SL");
        order_state = document.getElementById('SL_order_state' + order_id);
        check = document.getElementById('SL_check' + order_id);
    }
    if(state == 0){
        console.log('in 0');
        order_state.innerHTML = '交易處理中';
        check.disabled = true;
    }
    else if(state == 1){
        order_state.innerHTML = '取消申請中';
        check.disabled = true;
    }
    else if(state == 4){
        order_state.innerHTML = '訂單取消';
        check.disabled = true;
    }
    console.log(order_state);
    console.log(check);
    db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshop =>{
        snapshop.forEach(product => {
            //increase the quanatity of the product in product
            if(tab == "SL" && state == 4){
                //get products_id in order
                db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshop.docs[0]['id']).collection('Products').get().then(list_product =>{
                    list_product.forEach(list_products_data => {
                        //compare the product_id with product in product
                        db.collection('Product').where('product_id', '==', list_products_data.data()['product_id']).get().then(pro_product => {
                            console.log(pro_product.docs[0].data()['product_quantity']);
                            console.log(list_products_data.data()['product_quantity']);
                            var product_quy = pro_product.docs[0].data()['product_quantity'] + list_products_data.data()['product_quantity'];
                            db.collection('Product').doc(pro_product.docs[0]['id']).update({
                                product_quantity : product_quy
                            }); 
                            console.log(pro_product.docs[0].data());
                            db.collection('User23').where('account', '==', pro_product.docs[0].data()['seller_account']).get().then(seller => {
                                db.collection('User23').doc(seller.docs[0]['id']).collection('iamSeller').where('product_id', '==', list_products_data.data()['product_id']).get().then(seller_product => {
                                    db.collection('User23').doc(seller.docs[0]['id']).collection('iamSeller').doc(seller_product.docs[0]['id']).update({
                                        product_quantity : product_quy
                                    });
                                });
                            });
                        });
                    });
                });
            }
            //console.log(product['id']);
            order_id = product.data()['order_id'];
            seller_account = product.data()['seller_account'];
            db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(product['id']).update({
                order_state : state
            });
            
            db.collection('User23').where('user_name', '==', seller_account).get().then(user => {
                //console.log(user.docs[0]);
                var user_id = user.docs[0]['id'];
                //console.log(user_id);
                db.collection('User23').doc(user_id).collection('iamSeller').where('order_id', '==', order_id).get().then(order => {
                    db.collection('User23').doc(user_id).collection('iamSeller').doc(order.docs[0]['id']).update({
                        order_state : state
                    });
                });
            });
        });
    });
}

confirm = function(order_id){
    db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshop =>{
        snapshop.forEach(product => {
            //change order state
            //console.log(product['id']);
            var confirm_button = document.getElementById('NP_check' + order_id);
            confirm_button.disabled = true;
            var cancel = document.getElementById('NP_cancel' + order_id);
            cancel.disabled = true;
            var order_state = document.getElementById('NP_order_state' + order_id);
            order_state = "已完成";
            var eval_state = document.getElementById('NP_eval' + order_id);
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
                                    console.log(sold);
                                    db.collection('Product').doc(shop_product.docs[0]['id']).update({
                                        sold : sold
                                    });
                                    //user
                                    var seller_account = shop_product.docs[0].data()['seller_account']
                                    db.collection('User23').where('account', '==', seller_account).get().then(seller => {
                                        console.log(seller.docs[0]['id']);
                                        db.collection('User23').doc(seller.docs[0]['id']).collection('iamSeller').where('product_id', '==', list_product_data_id).get().then(user_product => {
                                            var sold = user_product.docs[0].data()['sold'];
                                            sold = sold + list_product_data_quy;
                                            console.log(sold);
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