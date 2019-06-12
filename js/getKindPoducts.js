getKindPoducts = function(db, storage, kind, page){
	//var product_order= require("./product_order");
	//var cant_find= require("./cant_find");
  //var firebase = require("./firebase");
  //var ss;// = new db.QuerySnapshot();
  //var last
	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products
	var productQueryRef = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get().//order by sold
			then(snapshot => {
        //last = snapshot.docs[snapshot.docs.length - 1];
				product_order('Products', storage, snapshot, page);//product_order(div_id, snapshot, page);

         /*snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          ss = Object.assign({}, doc.data());
          console.log(ss);
         });*/

          //console.log(ss);
        //out = snapshot.docs;
        //console.log(snapshot)
        var docs = snapshot.docs;
        console.log(docs);
    		})
    		.catch(err => {
      				console.log('Error getting documents', err);

      				cant_find(page);

      				//????
    		});//query of "kind_product = kind"
    //console.log(ss);
    //ss = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get();
    //console.log(productQueryRef);
    //console.log(ss);
    var p1 = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get();
    console.log(p1);
    var p2 = productsRef.where('product_kind', '==', Number(kind)).orderBy('sold', 'desc').get().then();
    console.log(p2);
    //console.log(last);


} 
  
module.exports = getKindPoducts;
