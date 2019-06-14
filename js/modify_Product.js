var firebase= require("./firebase");
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
var result = document.getElementById("test"); 
var input = document.getElementById("file_input"); 
var input1 = document.getElementById("file_input1"); 
var input2 = document.getElementById("file_input2"); 
var input3 = document.getElementById("file_input3"); 
if(typeof FileReader==='undefined'){ 
	result.innerHTML = "Sorry, 瀏覽器不支持 FileReader"; 
	input.setAttribute('disabled','disabled'); 
}else{ 
	input.addEventListener('change',readFile,false);
	input1.addEventListener('change',readFile1,false);
	input2.addEventListener('change',readFile2,false);
	input3.addEventListener('change',readFile3,false);
}
var aa;
var url = location.href; // product-detail.html
aa = (url.split('?')[1]).split('=')[1];

//console.log('id = ',aa);
/*var User='User23/';
var User1='User7';
var product_id=45;*/
//console.log(product_id);*/
var product_id=Number(aa);
var cook=getCookie('id');
var User1='User'+cook;
var User=User1+'/';

if(cook==""){
	alert("請先登入，跳轉至登入頁面");
	location.href = "./index.html";
}
//var today=new Date();
//alert(today);


function readFile(){	
	var file = this.files[0]; 
//	alert(this.files.length);
	var reader = new FileReader(); 
	//var bigImg = document.createElement("img");
	reader.readAsDataURL(file); 
	reader.onload = function(e){ 
		//result.innerHTML = '<img src="'+this.result+'" alt="" height="100" />' ;
		//var bigImg = document.createElement("img");
		//bigImg.src=this.result;
		var myDiv = document.getElementById('myDiv'); //获得dom对象
		//myDiv.appendChild(bigImg);
		myDiv.src=this.result;
		//console.log(file);
	} 
	var uploadTask = storageRef.child('Products/'+'Products'+product_id.toString()+'/0').put(file);

	/*storageRef.child('images/12').getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'
	  console.log(url);
	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
		var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();
	  var myDiv = document.getElementById('myDiv'); //获得dom对象
	  // Or inserted into an <img> element:
	  var img = document.createElement('img');
	  img.src = url;
	  myDiv.appendChild(img);
	}).catch(function(error) {
	  // Handle any errors
	});*/
}
function readFile1(){	
	var file = this.files[0]; 
	//alert(this.files.length);
	var reader = new FileReader(); 
	//var bigImg = document.createElement("img");
	reader.readAsDataURL(file); 
	reader.onload = function(e){ 
		//result.innerHTML = '<img src="'+this.result+'" alt="" height="100" />' ;
		//var bigImg = document.createElement("img");
		//bigImg.src=this.result;
		var myDiv1 = document.getElementById('myDiv1'); //获得dom对象
		//myDiv.appendChild(bigImg);
		myDiv1.src=this.result;
		//console.log(file);
	} 
	//var firebase= require("./firebase");
	//var db = firebase.firestore();
	//var storageRef = firebase.storage().ref();
	var Counter = db.collection('Counter').doc('Product');
	var uploadTask = storageRef.child('Products/'+'Products'+product_id.toString()+'/1').put(file);

	/*storageRef.child('images/55').getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'
	  console.log(url);
	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
		var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();
	  var myDiv = document.getElementById('myDiv'); //获得dom对象
	  
	  // Or inserted into an <img> element:
	  var img = document.createElement('img');
	  img.src = url;
	  myDiv.appendChild(img);
	}).catch(function(error) {
	  // Handle any errors
	});*/
}
function readFile2(){	
	var file = this.files[0]; 
	//alert(this.files.length);
	var reader = new FileReader(); 
	//var bigImg = document.createElement("img");
	reader.readAsDataURL(file); 
	reader.onload = function(e){ 
		//result.innerHTML = '<img src="'+this.result+'" alt="" height="100" />' ;
		//var bigImg = document.createElement("img");
		//bigImg.src=this.result;
		var myDiv2 = document.getElementById('myDiv2'); //获得dom对象
		//myDiv.appendChild(bigImg);
		myDiv2.src=this.result;
		//console.log(file);
	} 
	//var firebase= require("./firebase");
	//var db = firebase.firestore();
	//var storageRef = firebase.storage().ref();
	var Counter = db.collection('Counter').doc('Product');
	var uploadTask = storageRef.child('Products/'+'Products'+product_id.toString()+'/2').put(file);

	/*storageRef.child('images/55').getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'
	  console.log(url);
	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
		var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();
	  var myDiv = document.getElementById('myDiv'); //获得dom对象
	  
	  // Or inserted into an <img> element:
	  var img = document.createElement('img');
	  img.src = url;
	  myDiv.appendChild(img);
	}).catch(function(error) {
	  // Handle any errors
	});*/
}
function readFile3(){	
	var file = this.files[0]; 
	//alert(this.files.length);
	var reader = new FileReader(); 
	//var bigImg = document.createElement("img");
	reader.readAsDataURL(file); 
	reader.onload = function(e){ 
		//result.innerHTML = '<img src="'+this.result+'" alt="" height="100" />' ;
		//var bigImg = document.createElement("img");
		//bigImg.src=this.result;
		var myDiv3 = document.getElementById('myDiv3'); //获得dom对象
		//myDiv.appendChild(bigImg);
		myDiv3.src=this.result;
		//console.log(file);
	} 
	//var firebase= require("./firebase");
	//var db = firebase.firestore();
	//var storageRef = firebase.storage().ref();
	var Counter = db.collection('Counter').doc('Product');
	var uploadTask = storageRef.child('Products/'+'Products'+product_id.toString()+'/3').put(file);

	/*storageRef.child('images/55').getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'
	  console.log(url);
	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
		var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();
	  var myDiv = document.getElementById('myDiv'); //获得dom对象
	  
	  // Or inserted into an <img> element:
	  var img = document.createElement('img');
	  img.src = url;
	  myDiv.appendChild(img);
	}).catch(function(error) {
	  // Handle any errors
	});*/
}
var category_element= document.getElementById("category");
var criticize_element= document.getElementById("criticize");
var price_element= document.getElementById("price");
var product_element= document.getElementById("product");
var bidorUnbid_element= document.getElementById("tex");
var introduction_element= document.getElementById("introduction");
var price1_element= document.getElementById("price1");
var price2_element= document.getElementById("price2");
var qty_element= document.getElementById("qty");
var obj=document.getElementById("delivery1");
var citiesRef = db.collection('Product').doc('Product'+product_id.toString());
var getDoc = citiesRef.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
				criticize_element.innerText="評價: "+doc.data()['product_evaluation'];
				category_element.options[doc.data()['product_kind']].selected=true;
				/*category_element.innerHTML = '';
				
				var sel=['','','','','','','','','',''];
				sel[0]='selected';
				category_element.innerHTML='<option value="0"'+sel[0]+' >書籍文具</option>'+
                            '<option value="1"'+sel[1]+' >衣物配飾</option>'+
                            '<option value="2"'+sel[2]+'>廚房用品</option>'+
                            '<option value="3"'+ sel[3]+'>3c週邊</option>'+
                            '<option value="4"'+sel[4]+'>運動用品</option>'+
                            '<option value="5"'+sel[5]+'>美味食品</option>'+
                            '<option value="6"'+sel[6]+'>美妝保養</option>'+
                            '<option value="7"'+sel[7]+'>家俱家電</option>'+
                            '<option value="8"'+sel[8]+'>其他類</option>';*/
				//console.log(category_element.options[category_element.selectedIndex].value);
				price_element.value=doc.data()['price'];
				product_element.value=doc.data()['product_title'];
				var show = document.getElementById('tex');
				show.innerHTML = '';
				var x=doc.data()['is_Bid']?'競標商品':'一般商品';
				show.innerHTML="<p>"+x+'</p>';
					 
				introduction_element.value=doc.data()['product_intro'];	
				if(doc.data()['delivery'][0]==true){
					obj[0].checked=true;
					price1_element.value=doc.data()['delivery_fee'][0];
				}
				if(doc.data()['delivery'][1]==true){
					obj[2].checked=true;
					price2_element.value=doc.data()['delivery_fee'][1];
				}
				if(doc.data()['delivery'][2]==true){
					obj[4].checked=true;
				}
				qty_element.value=doc.data()['product_quantity'];
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
upload =function() {
	storageRef.child('Products/'+'Products'+product_id.toString()+'/0').getDownloadURL().then(function(url) {
	  //// `url` is the download URL for 'images/stars.jpg'
	  // This can be downloaded directly:
//	  var xhr = new XMLHttpRequest();
//	  xhr.responseType = 'blob';
//	  xhr.onload = function(event) {
//		var blob = xhr.response;
//	  };
//	  xhr.open('GET', url);
//	  xhr.send();

	  // Or inserted into an <img> element:
	  var img = document.getElementById('myDiv');
	  img.src = url;
	}).catch(function(error) {
	  // Handle any errors
	});
	storageRef.child('Products/'+'Products'+product_id.toString()+'/1').getDownloadURL().then(function(url) {
	  //// `url` is the download URL for 'images/stars.jpg'
	  // This can be downloaded directly:
//	  var xhr = new XMLHttpRequest();
//	  xhr.responseType = 'blob';
//	  xhr.onload = function(event) {
//		var blob = xhr.response;
//	  };
//	  xhr.open('GET', url);
//	  xhr.send();

	  // Or inserted into an <img> element:
	  var img = document.getElementById('myDiv1');
	  img.src = url;
	}).catch(function(error) {
	  // Handle any errors
	});
	storageRef.child('Products/'+'Products'+product_id.toString()+'/2').getDownloadURL().then(function(url) {
	  //// `url` is the download URL for 'images/stars.jpg'
	  // This can be downloaded directly:
//	  var xhr = new XMLHttpRequest();
//	  xhr.responseType = 'blob';
//	  xhr.onload = function(event) {
//		var blob = xhr.response;
//	  };
//	  xhr.open('GET', url);
//	  xhr.send();

	  // Or inserted into an <img> element:
	  var img = document.getElementById('myDiv2');
	  img.src = url;
	}).catch(function(error) {
	  // Handle any errors
	});
	storageRef.child('Products/'+'Products'+product_id.toString()+'/3').getDownloadURL().then(function(url) {
	  //// `url` is the download URL for 'images/stars.jpg'
	  // This can be downloaded directly:
//	  var xhr = new XMLHttpRequest();
//	  xhr.responseType = 'blob';
//	  xhr.onload = function(event) {
//		var blob = xhr.response;
//	  };
//	  xhr.open('GET', url);
//	  xhr.send();

	  // Or inserted into an <img> element:
	  var img = document.getElementById('myDiv3');
	  img.src = url;
	}).catch(function(error) {
	  // Handle any errors
	});
}
upload();
up=function(){
	
	//var category_element= document.getElementById("category");
	var category = category_element.options[category_element.selectedIndex].value;
	//var price_element= document.getElementById("price");
	var price = price_element.value;
	//var product_element= document.getElementById("product");
	var product = product_element.value;
	
	//var bidorUnbid_element= document.getElementById("bidorUnbid");
	//var bidorUnbid = bidorUnbid_element.options[bidorUnbid_element.selectedIndex].value;
	
	
	//var introduction_element= document.getElementById("introduction");
	var introduction = introduction_element.value;
	//var price1_element= document.getElementById("price1");
	var price1 = price1_element.value;
	//var price2_element= document.getElementById("price2");
	var price2 = price2_element.value;
	//var qty_element= document.getElementById("qty");
	var qty = qty_element.value;
	//var obj=document.getElementById("delivery1");
	var len = obj.length;
	var checked = false;
	if(price.length==0 || product.length==0 || introduction.length==0 || qty.length==0){
		alert("資料尚未完全");
		return;
	}
	for (var i = 0; i < len; i++){
		if (obj[i].checked == true){
			checked = true;
			break;
		}
	} 
	if(checked==false){
		alert("運送方式尚未選擇");
		return;
	}
	if(obj[0].checked == true && price1.length==0){
		alert("貨到付款運費尚未填寫");
		return;
	}
	if(obj[2].checked == true && price2.length==0){
		alert("宅急便運費尚未填寫");
		return;
	}
	/*alert('category'+category+'\nprice'+price
        +'\nproduct'+product+'\nbidorUnbid'+bidorUnbid
		+'\nintroduction'+introduction+'\nprice1'+price1
		+'\nprice2'+price2+'\nqty'+qty
   );  */
   //var firebase= require("./firebase");
   //var db = firebase.firestore();
   var citiesRef = db.collection('Product');
   var Counter = db.collection('Counter').doc('Product');
   var quid;
   var date=new Date();
   var data={delivery:[obj[0].checked == true,obj[2].checked == true,obj[4].checked == true],
   delivery_fee:[Number(price1),Number(price2),0],
   price:Number(price),product_kind:Number(category),product_quantity:Number(qty),product_title:product
   ,product_intro:introduction
   };
   back=function(){
	   alert("修改成功");
	  window.location = "./personal.html";
   }
   seller=function(callback){
	   var Counter = db.collection('User23').doc(User1);
	   citiesRef1 = db.collection('User23').doc(User1).collection('iamSeller');
	   citiesRef.doc('Product'+product_id.toString()).update(data);
		var allCities = citiesRef1.where('product_id', '==',product_id ).get()
			.then(snapshot => {
				   //console.log('ssss');
				   
					snapshot.forEach(doc => {
						//console.log(doc['id']);
						citiesRef1.doc(doc['id']).update(data);
					});	
					callback();
			})
			.catch(err => {
				console.log('Error getting documents', err);
			});	   
   }
   seller(back);
}
