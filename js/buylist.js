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
        console.log(snapshot.docs[i + ignore].data());
        var next = false;
        //console.log(i + ignore);
        if(item == '' && (i + ignore) != snapshot.size){
            ////console.log("next i++");
            next = true;
        }
        else if((i + ignore) == snapshot.size){
            ignore = ignore + i;
            break;
        }
        else if(snapshot.docs[i + ignore].data()[itemfilter].indexOf(item) != -1){
            next = true;
        }
        else if(snapshot.docs[i + ignore].data()[itemfilter].indexOf(item) == -1){
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
            var button_state = 'disabled'
            if(buylist_data['order_state'] == 0){
                buylist_state = '交易處理中';
            }
            else if(buylist_data['order_state'] == 1){
                buylist_state = '取消申請中';
            }
            else if(buylist_data['order_state'] == 2){
                buylist_state = '已完成';
                button_state = ''
            }
            else if(buylist_data['order_state'] == 3){
                buylist_state = '競標進行中';
            }
            var date = buylist_data['build_time'].toDate();
            //console.log(date);
            show.innerHTML = '<tr>' +
                                '<td>' +
                                    '<span class = "date">' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + '</span>' +
                                '</td>' +
                                '<td class="price">' +
                                    '<span class = "selfdefine">$' + buylist_data['total_price'] + '</span>' +
                                '</td>' +
                                '<td class="">' +
                                    '<a class = "seller" href = "">' + buylist_data['seller_account'] + '</a>' +
                                '</td>' +
                                '<td class = "">' +
                                    '<span class = "selfdefine">' + buylist_state + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<form action = "./listdetail.html" method = "GET">' +
                                        '<input type = "hidden" name = "product_id" value = "' + buylist_data['order_id'] + '">' +
                                        '<input type = "submit" class = "list_button" value = "訂單詳情">' +
                                    '</form>' + 
                                '</td>' +
                                '<td>' +
                                    '<input class = "list_button" type = "button" onclick = "cancel()" value = "取消訂單">' +
                                '</td>' + 
                                '<td>' +
                                    '<input class = "list_button" type = "button" onclick = "" value = "確認">' +
                                '</td>' + 
                                '<td>' +
                                    '<input class = "list_button" type = "button" onclick = "product_eval(\'NP\', ' + buylist_data['order_id'] + ');" value = "評價" ' + button_state + '>' +
                                '</td>' +
                            '</tr>' + show.innerHTML
        }
        if(next){
            i++;
        }
    }
}

NPloadproduct = function(page, item = '', itemfilter = ''){
    var number = 0;
    var user_prod_data = 0;
    //alert("loading");
    //alert(User_cookies);
    user_prod_data = db.collection('User23').doc(User_cookies).collection('iamBuyer').orderBy('build_time', 'asc').where('is_bid', '==', false);
    user_prod_data.get().then(snapshot=>{
        NP_Dynamic_HTML(page, snapshot, item, itemfilter);
    });
    //alert(user_prod_data);
}

NPchangePage = function(page){
    var show = document.getElementById("NPpagination");
    NPloadproduct(page, search_input);
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

cancel = function(){
    var user_prod_data = db.collection('User23').doc(User_cookies).collection('iamBuyer').where('product_id', '==', product_id).get().then(snapshop =>{
        snapshop.forEach(product => {
            //console.log(snapshop[0]);
            product_title = product.data()['product_title'];
            db.collection('User23').doc(User_cookies).collection('iamBuyer').doc(product['id']).update({
                state : 5
            });
        });
    });
}