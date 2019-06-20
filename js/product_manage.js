var firebase= require("./firebase");
var db = firebase.firestore();
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


PM_Dynamic_HTML = function(page, snapshot, item, itemfilter){
    //console.log(itemfilter);
    var ignore = 0;
    var show = document.getElementById('productlist');
    show.innerHTML = ''
    //console.log("Dynamic_HTML");
    //console.log(snapshot);
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
//        console.log(i + ignore);
//        console.log(snapshot.size);
//        console.log(snapshot.docs[i + ignore].data()['product_title']);
        var next = false;
        if(item == '' && (i + ignore) != snapshot.size){
            //console.log("next i++");
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
        //console.log(snapshot.docs[i + ignore].data()['product_title']);
        //console.log(snapshot.docs[i + ignore].data());
        var product_data = snapshot.docs[i + ignore].data();
        //console.log(product_data);
        var product_state;
        //console.log(product_data);
        if(product_data['state'] == 0){
            product_state = '販售中';
        }
        else if(product_data['state'] == 5){
            product_state = '刪除';
            ignore++;
            continue
        }
        else{
            product_state = '下架';
        }
        var product_info = 'product-details';
        if(product_data['is_Bid']){
            product_info = 'product-bid'
        }
        var date = product_data['build_time'].toDate();
        //console.log(date);
        show.innerHTML = show.innerHTML + '<tr>' +
                            '<td>' + 
                                '<span class = "date">' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<a class = "listID" href = "./' + product_info + '.html?id=' + product_data['product_id'] +'">' + product_data['product_title'] + '</a>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "bid">' + product_data['is_Bid'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "price">' + product_data['price'] + '$</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "quantity">' + product_data['product_quantity'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "d_price">' + product_data['delivery_fee'] + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span class = "status">' + product_state + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<form action = "./modify_Product.html" method = "GET">' +
                                    '<input type = "hidden" name = "product_id" value = "' + product_data['product_id'] + '">' +
                                    '<input type = "submit" class = "list_button" value = "修改商品">' +
                                '</form>' + 
                                //'<input class = "modify" type = "button" value = "修改商品">' +
                            '</td>' +
                            '<td>' +
                                '<input class = "list_button" type = "button" onclick = \'delete_product(' + product_data['product_id'] +');\' value = "刪除">' +
                            '</td>' +
                        '</tr>'
        if(next){
            i++;
        }
    }
}

PMloadproduct = function (page, item = '', itemfilter = ''){
    search_input = item;
    search_itemfilter = itemfilter;
    var number = 0;
    var user_prod_data = 0;
    //alert("loading");
    //alert(User_cookies);
    user_prod_data = db.collection('User23').doc(User_cookies).collection('iamSeller').orderBy('build_time', 'desc').where('is_Order', '==', false);
    user_prod_data.get().then(snapshot=>{
        //console.log(snapshot);
        PM_Dynamic_HTML(page, snapshot, item, itemfilter);
    });
    
    //alert(user_prod_data);
    
}

delete_product = function(product_id){
    //console.log("delete");
    var product_title = "";
    var user_prod_data = db.collection('User23').doc(User_cookies).collection('iamSeller').where('product_id', '==', product_id).get().then(snapshop =>{
        snapshop.forEach(product => {
            //console.log(snapshop[0]);
            product_title = product.data()['product_title'];
            db.collection('User23').doc(User_cookies).collection('iamSeller').doc(product['id']).update({
                state : 5
            });
            db.collection('Product').where('product_title', '==', product_title).get().then(snapshop =>{
                snapshop.forEach(product => {
                    //console.log(snapshop[0]);
                    //console.log(product['id']);
                    db.collection('Product').doc(product['id']).update({
                        state : 5
                    });
                });
            });
            PMloadproduct(1);
            //console.log(product['id']);
        });
    });
}

PMchangePage = function(page){
    var show = document.getElementById("PMpagination");
    PMloadproduct(page, search_input, search_itemfilter);
    if(page >= 2){
        show.innerHTML = ''

        for(var i = Number(page) - 1; i < page + 3; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="PMchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="PMchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
    else{
        show.innerHTML = ''
        for(var i = Number(page); i < page + 4; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="PMchangePage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="PMchangePage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
}