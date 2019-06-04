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

/*if(url.indexOf('?')!= -1){
   if(url.indexOf('pmpage') != -1){
       
       input = url.split('?')[1].split('=')[1];
       console.log(input);
       console.log("find");
    }
}*/

PMloadproduct = function (page){
    var show = document.getElementById('productlist');
    var number = 0;
    //alert("loading");
    //alert(User_cookies);
    var user_prod_data = db.collection('User23').doc(User_cookies).collection('iamSeller').orderBy('build_time', 'asc');
    //alert(user_prod_data);
    user_prod_data.get().then(snapshot=>{
        show.innerHTML = ''
        console.log("each product");
        //snapshot.size
        max_page = Math.floor(snapshot.size / 3) + 1;
        var recent_page_item = 3 * page;
        if(max_page == page){
            recent_page_item = snapshot.size;
        }
        console.log(max_page);
        for(var i = (Number(page) - 1) * 3; i < recent_page_item; i++){
            console.log(snapshot.docs[i].data());
            var product_data = snapshot.docs[i].data();
            //console.log(product_data);
            if(product_data['is_Order'] == 0){
                var product_state;
                //console.log(product_data);
                if(product_data['state'] == 0){
                    product_state = '販售中';
                }
                else if(product_data['state'] == 5){
                    product_state = '刪除';
                }
                else{
                    product_state = '下架';
                }
                var date = product_data['build_time'].toDate();
                //console.log(date);
                show.innerHTML = '<tr>' +
                                    '<td>' + 
                                        '<span class = "date">' + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + '</span>' +
                                    '</td>' +
                                    '<td>' +
                                        '<a class = "listID" href = "./product-details.html?id=' + product_data['product_id'] +'">' + product_data['product_title'] + '</a>' +
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
                                            '<input type = "submit" class = "modify" value = "修改商品">' +
                                        '</form>' + 
                                        //'<input class = "modify" type = "button" value = "修改商品">' +
                                    '</td>' +
                                    '<td>' +
                                        '<input class = "delete" type = "button" onclick = \'delete_product(' + product_data['product_id'] +');\' value = "刪除">' +
                                    '</td>' +
                                '</tr>' + show.innerHTML
            }
        }
    });
}

delete_product = function(product_id){
    console.log("delete");
    var user_prod_data = db.collection('User23').doc(User_cookies).collection('iamSeller').where('product_id', '==', product_id).get().then(snapshop =>{
        snapshop.forEach(product => {
            //console.log(snapshop[0]);
            //console.log(product['id']);
            db.collection('User23').doc(User_cookies).collection('iamSeller').doc(product['id']).update({
                state : 5
            });
            console.log(product['id']);
        });
    });
}

PMsearch = function(){
    var search = document.getElementsById("PMsearch");
    console.log(search);
}

PMchangePage = function(page){
    var show = document.getElementById("pagination");
    PMloadproduct(page);
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