var firebase= require("./firebase");
var db = firebase.firestore();

var cookies = getCookie('id');
var User_cookies = 'User' + cookies;
var User = User_cookies + '/';

product_eval_reason = function(tab, order_id, mode){
    var eval_model = document.getElementById('eval_model');
    eval_model.style.display = "block";
    if(tab == 'NP'){
        if(mode == 0){
            db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshot =>{
                db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[0]['id']).collection('Products').get().then(products => {
                    Evaluation_Dynamic_HTML(products);
                });
            });
            var eval_model_foot = document.getElementById('eval_model_foot_content');
            eval_model_foot.innerHTML = '<input class = "list_button" type = "button" onclick = "eval_confirm(\'NP\', 0,' + order_id + ')" value = "確認">' + 
                            '<input class = "list_button" type = "button" onclick = "eval_model_close()" value = "取消">';
        }
        else if(mode == 1){
            db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshot =>{
                Reason_Dynamic_HTML(snapshot);
            });
            var eval_model_foot = document.getElementById('eval_model_foot_content');
            eval_model_foot.innerHTML = '<input class = "list_button" type = "button" onclick = "eval_confirm(\'NP\', 1,' + order_id + ')" value = "確認">' + 
                            '<input class = "list_button" type = "button" onclick = "eval_model_close()" value = "取消">'
            
        }
        
    }
    else if(tab == 'SL'){
        if(mode == 0){
            
        }
        else if(mode == 1){
            db.collection('User23').doc(User_cookies).collection('iamSeller').where('order_id', '==', order_id).get().then(snapshot =>{
                Reason_Dynamic_HTML(snapshot, 'readonly');
            });
            var eval_model_foot = document.getElementById('eval_model_foot_content');
            eval_model_foot.innerHTML =
            '<input class = "list_button" type = "button" onclick="eval_confirm(\'SL\', 1,' + order_id + ')" value = "同意">' +
            '<input class = "list_button" type = "button" onclick="eval_confirm(\'SL\', 2,' + order_id + ');eval_model_close()" value = "不同意">';
        }
        
    }
    
    //eval_model.innerHTML = '<div class = "eval_content">Test function</div>';
}

eval_model_close = function(){
    var eval_model = document.getElementById('eval_model');
    eval_model.style.display = "none";
    var eval_model_foot_content = document.getElementById('eval_model_body');
    eval_model_body.innerHTML = '<table>' +
                                            '<thead>' +
                                                '<tr>' +
                                                    '<th>商品名稱</th>' +
                                                    '<th>商品評價</th>' +
                                                '</tr>' +
                                            '</thead>' +
                                            '<tbody id = "evallist">'
                                            '</tbody>' +
                                        '</table>';
}

Evaluation_Dynamic_HTML = function(snapshot){
    var eval_list = document.getElementById('evallist');
    eval_list.innerHTML = ''
    snapshot.forEach(product => {
        var product_data = product.data();
        eval_list.innerHTML = '<tr>' +
                                  '<td>' + product_data['product_title'] + '</td>' +
                                  '<td class = \'d-flex\'>' +
                                      '<div class="quantity">' +
                                          '<span class="qty-minus" onclick="minus_point(' + product_data['product_id'] + ')"><i class="fa fa-minus" aria-hidden="true"></i></span>' +
                                          '<input type="number" class="qty-text" id="point' + product_data['product_id'] + '" step="1" min="1" max="5" name="quantity" value="1" disabled>' +
                                          '<span class="qty-plus" onclick="add_point(' + product_data['product_id'] + ')"><i class="fa fa-plus" aria-hidden="true"></i></span>' + 
                                     '</div>' +
                                  '</td>' +
                              '</tr>' + eval_list.innerHTML
    });
}

