var firebase= require("./firebase");
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
var result = document.getElementById("test"); 
var input = document.getElementById("file_input"); 
var input1 = document.getElementById("file_input1"); 
var input2 = document.getElementById("file_input2"); 
var input3 = document.getElementById("file_input3"); 
var input4 = document.getElementById("file_input4"); 
if(typeof FileReader==='undefined'){ 
	result.innerHTML = "Sorry, 瀏覽器不支持 FileReader"; 
	input.setAttribute('disabled','disabled'); 
}else{ 
	input.addEventListener('change',readFile,false);
	input1.addEventListener('change',readFile1,false);
	input2.addEventListener('change',readFile2,false);
	input3.addEventListener('change',readFile3,false);
	input4.addEventListener('change',readFile4,false);
}
//var User='User7/';
//var User1='User7';
var cook=getCookie('id');
var User1='User'+cook;
var User=User1+'/';

if(cook==""){
	alert("請先登入，跳轉至登入頁面");
	location.href = "./index.html";
}

 del=function(){
	   var Counter = db.collection('Counter').doc('Product');
	   var getDoc = Counter.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
					quid=doc.data()['id'];
					'Products/'+'Products'+quid.toString()+'/0'
					var desertRef = storageRef.child('Products/'+'Products'+quid.toString()+'/0');
					var desertRef1 = storageRef.child('Products/'+'Products'+quid.toString()+'/1');
					var desertRef2 = storageRef.child('Products/'+'Products'+quid.toString()+'/2');
					var desertRef3 = storageRef.child('Products/'+'Products'+quid.toString()+'/3');
					var desertRef4 = storageRef.child('Products/'+'Products'+quid.toString()+'/4');
						desertRef.delete().then(function() {
							console.log('Products/'+'Products'+quid.toString()+'/0'+"delete successful");
						}).catch(function(error) {	
						console.log('Products/'+'Products'+quid.toString()+'/0'+"delete fail");
					});
						desertRef1.delete().then(function() {
							console.log('Products/'+'Products'+quid.toString()+'/1'+"delete successful");
						}).catch(function(error) {	
						console.log('Products/'+'Products'+quid.toString()+'/1'+"delete fail");
					});
						desertRef2.delete().then(function() {
							console.log('Products/'+'Products'+quid.toString()+'/2'+"delete successful");
						}).catch(function(error) {	
						console.log('Products/'+'Products'+quid.toString()+'/2'+"delete fail");
					});
						desertRef3.delete().then(function() {
							console.log('Products/'+'Products'+quid.toString()+'/3'+"delete successful");
						}).catch(function(error) {	
						console.log('Products/'+'Products'+quid.toString()+'/3'+"delete fail");
					});
						desertRef4.delete().then(function() {
							console.log('Products/'+'Products'+quid.toString()+'/4'+"delete successful");
						}).catch(function(error) {	
						console.log('Products/'+'Products'+quid.toString()+'/4'+"delete fail");
					});
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
}
//var today=new Date();
//alert(today);
del();

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
	var Counter = db.collection('Counter').doc('Product');
	var getDoc = Counter.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
					var quid=doc.data()['id'];
					var uploadTask = storageRef.child('Products/'+'Products'+quid.toString()+'/0').put(file);
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
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
	var getDoc = Counter.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
					var quid=doc.data()['id'];
					var uploadTask = storageRef.child('Products/'+'Products'+quid.toString()+'/1').put(file);
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
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
	var getDoc = Counter.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
					var quid=doc.data()['id'];
					var uploadTask = storageRef.child('Products/'+'Products'+quid.toString()+'/2').put(file);
					
					
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
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
	var getDoc = Counter.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
					var quid=doc.data()['id'];
					var uploadTask = storageRef.child('Products/'+'Products'+quid.toString()+'/3').put(file);
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
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
function readFile4(){	
	var file = this.files[0]; 
	//alert(this.files.length);
	var reader = new FileReader(); 
	//var bigImg = document.createElement("img");
	reader.readAsDataURL(file); 
	reader.onload = function(e){ 
		//result.innerHTML = '<img src="'+this.result+'" alt="" height="100" />' ;
		//var bigImg = document.createElement("img");
		//bigImg.src=this.result;
		var myDiv4 = document.getElementById('myDiv4'); //获得dom对象
		//myDiv.appendChild(bigImg);
		myDiv4.src=this.result;
		//console.log(file);
	} 
		//var firebase= require("./firebase");
		//var db = firebase.firestore();
		//var storageRef = firebase.storage().ref();
		var Counter = db.collection('Counter').doc('Product');
		var getDoc = Counter.get()
				.then(doc => {
				if (!doc.exists) {
					console.log('No such document!');
				} else {
					console.log('Document data:', doc.data());
				}
						var quid=doc.data()['id'];
					var uploadTask = storageRef.child('Products/'+'Products'+quid.toString()+'/4').put(file);				
				})
				.catch(err => {
				console.log('Error getting document', err);
		});
	
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
up=function(){
	
	var category_element= document.getElementById("category");
	var category = category_element.options[category_element.selectedIndex].value;
	
	
	var price_element= document.getElementById("price");
	var price = price_element.value;
	var product_element= document.getElementById("product");
	var product = product_element.value;
	
	var bidorUnbid_element= document.getElementById("bidorUnbid");
	var bidorUnbid = bidorUnbid_element.options[bidorUnbid_element.selectedIndex].value;
	
	
	var introduction_element= document.getElementById("introduction");
	var introduction = introduction_element.value;
	var price1_element= document.getElementById("price1");
	var price1 = price1_element.value;
	var price2_element= document.getElementById("price2");
	var price2 = price2_element.value;
	var qty_element= document.getElementById("qty");
	var qty = qty_element.value;
	var obj=document.getElementById("delivery1");
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
   var check;
   var enddate=new Date(date.getFullYear(), date.getMonth(),(date.getDate()+7),date.getHours(),date.getMinutes(),date.getSeconds());
   if(bidorUnbid==0){
	   check=false;
   }
   else{
	   check=true;
   }
   
   var data={build_time:date,delivery:[obj[0].checked == true,obj[2].checked == true,obj[4].checked == true],
   delivery_fee:[Number(price1),Number(price2),0],finish_time:enddate,increase_price:0,is_Bid:check,payment:[false,false,false],
   price:Number(price),product_evaluation:0,product_id:0,product_kind:Number(category),product_quantity:Number(qty),product_title:product
   ,reserve_price:0,seller_account:'0',sold:0,state:0,winner_account:'0',product_intro:introduction
   };
   back=function(){
	  window.location = "./personal.html";
   }
   seller=function(id){
	   var Counter = db.collection('User23').doc(User1);
	   data['is_Order']=false;
	   citiesRef1 = db.collection('User23').doc(User1).collection('iamSeller');
	   var getDoc = Counter.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
					jmp=function(callback){
						quid=doc.data()['seller_Product'];
						Counter.update({
							seller_Product: quid+1
						});	
						data['product_id']=id;
						data['seller_account']=doc.data()['account'];
						citiesRef.doc('Product'+id.toString()).update({'seller_account':data['seller_account']});	
						//console.log(data);
						citiesRef1.doc('Product'+quid.toString()).set(data);			
						alert("上傳成功");
						callback();
					}	
					jmp(back);
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
   }
   var getDoc = Counter.get()
		.then(doc => {
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			console.log('Document data:', doc.data());
		}
		    product=function(callback){
				quid=doc.data()['id'];
				Counter.set({
					id: quid+1
				});	
				data['product_id']=quid;
				console.log(data);
				citiesRef.doc('Product'+quid.toString()).set(data);			
				//alert("asas");
				callback(quid);
			}	
			product(seller);
		})
		.catch(err => {
		console.log('Error getting document', err);
	});
	

}
