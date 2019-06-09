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

    //--> get info form cookie
    console.log("cookie = ", document.cookie);
    var sellerName = readCookie('sellerName');
    var buyerID = Number(readCookie('id'));
    var productID = Number(readCookie('productID'));
    var productName = readCookie('productName');
    var productPrice = readCookie('productPrice');
    var productPrice_num = Number(productPrice.split('$')[1]);
    var quantity = readCookie('quantity');
    var totalPrice = productPrice_num * Number(quantity);
    var delivery_method1 = readCookie('delievery_payWhenGet');
    var delivery_method2 = readCookie('delievery_blackCat');
    var delivery_method3 = readCookie('delievery_face');
    var delievery_fee_payWhenGet = Number(delivery_method1.split('$')[1]);
    var delievery_fee_blackCat = Number(delivery_method2.split('$')[1]);
    var delievery_fee_face = Number(delivery_method3.split('$')[1]);
    var delievery_final_method = 0; //method[0]:payWhenGet
    var delievery_final_fee = delievery_fee_payWhenGet;
    var sum = totalPrice + delievery_fee_payWhenGet;
    console.log("sum = ", sum);

    //--> set order's info in checkout page
    // seller region
    $('#seller').text("賣家:" + sellerName);
    $('#product-name').text(productName);
    $('#product-price').text(productPrice);
    $('#qty').text(quantity);
    // summery region
    $('#summery-product-price').text(productPrice);
    $('#summery-delievery-fee').text(delievery_fee_payWhenGet);
    $('#summery-sum').text("$" + sum);

    //when click 運送方式列表
    $('#deliveryMethod').change(function () {
        var method = Number($('#deliveryMethod').val());
        //console.log("method = ", method);
        switch (method - 1) {
            case 0:
                delievery_final_method = 0;
                delievery_final_fee = delievery_fee_payWhenGet;
                $('#summery-delievery-fee').text(delivery_method1);
                break;
            case 1:
                delievery_final_method = 1;
                delievery_final_fee = delievery_fee_blackCat;
                $('#summery-delievery-fee').text(delivery_method2);
                break;
            case 2:
                delievery_final_method = 2;
                delievery_final_fee = delievery_fee_face;
                $('#summery-delievery-fee').text(delivery_method3);
                break;
            default:
                console.log("error.");
                break;
        }
        //recaculate the price and sum
        sum = totalPrice + delievery_final_fee;
        $('#summery-sum').text("$" + sum);
    });

    //initialize firebase
    var firebase = require("./firebase");
    var db = firebase.firestore();
    var userRef = db.collection("User23");

    //-->　get seller's and buyer's order ref 
    var sellerOrderRef;
    var buyerOrderRef;
    // find seller's ref by name
    var getSellerRef = userRef.where('user_name', '==', sellerName).get().then(snapshot => { //get data successfully 
            snapshot.forEach(doc => {
                console.log("ref = ", doc.ref.path);
                //--> get seller's path on databasae (ref = User23/User~)
                var sellerRef = (doc.ref.path).split('/')[1]; //get User~
                sellerOrderRef = userRef.doc(sellerRef).collection('iamSeller');
                // how many order already there?
                sellerOrderRef.where('is_Order','==',true)
            });
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    //find buyer's ref by id
    var getBuyerRef = userRef.where('user_id', '==', buyerID).get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log("buyerref = ", doc.ref.path);
            // -->get buyer's path on database
            var buyerRef = (doc.ref.path).split('/')[1];
            buyerOrderRef = userRef.doc(buyerRef).collection('iamBuyer');
        });
    }).catch(err => {
        console.log('Error getting document', err);
    })


    //--> click "checkout confirm" button.
    $('#checkoutConfirm').click(function () {

        //get product's remark
        var productRemark = $('#productRemark').val();
        //get order's build time
        var date = new Date();
        //set order's state = processing
        const processing = 0;

        //create order data
        var OrderDetail = {
            //seller info
            seller_account: sellerName,
            //buyer info
            buyer_account: buyerID,
            //oder info
            is_Order: true,
            is_bid : false,
            order_state: processing,
            build_time: date,
            cancel_reason: "",
            total_price: sum,
        };

        var ProductDetail = {
            //product info
            product_id: productID,
            product_price: productPrice_num,
            product_quantity: Number(quantity),
            delivery: delievery_final_method,
            delivery_fee: delievery_final_fee,
            remark: productRemark,
        }

        //--> write seller's order to firebase
        var setSellerOrder = sellerOrderRef.doc('Order_test_seller').set(OrderDetail);
        var setSellerOrderProducts = sellerOrderRef.doc('Order_test_seller').collection('Products').doc('Product1').set(ProductDetail);

        //--> write buyer's order to firebase
        var setBuyerOrder = buyerOrderRef.doc('Order_test_buyer').set(OrderDetail);
        var setBuyerOrderProducts = buyerOrderRef.doc('Order_test_buyer').collection('Products').doc('Product1').set(ProductDetail);

        //--> wait firebase for few seconds
        alert("交易中，請稍後");
        alert("訂單交易成功! 稍後後將自動跳轉至首頁");
        setTimeout(function () {
            location.href = "./home.html";
        }, 2000);

    }); //end "checkout button" handler

})(jQuery); //end "get and set data in checkout page"


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