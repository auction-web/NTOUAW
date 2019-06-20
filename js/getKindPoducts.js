getKindPoducts = function(db, storage, kind, page){

	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products
	var productQueryRef = productsRef.where('product_kind', '==', Number(kind)).where('state', '==', 0).orderBy('sold', 'desc').get().//order by sold
			then(snapshot => {
        //last = snapshot.docs[snapshot.docs.length - 1];
				product_order('Products', storage, snapshot, page);//product_order(div_id, snapshot, page);

         /*snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          ss = Object.assign({}, doc.data());
          console.log(ss);
         });*/


        var docs = snapshot.docs;
        console.log(docs);
    	})
    	.catch(err => {
      	console.log('Error getting documents', err);

      	cant_find(page);

      				//????
      });

    /*var p1 = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get();
    console.log(p1);
    var p2 = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get().then();
    console.log(p2);*/



} 
  
module.exports = getKindPoducts;
