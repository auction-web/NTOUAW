getKindPoducts_filter = function(db, storage, kind, page, price_max, price_min, fee_max, fee_min, select_evaluation, select_bid){

	var productsRef = db.collection('Product');/////////////////////!!!!!!!!!!!!!!!!!!!!!!!Products

  if(price_max == 999999 && price_min == 999999)
    {}
  else{
    if(price_max == price_min)
      productsRef = productsRef.where('price', '==', price_min);
    else
      productsRef = productsRef.where("price", ">=", price_min).where("price", "<=", price_max);
  }

  if(fee_max == 999999 && fee_min == 999999)//add a attribute?? order??
    {}
  else{
    if(fee_max == fee_min)
      productsRef = productsRef.where('delivery_fee', '==', fee_min);
    else
      productsRef = productsRef.where("delivery_fee", ">=", fee_min).where("delivery_fee", "<=", fee_max);
  }

  if(select_evaluation != 0)
    productsRef = productsRef.where("product_evaluation", ">=", select_evaluation);

  if(select_bid != 0){
    if(select_bid == 1)
      productsRef = productsRef.where('is_Bid', '==', false);
    else if(select_bid == 2)
      productsRef = productsRef.where('is_Bid', '==', true);
  }



	var productQueryRef = productsRef.where('product_kind', '==', Number(kind)).get().//order by sold
			then(snapshot => {
        
				product_order('Products', storage, snapshot, page);

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
  
module.exports = getKindPoducts_filter;
