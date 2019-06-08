//use jsdom to write jQuery in node.js
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
const {
    window
} = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
//console . log ( $ ); //測試jquery是否可以正常工作

//get and set data in checkout page
(function ($) {

    //get info form cookie
    console.log("cookie = ", document.cookie);
    var sellerName = readCookie('sellerName');
    var buyerID = Number(readCookie('id'));
    var productID = Number(readCookie('productID'));
    var productName = readCookie('productName');
    var productPrice = readCookie('productPrice');
    var productPrice_num = Number(productPrice.split('$')[1]);
    var quantity = readCookie('quantity');
    var delivery1 = readCookie('delievery_payWhenGet');
    var delivery2 = readCookie('delievery_blackCat');
    var delivery3 = readCookie('delievery_face');

    var delievery_payWhenGet = Number(delivery1.split('$')[1]);
    var delievery_blackCat = Number(delivery2.split('$')[1]);
    var delievery_face = Number(delivery3.split('$')[1]);
    var totalPrice = productPrice_num * Number(quantity);
    var delievery_final_method = 0; //method[0]:payWhenGet
    var delievery_final_fee = delievery_payWhenGet;
    var sum = totalPrice + delievery_payWhenGet;
    console.log("sum = ", sum);

    //set info in checkout page
    $('#seller').text("賣家:" + sellerName);
    $('#product-name').text(productName);
    $('#product-price').text(productPrice);
    $('#qty').text(quantity);
    //  -->summery region
    $('#summery-product-price').text(productPrice);
    $('#summery-delievery-fee').text(delivery1);
    $('#summery-sum').text("$" + sum);

    //when click 運費選擇選單
    $('#deliveryMethod').change(function () {
        var method = Number($('#deliveryMethod').val());
        //console.log("method = ", method);
        totalPrice = productPrice_num * Number(quantity);
        switch (method - 1) {
            case 0:
                delievery_final_method = 0;
                delievery_final_fee = delievery_payWhenGet;
                $('#summery-delievery-fee').text(delivery1);
                break;
            case 1:
                delievery_final_method = 1;
                delievery_final_fee = delievery_blackCat;
                $('#summery-delievery-fee').text(delivery2);
                break;
            case 2:
                delievery_final_method = 2;
                delievery_final_fee = delievery_face;
                $('#summery-delievery-fee').text(delivery3);
                break;
            default:
                console.log("error.");
                break;
        }
        //recaculate the price and sum
        sum = totalPrice + delievery_final_fee;
        $('#summery-sum').text("$" + sum);
    });


    //--> when click "checkout confirm" button.
    $('#checkoutConfirm').click(function () {
        
        //get product remark
        var productRemark = $('#productRemark').val();
        //get order build time
        var date = new Date();
        //create oder's const
        const processing = 0;
        
        //create seller oder data
        var sellerOderDetail = {
            //seller info
            seller_account: sellerName,
            //buyer info
            buyer_account: buyerID,
            //product info
            product_id: productID,
            product_price: productPrice_num,
            product_quantity: Number(quantity),
            delivery: delievery_final_method,
            delivery_fee: delievery_final_fee,
            remark: productRemark,
            //oder info
            is_Order: true,
            order_state: processing,
            build_time: date,
            cancel_reason: "",
            total_price: sum,
        };
        
        //create buyer order data
        var buyerOrderDetail = {
            
        }

        //--> write seller order to firebase
        //initialize firebase
        var firebase = require("./firebase");
        var db = firebase.firestore();
        var sellerOderRef = db.collection("User23");
        var sellerRef = "";

        //write order to seller doc
        var getSellerRef = sellerOderRef.where('user_name', '==', sellerName).get().then(snapshot => { //get data successfully 
                snapshot.forEach(doc => {
                    console.log("ref = ", doc.ref.path);
                    //--> get path on databasae (ref = User23/User~)
                    sellerRef = (doc.ref.path).split('/')[1]; //get User~
                    sellerOderRef = sellerOderRef.doc(sellerRef).collection('iamSeller');

                    //--> write orderdetail 
                    var setSellerOder = sellerOderRef.doc('Oder_test').set(sellerOderDetail);
                    
                    alert("訂單交易成功! 稍後後將自動跳轉至首頁");
                    setTimeout(function(){location.href = "./home.html"; },1500);
                    
                });
            })
            .catch(err => {
                console.log('Error getting document', err);
            }); //[0].DocumentReference.collection("iamseller");

            alert("交易中，請稍後");
    });

})(jQuery); //end "get and set data in checkout page"

//function jump(){
//     
//}


//cookie創建
function createCookie(name, value, days, path) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
//讀取
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
//刪除
function eraseCookie(name) {
    createCookie(name, "", -1);
}
//檢查
//console.log(document.cookie);