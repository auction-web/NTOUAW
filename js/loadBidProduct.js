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

var productDetail = new Object();
var sellerDetail = new Object();

//get product id
var aa;
var url = location.href; // product-detail.html
//aa = (url.split('?')[1]).split('=')[1];
aa=32;
var id = "Product" + aa;
console.log('id = ',id);


//get and set data in the product-detail page
(function ($) {

    //initialize firebase
    var firebase = require("./firebase");
    var db = firebase.firestore();

    //get Product detail
    var productRef = db.collection("Product").doc(id).get() 
        .then(doc => {  
//            alert("GET SUCESS.");
                //get data successfully       
                productDetail = doc.data();
                console.log(productDetail);
                //                console.log("product detail = ",productDetail);

                // all product info to String format. 
                var productID = (productDetail.product_id).toString();
                var price = "$" + productDetail.price;
                var productName = productDetail.product_title;
                var critize = "評價:" + productDetail.product_evaluation;
                var intro = productDetail.product_intro;
                var deliveryFee = new Array(3);
                for (var i = 0; i < 3; i++) {
                    if (productDetail.delivery[i] = true) {
                        deliveryFee[i] = "運費$" + productDetail.delivery_fee[i];
                    } else {
                        deliveryFee[i] = "(不支援)"
                    }
                }
                var productRemain = "庫存 : " + productDetail.product_quantity;
                var chooseNumMax = productDetail.product_quantity;
                var choosedQuantity = 1;    //選擇數量預設為1
                var sellerID = productDetail.seller_account;

                //get Seller Detail by sellerID 
                var sellerRef = db.collection("User23");
                var getSellerDoc = sellerRef.where('account', '==', sellerID).get()
                    .then(snapshot => { //get data successfully 
                        snapshot.forEach(doc => {
                            sellerDetail = doc.data();
//                            console.log(doc.id, '=>', sellerDetail);

                            //set seller info in webpage.(using jQuery)
                            $('#sellerName').text(sellerDetail.user_name);
                            $('#sellerPhone').text("電話:" + sellerDetail.phone);
                            $('#sellerCritize').text("評價:" + sellerDetail.seller_evaluation);

                        });
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });

                // set product info in webpage. (using jQuery) 
                $('#price').text(price);
                $('#name').text(productName);
                $('#critize').text(critize);
                $('#intro').text(intro);
                $('#delivery1').text(deliveryFee[0]);
                $('#delivery2').text(deliveryFee[1]);
                $('#delivery3').text(deliveryFee[2]);
                $('#productRemain').text(productRemain);
                $('.qty-plus').click(function () {
                    //根據商品剩餘數設定可選擇的數量上限
                    var effect = document.getElementById('qty');
                    var qty = effect.value;
                    if (!isNaN(qty) & qty < chooseNumMax) {
                        effect.value++;
                        choosedQuantity = effect.value;
                        return false;
                    } else {
                        effect.value = chooseNumMax;
                        choosedQuantity = effect.value;
                    }
                })

                //click "buyNow" button
                $('#buyNow').click(function () {
                    //將商品id, 賣家名稱, 數量製作成cookie
                    createCookie('sellerName',sellerDetail.user_name);
                    createCookie('productName',productName);
                    createCookie('productID',productID);
                    createCookie('productPrice',price);
                    createCookie('quantity',choosedQuantity);
                    createCookie('delievery_payWhenGet',deliveryFee[0]);
                    createCookie('delievery_blackCat',deliveryFee[1]);
                    createCookie('delievery_face',deliveryFee[2]);               
//                    console.log("cookie = {" + document.cookie + "}");
                    location.href = "./checkout.html";
                })

            
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

})(jQuery);//end "get and set data in product detail"

//以下為操作cookie常用的4個function
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