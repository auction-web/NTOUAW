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
var page_url = location.href; //本次商品瀏覽的url
ID = (page_url.split('?')[1]).split('=')[1];
var id = "Product" + ID;
console.log('product id = ', id);

//--> 讀取商品瀏覽紀錄的 queue index
var readIndex = readCookie('queue_index');
var index = Number(readIndex);

//--> 是否跟之前瀏覽的有重複商品?
var is_sameAsLastOne;
for (var i = 1; i <= 5; i++) {
    var historyQueueHref = "queue_href_" + i;
    var historyHref = readCookie(historyQueueHref); //上次商品瀏覽的url
    if (page_url == historyHref) {
        is_sameAsLastOne = true; //跟上次瀏覽的是同商品
        console.log('repeat!!!');
        break;
    } else {
        is_sameAsLastOne = false; //跟上次瀏覽的不同商品
    }
}

//--> get and set data in the product-detail page
(function ($) {

    //initialize firebase
    var firebase = require("./firebase");
    var db = firebase.firestore();
    var storage = firebase.storage();

    //variables to store page info
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

    //--> 商品瀏覽紀錄cookie處理 
    //variables to store history cookie's info
    var ckQueueName;
    var ckQueueUrl;
    var ckQueueHref;
    var historyProductNum; // 瀏覽紀錄中的商品數量(不包含這次) 
    var htmlCount = 1; // html element's count
    var historyCount; // last product's index

    // 根據queue index讀取的狀況 對本次商品的index跟cookie名稱做設定 
    if (readIndex == null) { //[情況1]queue為空
        console.log("no index.");
        historyProductNum = 0;
        createCookie('queue_is_full', 'false');

        index = 1;

        ckQueueName = "queue_name_" + index;
        ckQueueUrl = "queue_url_" + index;
        ckQueueHref = "queue_href_" + index;
        index++;
        createCookie('queue_index', index);

    } else { //[情況2]queue不為空
        if (!is_sameAsLastOne) { //商品不重複
            historyCount = index - 1; //從上個商品開始讀瀏覽資料
            ckQueueName = "queue_name_" + index;
            ckQueueUrl = "queue_url_" + index;
            ckQueueHref = "queue_href_" + index;

            if (index == 5) {
                index = 1;
                createCookie('queue_index', index);
                historyProductNum = 5;
                createCookie('queue_is_full', 'true');

            } else {
                index++;
                createCookie('queue_index', index);
                var is_full = readCookie('queue_is_full'); //queue是否已滿?
                if (is_full == 'true') {
                    historyProductNum = 5;
                } else {
                    historyProductNum = index - 1;
                }
            }
        } else { //商品重複
            var is_full = readCookie('queue_is_full'); //queue是否已滿?
            if (is_full == 'true') {
                historyProductNum = 5;
            } else {
                historyProductNum = index - 1;
            }
            historyCount = index - 1; //從這次商品開始讀瀏覽資料
        }
    }

    //--> 讀出queue中的瀏覽資料並寫入html
    //    console.log('product num: ', historyProductNum);
    while (historyProductNum > 0) {
        //從上一個商品開始抓cookie資料
        if (historyCount == 0) { //(若count變0，上一商品index=5)
            historyCount = 5;
        }
        //console.log('product', historyProductNum);
        //        console.log('count', historyCount);

        //set cookie's reading key
        var historyQueueUrl = "queue_url_" + historyCount;
        var historyQueueName = "queue_name_" + historyCount;
        var historyQueueHref = "queue_href_" + historyCount;


        //set html element's id
        var htmlImage = "#historyImage_" + htmlCount;
        var htmlName = "#historyName_" + htmlCount;
        var htmlHref = "#historyHref_" + htmlCount;


        //read name and url from cookie
        var historyUrl = readCookie(historyQueueUrl);
        var historyName = readCookie(historyQueueName);
        var historyHref = readCookie(historyQueueHref);
        //        console.log('historyName', historyName);


        //set name and url into html element
        $(htmlImage).attr("src", historyUrl);
        $(htmlName).html(historyName);
        $(htmlHref).attr("href", historyHref);

        //update index
        htmlCount++;
        historyCount--;

        historyProductNum--;
    } //<-- end 商品瀏覽紀錄cookie處理 


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
            //            console.log('seller name = ', sellerName);

            //--> write product's name & url link into cookie(用於商品瀏覽紀錄) 
            if (!is_sameAsLastOne) { //跟上次瀏覽的為不同商品才寫入
                createCookie(ckQueueName, productName);
                createCookie(ckQueueHref, page_url);
            }

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

            //商品無庫存處理
            if (productDetail.product_quantity <= 0) {
                $('#productRemain').text("很可惜~本商品目前已售完!");
                $('#cart').remove();
                $('#buyNow').remove();
                $('#qty').remove();
                $('#qty_title').remove();
                $('#qty_minus').remove();
                $('#qty_plus').remove();
            } else {
                $('#productRemain').text(productRemain);
            }

            // set product's info in webpage. (using jQuery) 
            $('#price').text(price);
            $('#name').text(productName);
            $('#critize').text(critize);
            $('#intro').text(intro);
            $('#delivery1').text(deliveryFee[0]);
            $('#delivery2').text(deliveryFee[1]);
            $('#delivery3').text(deliveryFee[2]);
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
    var noImageUrl = "img/product-img/no-product-image.jpg";
    for (productImagNum = 0; productImagNum < 4; productImagNum++) {
        //先預設沒有圖片時之預設圖片
        //        console.log("productImagNum: ", productImagNum);
        var imageID = "#image" + productImagNum;
        var slideID = "#slide" + productImagNum;
        var slideImagID = "#slideImag" + productImagNum;
        $(imageID).css("background-image", 'url(' + noImageUrl + ')');
        $(slideID).attr("href", noImageUrl);
        $(slideImagID).attr("src", noImageUrl);
        if (!is_sameAsLastOne) { //跟上次瀏覽的為不同商品才寫入
            createCookie(ckQueueUrl, noImageUrl);
        }
        //讀取firebase中的圖片寫入
        var productImagRef = storage.ref().child('Products/' + productDoc + productImagNum).getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'
            imagNum = (url.split('?')[0]).split('F')[2];
            var imageID = "#image" + imagNum;
            var slideID = "#slide" + imagNum;
            var slideImagID = "#slideImag" + imagNum;
            var imageUrl = "url(\'" + url + "\')";

            // insert url into html element:
            $(imageID).css("background-image", imageUrl);
            $(slideID).attr("href", url);
            $(slideImagID).attr("src", url);

            //--> write productImage[0]'s url into cookie(用於商品瀏覽紀錄)
            if (imagNum == '0') {
                if (!is_sameAsLastOne) { //跟上次瀏覽的為不同商品才寫入
                    createCookie(ckQueueUrl, url);
                }
            }

        }).catch(function (error) { //沒有讀到商品圖片時
            console.log("getting error.");
        });
    } //<-- end load Product's imag.

    //-->find buyer's cart ref 
    var productCartRef;
    var cartProductName;
    var cartProduct;
    var cartProductNum;
    var buyerID = Number(readCookie('id'));
    var userRef = db.collection("User23");
    var getBuyerRef = userRef.where('user_id', '==', buyerID).get().then(snapshot => {
        snapshot.forEach(doc => {
            //            console.log("buyerref = ", doc.ref.path);

            // -->get buyer's cart path on database
            var buyerRef = (doc.ref.path).split('/')[1];
            productCartRef = userRef.doc(buyerRef).collection('myCart').doc('Cart');

            // how many products already in cart?
            productCartRef.get().then(doc => {
                cartProduct = doc.data()['Product1'];
                cartProductNum = cartProduct.length;
                console.log("cart", cartProduct);
                //                console.log("cart num", cartProductNum);

            });

        });
    }).catch(err => {
        console.log('Error getting document', err);
    }); //<-- end find buyer's cart ref 

    //--> click "cart" button
    $('#cart').click(function () {
        //        console.log("click cart.");
        cartProduct.push(Number(productID));
        console.log("cart", cartProduct);

        productCartRef.update({
            Product1: cartProduct
        });
        alert("商品已加入購物車!");
    }); //<-- end click "cart" button

    //--> click "立即購買" button
    $('#buyNow').click(function () {
        //是否為競標商品
        createCookie('isBid',false);
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
    });


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