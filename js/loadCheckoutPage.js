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
//    console.log(document.cookie);
//    alert("page loading");  
    console.log("cookie = ",document.cookie);
    var sellerName = readCookie('sellerName');
    var productName = readCookie('productName');
    var productPrice = readCookie('productPrice');
    var quantity = readCookie('quantity');
    var delivery1 = readCookie('delievery_payWhenGet');
    var delivery2 = readCookie('delievery_blackCat');
    var delivery3 = readCookie('delievery_face');
    
    var delievery_payWhenGet = Number(delivery1.split('$')[1]);
    var delievery_blackCat = Number(delivery2.split('$')[1]);
    var delievery_face = Number(delivery3.split('$')[1]); 
    var totalPrice = Number(productPrice.split('$')[1]) * Number(quantity); 
    var sum = totalPrice + delievery_payWhenGet;
    console.log("sum = ",sum);
    
    //set info in checkout page
    $('#seller').text("賣家:"+sellerName);
    $('#product-name').text(productName);
    $('#product-price').text(productPrice);
    $('#qty').text(quantity);
    //  -->summery region
    $('#summery-product-price').text(productPrice);
    $('#summery-delievery-fee').text(delivery1);
    $('#summery-sum').text("$"+sum);
    
    //when click 運費選擇選單
    $('#deliveryMethod').change(function () {
        var method = $('#deliveryMethod').val();
        console.log("method = ",method);
        totalPrice = Number(productPrice.split('$')[1]) * Number(quantity); 
        switch (method) {
            case "1":
                $('#summery-delievery-fee').text(delivery1);
                sum = totalPrice + delievery_payWhenGet;
                $('#summery-sum').text("$" + sum);
                break;
            case "2":
                $('#summery-delievery-fee').text(delivery2);
                sum = totalPrice + delievery_blackCat;
                $('#summery-sum').text("$" + sum);
                break;
            case "3":
                $('#summery-delievery-fee').text(delivery3);
                sum = totalPrice + delievery_face;
                $('#summery-sum').text("$" + sum);
                break;
            default:
                console.log("error.");
                break;
        }
    });

    //when click "checkout confirm" button.
    $('#checkoutConfirm').click(function () {

        alert("訂單已成立! 按下確定返回商店頁面");
        location.href = "./home.html";
    });

})(jQuery);//end "get and set data in checkout page"

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