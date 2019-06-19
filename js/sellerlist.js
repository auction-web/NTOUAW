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

SL_Dynamic_HTML = function(page, snapshot, item, itemfilter){
    var ignore = 0;
    var show = document.getElementById('sellerlist_t');
    show.innerHTML = ''
    //snapshot.size
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
                        console.log("page max");
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
    console.log("max_size : " + snapshot.size);
    console.log("recent_page_item : " + recent_page_item);
    if(recent_page_item >= snapshot.size){
        recent_page_item = snapshot.size;
    }
    console.log('start : ' + page_start);
    console.log("end : " + recent_page_item);
    ignore = 0;
    for(var i = page_start; i < recent_page_item;){
        if((i + ignore) == snapshot.size){
            //ignore = ignore + i;
            break;
        }
        var target = snapshot.docs[i + ignore].data()[itemfilter];
        var next = false;
        if(item == '' && (i + ignore) != snapshot.size){
            next = true;
        }
        else if(String(target).indexOf(item) != -1){
            next = true;
        }
        else if(String(target).indexOf(item) == -1){
            ignore++;
            continue;
        }
        
        var sellerlist_data = snapshot.docs[i + ignore].data();
        var sellerlist_state;
        var button_state = 'disabled';
        var eval_button_state = 'disabled';
        if(sellerlist_data['order_state'] == 0){
            sellerlist_state = '交易處理中';
        }
        else if(sellerlist_data['order_state'] == 1){
            sellerlist_state = '取消申請中';
            button_state = '';
        }
        else if(sellerlist_data['order_state'] == 2){
            sellerlist_state = '已完成';
            if(sellerlist_data['is_seller_evaluated']){
                eval_button_state = 'disabled';
            }
            else{
                eval_button_state = '';
            }
        }
        else if(sellerlist_data['order_state'] == 4){
            sellerlist_state = '訂單取消';
        }
        var date = sellerlist_data['build_time'].toDate();
        show.innerHTML = show.innerHTML + '<tr>' + 
                            '<td>' +
                                '<span class = "date">' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<a class = "listID" href = "././listdetail.html?order_id=' + sellerlist_data['order_id'] + '&isbuyer=0">' + sellerlist_data['order_id'] + '</a>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "criticize">' + sellerlist_data['buyer_evaluation'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "price">' + sellerlist_data['total_price'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "d_price">' + sellerlist_data['total_price'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "selfdefine">' + sellerlist_data['buyer_account'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "selfdefine" id = "SL_order_state' + sellerlist_data['order_id'] + '">' + sellerlist_state + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<input class = "list_button" id="SL_eval' + sellerlist_data['order_id'] + '" type = "button"  onclick = "product_eval_reason(\'SL\', ' + sellerlist_data['order_id'] + ', 0);" value = "評價" ' + eval_button_state + '>' +
                            '</td>' +
                            '<td>' +
                                    '<input class = "list_button" id="SL_check' + sellerlist_data['order_id'] + '" type = "button" onclick = "product_eval_reason(\'SL\', ' + sellerlist_data['order_id'] + ', 1)" value = "查看"' + button_state + '>'
                            '</td>' +
                        '</tr>';
            
        if(next){
            i++;
        }
    }
}

find_buyer_name = function(id){
    db.collection('User23').where('user_id', '==', id).get().then(buyer => {
        console.log(buyer.docs[0].data()['user_name']);
        return buyer.docs[0].data()['user_name'];
    });
}

SLloadproduct = function (page, item = '', itemfilter = ''){
    search_input = item;
    search_itemfilter = itemfilter;
    var number = 0;
    var user_prod_data = 0;
    //alert("loading");
    //alert(User_cookies);
    user_prod_data = db.collection('User23').doc(User_cookies).collection('iamSeller').orderBy('build_time', 'desc').where('is_bid', '==', false);
    user_prod_data.get().then(snapshot=>{
        SL_Dynamic_HTML(page, snapshot, search_input, search_itemfilter);
    });
    //alert(user_prod_data);
}

SLchangePage = function(page){
    var show = document.getElementById("SLpagination");
    SLloadproduct(page, search_input, search_itemfilter);
    if(page >= 2){
        show.innerHTML = '';

        for(var i = Number(page) - 1; i < page + 3; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="SLchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="SLchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
    else{
        show.innerHTML = '';
        for(var i = Number(page); i < page + 4; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="SLchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="SLchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
}