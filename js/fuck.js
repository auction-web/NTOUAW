fuck = function(storage, id){


        var productsRef_1 = storage.ref().child('Products/Products' + id + '/0').getDownloadURL().then(function(url) {
            console.log(id);   
            var show_img = document.getElementById('product' + id + '_img1');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + id + " error get img0!!");
        });

        var productsRef_2 = storage.ref().child('Products/Products' + id + '/1').getDownloadURL().then(function(url) {
            console.log(id);
            var show_img = document.getElementById('product' + id + '_img2');
            show_img.src = url;

        }).catch(function(){
            console.log('Products ' + id + " error get img1!!");
        });

} 
  
module.exports = fuck;
