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
    alert("page loading");
    var sellerName = readCookie('sellerName');
    var productName = readCookie('productName');
    var productPrice = readCookie('productPrice');
    var quantity = readCookie('quantity');
    console.log(document.cookie);

    //set info in checkout page
    $('#seller').text(sellerName);
    $('#product-name').text(productName);
    $('#product-price').text(productPrice);
    $('#qty').text(quantity);
    //  -->summery region
    $('#summery-product-price').text(productPrice);

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