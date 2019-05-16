query=function(db,dir,id,data){
	var cityRef = db.collection('Counter').doc(id);
	var quid;
	var getDoc = cityRef.get()
		.then(doc => {
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			console.log('Document data:', doc.data());
		}
				quid=doc.data()['id'];
				cityRef.set({
					id: quid+1
				});	
				data['user_id']=quid;
				data['cart_id']=quid;
				//console.log(data);
				dir.doc(id+quid.toString()).set(data);
				
				//alert("asas");
				cityRef.collection('iamBuyer').doc('Bid1');
				cityRef.collection('iamBuyer').doc('Order1');
				dir.doc(id+quid.toString()).collection('iamSeller').doc('Order1').set({order_id:1});
				dir.doc(id+quid.toString()).collection('iamSeller').doc('Product1').set({Product1:1});
				dir.doc(id+quid.toString()).collection('myCart').doc('Cart').set({Product1:[1,2]});
			
		})
		.catch(err => {
		console.log('Error getting document', err);
	});

   // window.location = "./index.html";
}

module.exports = query;