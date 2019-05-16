getKindPoducts = function(db, storage, kind, page){
	//var product_order= require("./product_order");
	//var cant_find= require("./cant_find");


	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products
	var productQueryRef = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get().//order by sold
			then(snapshot => {

				product_order('Products', storage, snapshot, page);//product_order(div_id, snapshot, page);

      			/*snapshot.forEach(doc => {
      				console.log(doc.id, '=>', doc.data());
     	 		});*/

     	 		

     	 	
    		})
    		.catch(err => {
      				console.log('Error getting documents', err);

     
      				cant_find();

			       

      				//????
    		});//query of "kind_product = kind"
    return productQueryRef;

}

module.exports = getKindPoducts;