Reason_Dynamic_HTML = function(snapshot, mode = ''){
    var reason_title = document.getElementById('eval_title');
    reason_title.innerHTML = '訂單取消原因';
    var reason_field = document.getElementById('eval_model_body');
    reason_field.innerHTML = '<textarea class="cancel_reason" id="cancel_reason" placeholder="請填寫取消訂單原因..." id="cancel_reason"' + mode + '>' + snapshot.docs[0].data()['cancel_reason'] + '</textarea>';
}

add_point = function(order_id){
    var effect = document.getElementById('point' + order_id);
    var qty = effect.value;
    if( !isNaN( qty ) && qty < 5){
        effect.value++;
        return false;
    } 
}

minus_point = function(order_id){
    var effect = document.getElementById('point' + order_id);
    var qty = effect.value;
    if( !isNaN( qty ) && qty > 1 ){
        effect.value--;
        return false;
    } 
}

eval_confirm = function(tab ,mode, order_id){
    
    if(tab == 'NP'){
        if(mode == 0){
            var confirm_button = document.getElementById('NP_eval' + order_id)
            confirm_button.disabled = true;
            db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(snapshot =>{
                //update buyer evaluate state
                db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[0]['id']).update({
                    is_buyer_evaluated : true,
                });
                //calculate shop product point 
                db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(snapshot.docs[0]['id']).collection('Products').get().then(products => {
                    
                    for(var i = 0 ; i < products.size; i++){
                        var product_data = products.docs[i].data();
                        var r_point = document.getElementById('point' + product_data['product_id']);
                        //calulate product evaluate point to product
                        db.collection('Product').where('product_id', '==', product_data['product_id']).get().then(shop_product => {
                            var sold = shop_product.docs[0].data()['sold'];
                            var eval = shop_product.docs[0].data()['product_evaluation'];
                            var r_sold = product_data['product_quantity'];
                            
                            var point = (sold * eval + r_point.value * r_sold) / (sold + r_sold);
                            db.collection('Product').doc(shop_product.docs[0]['id']).update({
                                product_evaluation:point.toFixed(1)
                            });
                            //to user
                            db.collection('User23').where('account', '==', shop_product.docs[0].data()['seller_account']).get().then(user => {
                                db.collection('User23').doc(user.docs[0]['id']).collection('iamSeller').where('product_id', '==', product_data['product_id']).get().then(user_product => {
                                    var sold = user_product.docs[0].data()['sold'];
                                    var eval = user_product.docs[0].data()['product_evaluation'];
                                    var r_sold = product_data['product_quantity'];

                                    var point = (sold * eval + r_point.value * r_sold) / (sold + r_sold);
                                    db.collection('User23').doc(user.docs[0]['id']).collection('iamSeller').doc(user_product.docs[0]['id']).update({
                                        product_evaluation:point.toFixed(1)
                                    });
                                });
                            });
                        });
                    }
                    eval_model_close();
                });
            });
        }
        else if(mode == 1){
            var reason = document.getElementById('cancel_reason');
            db.collection('User23').doc(User_cookies).collection('iamBuyer').where('order_id', '==', order_id).get().then(order => {
                db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(order.docs[0]['id']).update({
                    cancel_reason : reason.value
                });
                db.collection('User23').where('user_name', '==', order.docs[0].data()['seller_account']).get().then(user => {
                    db.collection('User23').doc(user.docs[0]['id']).collection('iamSeller').where('order_id', '==', order_id).get().then(order => {
                        db.collection('User23').doc(user.docs[0]['id']).collection('iamSeller').doc(order.docs[0]['id']).update({
                            cancel_reason : reason.value
                        });
                    });
                });
                console.log(order_id);
                cancel('NP', order_id, 1);
                eval_model_close();
            });
        }
    }
    if(tab == 'SL'){
        if(mode == 0){
            console.log("for evaluate");
        }
        else if(mode == 1){
            cancel('SL', order_id, 4);
            eval_model_close();
        }
        else if(mode == 2){
            cancel('SL', order_id, 0);
            eval_model_close();
        }
    }
}