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

// is bid product or not?
var isBid;
if (readCookie('isBid') == 'true') {
    isBid = true;
} else {
    isBid = false;
}

//get and set data in checkout page
(function ($) {

    //--> get info form cookie
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
    console.log("sum = ", sum); //<-- get info from cookie

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

    //--> when click 運送方式列表
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
    }); //<-- when click 運送方式列表

    //initialize firebase
    var firebase = require("./firebase");
    var db = firebase.firestore();
    var userRef = db.collection("User23");

    //-->　get seller's and buyer's order ref 
    var sellerOrderRef;
    var sellerOrderNum;
    var sellerOrderName;
    var buyerOrderRef;
    var buyerOrderNum;
    var buyerOrderName;
    //find seller's ref
    var getSellerRef = userRef.where('user_name', '==', sellerName).get().then(snapshot => { //get data successfully 
            snapshot.forEach(doc => {
                console.log("ref = ", doc.ref.path);

                //--> get seller's path on databasae (ref = User23/User~)
                var sellerRef = (doc.ref.path).split('/')[1]; //get User~
                sellerOrderRef = userRef.doc(sellerRef).collection('iamSeller');
            });
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    //find buyer's ref 
    var getBuyerRef = userRef.where('user_id', '==', buyerID).get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log("buyerref = ", doc.ref.path);

            // -->get buyer's path on database
            var buyerRef = (doc.ref.path).split('/')[1];
            buyerOrderRef = userRef.doc(buyerRef).collection('iamBuyer');

            // how many buyer order already there?
            buyerOrderRef.where('is_Order', '==', true).get().then(snap => {
                buyerOrderNum = snap.size + 1;
                buyerOrderName = 'Order' + buyerOrderNum;
                console.log('buyer order:', buyerOrderName);
            });
        });
    }).catch(err => {
        console.log('Error getting document', err);
    }); //<--　get seller's and buyer's order ref


    //--> click "checkout confirm" button.
    $('#checkoutConfirm').click(function () {

        //get product's remark
        var productRemark = $('#productRemark').val();
        var delieveryAddress = $('#delieveryAddress').val();
        console.log('address = ', delieveryAddress);
        //get order's build time
        var date = new Date();
        //set order's state = processing
        const processing = 0;
        var recent_order_num = 0;
        db.collection('Counter').doc('Order_count').get().then(doc => {
            console.log(doc.data()['count']);
            recent_order_num = doc.data()['count'];
            console.log("order id : " + recent_order_num);
            console.log('is bid?', isBid);
            //create order data
            var OrderDetail = {
                //seller info
                seller_account: sellerName,
                //buyer info
                buyer_account: buyerID,
                buyer_evaluation: 0,
                //oder info
                is_Order: true,
                is_bid: isBid,
                is_buyer_evaluated: false,
                is_seller_evaluated: false,
                order_state: processing,
                order_id: recent_order_num,
                build_time: date,
                cancel_reason: "",
                total_price: sum,
                address: delieveryAddress,
            };
            var ProductDetail = {
                //product info
                product_id: productID,
                product_title: productName,
                product_price: productPrice_num,
                product_quantity: Number(quantity),
                product_evaluation: 0,
                delivery: delievery_final_method,
                delivery_fee: delievery_final_fee,
                remark: productRemark,
            }
            recent_order_num = recent_order_num + 1;
            db.collection('Counter').doc('Order_count').update({
                count: recent_order_num
            });
            //--> write seller's order to firebase
            // how many seller's order already there?
            console.log(sellerOrderRef);
            OrderDetail.order_id = recent_order_num;
            sellerOrderRef.where('is_Order', '==', true).get().then(snap => {
                sellerOrderNum = snap.size + 1;
                sellerOrderName = 'Order' + sellerOrderNum;
                console.log('seller order:', sellerOrderName);

                //write into firebase
                var setSellerOrder = sellerOrderRef.doc(sellerOrderName).set(OrderDetail);
                var setSellerOrderProducts = sellerOrderRef.doc(sellerOrderName).collection('Products').doc('Product1').set(ProductDetail);

            });

            //--> write buyer's order to firebase
            var setBuyerOrder = buyerOrderRef.doc(buyerOrderName).set(OrderDetail);
            var setBuyerOrderProducts = buyerOrderRef.doc(buyerOrderName).collection('Products').doc('Product1').set(ProductDetail);

            // --> update product's amount & price in database.
            var updateProduct = db.collection('Product').where('product_id', '==', productID).get().then(snapshot => {
                snapshot.forEach(doc => {
                    var product = doc.data();
                    var productRef = (doc.ref.path).split('/')[1];

                    //update
                    if (isBid) { //競標商品:更新價格、得標者account
                        db.collection('Product').doc(productRef).update({
                            price: productPrice_num,
                            winner_id: buyerID
                        });
                    } else { //一般商品:更新庫存數量
                        var productAmount = product.product_quantity;
                        productAmount -= Number(quantity);
                        db.collection('Product').doc(productRef).update({
                            product_quantity: productAmount
                        });
                    }

                });
            }).catch(err => {
                console.log('Error getting document', err);
            });


            alert("交易中，請稍後......");
            //--> erase cookie info
            eraseCookie('isBid');
            eraseCookie('sellerName');
            eraseCookie('productName');
            eraseCookie('productID');
            eraseCookie('productPrice');
            eraseCookie('quantity', 1);
            eraseCookie('delievery_payWhenGet');
            eraseCookie('delievery_blackCat');
            eraseCookie('delievery_face');
            setTimeout(function () {
                alert("訂單交易成功! 按下確認將自動跳轉至首頁");
                location.href = "./home.html";
            }, 2000);
        });


    }); //<-- "checkout button" handler

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