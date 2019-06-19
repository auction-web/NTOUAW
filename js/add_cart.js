add_cart = function(id){
	var firebase= require("./firebase");
	var db = firebase.firestore();

	var user_id = getCookie('id');
	var user = 'User' + user_id;

	var cartRef = db.collection('User23').doc(user).collection('myCart').doc('Cart');

	var transaction = db.runTransaction(t => {
	  return t.get(cartRef).then(doc => {
      	//var newCart = doc.data().product_id;//get array, and push
      	var newCart = doc.data().Product1;
  
      	newCart.push(id);

      	//t.update(cartRef, { product_id: newCart });
      	t.update(cartRef, { Product1: newCart });
      });
	}).then(result => {
	  console.log('Transaction success!');
	  alert("成功加入購物車");
	}).catch(err => {
	  console.log('Transaction failure:', err);
	  alert("加入購物車失敗")
	});

}

module.exports = add_cart;