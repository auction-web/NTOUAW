var firebase= require("./firebase");
var db = firebase.firestore();

var cookies = getCookie('id');
var User_cookies = 'User' + cookies;
var User = User_cookies + '/';

product_eval = function(tab, order_id){
    var bidlist_eval = document.getElementById('bidlist_eval');
    bidlist_eval.style.display = "block";
    if(tab == 'NP'){
        db.collection('User23').doc(User_cookies).collection('iamBuyer').doc("Order" + order_id).collection("Products").get().then(snapshot =>{
            Evaluation_Dynamic_HTML(snapshot);
        });
    }
    else if(tab == 'SL'){
        db.collection('User23').doc(User_cookies).collection('iamSeller').doc("Order" + order_id).collection("Products").get().then(snapshot =>{
            Evaluation_Dynamic_HTML(snapshot);
        });
    }
    
    //bidlist_eval.innerHTML = '<div class = "eval_content">Test function</div>';
}

bidlist_eval_close = function(){
    var bidlist_eval = document.getElementById('bidlist_eval');
    bidlist_eval.style.display = "none";
}

Evaluation_Dynamic_HTML = function(snapshot){
    console.log(snapshot);
    console.log(snapshot.size);
    var eval_list = document.getElementById('evallist');
    eval_list.innerHTML = ''
    snapshot.forEach(product => {
        var product_data = product.data()
        console.log(product_data);
        eval_list.innerHTML = '<tr>' +
                                  '<td>' + product_data['product_title'] + '</td>' +
                                  '<td class = \'d-flex\'>' +
                                      '<div class="quantity">' +
                                          '<span class="qty-minus" onclick="minus_point()"><i class="fa fa-minus" aria-hidden="true"></i></span>' +
                                          '<input type="number" class="qty-text" id="point" step="1" min="1" max="300" name="quantity" value="1" disabled>' +
                                          '<span class="qty-plus" onclick="add_point()"><i class="fa fa-plus" aria-hidden="true"></i></span>' + 
                                     '</div>' +
                                  '</td>' +
                              '</tr>' + eval_list.innerHTML
    });
}

add_point = function(){
    var effect = document.getElementById('point');
    var qty = effect.value;
    if( !isNaN( qty ) && qty < 5){
        effect.value++;
        return false;
    } 
}

minus_point = function(){
    var effect = document.getElementById('point');
    var qty = effect.value;
    if( !isNaN( qty ) && qty > 1 ){
        effect.value--;
        return false;
    } 
}