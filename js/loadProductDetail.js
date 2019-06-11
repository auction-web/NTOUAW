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

//get product id
var ID;
var url = location.href; // product-detail.html
ID = (url.split('?')[1]).split('=')[1];
var id = "Product" + ID;
console.log('product id = ', id);

//get and set data in the product-detail page
(function ($) {

    //initialize firebase
    var firebase = require("./firebase");
    var db = firebase.firestore();
    var storage = firebase.storage();

    //variables to store info
    var productDetail = new Object();
    var sellerDetail = new Object();
    var productID;
    var price;
    var productName;
    var critize;
    var intro;
    var deliveryFee = new Array(3);
    var productRemain;
    var chooseNumMax;
    var choosedQuantity;
    var sellerName;

    //-->　load Product's page info
    var productRef = db.collection("Product").doc(id).get()
        .then(doc => {
            //--> get product's info by id     
            productDetail = doc.data();

            // all product info to String format. 
            productID = (productDetail.product_id).toString();
            price = "$" + productDetail.price;
            productName = productDetail.product_title;
            critize = "評價:" + productDetail.product_evaluation;
            intro = productDetail.product_intro;
            deliveryFee = new Array(3);
            for (var i = 0; i < 3; i++) {
                if (productDetail.delivery[i] = true) {
                    deliveryFee[i] = "運費$" + productDetail.delivery_fee[i];
                } else {
                    deliveryFee[i] = "(不支援)"
                }
            }
            productRemain = "庫存 : " + productDetail.product_quantity;
            chooseNumMax = productDetail.product_quantity;
            choosedQuantity = 1; //選擇數量預設為1
            sellerName = productDetail.seller_account;
            console.log('seller id = ', sellerName);

            //--> get seller's info by sellerName 
            var sellerRef = db.collection("User23");
            var getSellerDoc = sellerRef.where('account', '==', sellerName).get()
                .then(snapshot => { //get data successfully 
                    snapshot.forEach(doc => {
                        sellerDetail = doc.data();
                        var sellerID = "User" + sellerDetail.user_id;

                        //--> load seller's image
                        var sellerImagRef = storage.ref().child('Users/' + sellerID + '/picture').getDownloadURL().then(function (url) {
                            //// `url` is the download URL for 'images/stars.jpg'

                            //insert image into html element:
                            var img = document.getElementById('sellerImage');
                            img.src = url;
                        }).catch(function (error) {
                            console.log("getting error.");
                        }); //<-- end load seller's image

                        //set seller's info in webpage.(using jQuery)
                        $('#sellerName').text(sellerDetail.user_name);
                        $('#sellerPhone').text("電話:" + sellerDetail.phone);
                        $('#sellerCritize').text("評價:" + sellerDetail.seller_evaluation);


                    });
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });



            // set product's info in webpage. (using jQuery) 
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

        })
        .catch(err => {
            console.log('Error getting document', err);
        }); //<-- end loading Product's page info.


    //--> load Product's imag.
    var productDoc = "Products" + ID + '/';
    for (productImagNum = 0; productImagNum < 4; productImagNum++) {
        var productImagRef = storage.ref().child('Products/' + productDoc + productImagNum).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            imagNum = (url.split('?')[0]).split('F')[2];
            var imageID = "#image" + imagNum;
            var slideID = "#slide" + imagNum;
            console.log('slideID id = ', slideID);
            var slideImagID = "#slideImag" + imagNum;
            console.log('slideImagID id = ', slideImagID);
            var imageUrl = "url(\'" + url + "\')";

            // insert url into html element:
            console.log('image id = ', imageID);
            $(imageID).css("background-image", imageUrl);
            $(slideID).attr("href", url);
            $(slideImagID).attr("src", url);

        }).catch(function (error) {
            console.log("getting error.");
        });
    } //<-- end load Product's imag.


    //--> click "立即購買" button
    $('#buyNow').click(function () {
        //將商品id, 賣家名稱, 數量製作成cookie
        createCookie('sellerName', sellerDetail.user_name);
        createCookie('productName', productName);
        createCookie('productID', productID);
        createCookie('productPrice', price);
        createCookie('quantity', choosedQuantity);
        createCookie('delievery_payWhenGet', deliveryFee[0]);
        createCookie('delievery_blackCat', deliveryFee[1]);
        createCookie('delievery_face', deliveryFee[2]);
        //                    console.log("cookie = {" + document.cookie + "}");
        location.href = "./checkout.html";
    })



})(jQuery); //end "get and set data in product detail"

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
//檢查
//console.log(document.cookie);