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
    console.log("Dynamic_HTML");
    console.log(snapshot);
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
                console.log(ignore);
            }
        }
    }
    
    for(var i = page_start; i < recent_page_item;){
        var next = false;
        console.log(i + ignore);
        if(item == '' && (i + ignore) != snapshot.size){
            console.log("next i++");
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
        
        console.log(snapshot.docs[i + ignore].data());
        var sellerlist_data = snapshot.docs[i + ignore].data();
        //console.log(product_data);
        var sellerlist_state;
        var button_state = 'disabled';
        //console.log(product_data);
        if(sellerlist_data['order_state'] == 0){
            sellerlist_state = '交易處理中';
        }
        else if(sellerlist_data['order_state'] == 1){
            sellerlist_state = '取消申請中';
            button_state = '';
        }
        else if(sellerlist_data['order_state'] == 2){
            sellerlist_state = '已完成';
        }
        else if(sellerlist_data['order_state'] == 3){
            sellerlist_state = '競標進行中';
        }
        var date = sellerlist_data['build_time'].toDate();
        //console.log(date);
        show.innerHTML = '<tr>' + 
                            '<td>' +
                                '<span class = "date">' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<a class = "listID" href = "">123456</a>' +
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
                                '<a class = "buyer" href = "">' + sellerlist_data['buyer_account'] + '</a>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "selfdefine">' + sellerlist_state + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<input class = "list_button" type = "button" value = "評價">' +
                            '</td>' +
                            '<td>' +
                                '<input class = "list_button" type = "button" value = "同意"' + button_state + '>' +
                                '<input class = "list_button" type = "button" value = "不同意"' + button_state + '>' +
                            '</td>' +
                        '</tr>' + show.innerHTML;
        if(next){
            i++;
        }
    }
}

SLloadproduct = function (page, item = ''){
    var number = 0;
    var user_prod_data = 0;
    //alert("loading");
    //alert(User_cookies);
    user_prod_data = db.collection('User23').doc(User_cookies).collection('iamSeller').orderBy('build_time', 'asc').where('is_Order', '==', true);
    user_prod_data.get().then(snapshot=>{
        SL_Dynamic_HTML(page, snapshot, item);
    });
    //alert(user_prod_data);
}

SLchangePage = function(page){
    var show = document.getElementById("SLpagination");
    SLloadproduct(page, search_input);
    if(page >= 2){
        show.innerHTML = ''

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
        show.innerHTML = ''
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