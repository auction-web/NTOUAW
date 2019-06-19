var result = document.getElementById("personal"); 
var input = document.getElementById("file_input"); 
var firebase= require("./firebase");
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
if(typeof FileReader==='undefined'){ 
	result.innerHTML = "Sorry, 瀏覽器不支持 FileReader"; 
	input.setAttribute('disabled','disabled'); 
}else{ 
	input.addEventListener('change',readFile,false);
}
/*var User='User7/';
var User1='User7';*/
var cook=getCookie('id');
var User1='User'+cook;
var User=User1+'/';
check_login();
/*if(cook==""){
	alert("請先登入，跳轉至登入頁面");
	location.href = "./index.html";
}*/
storageRef.child('Users/'+User+'picture').getDownloadURL().then(function(url) {
  //// `url` is the download URL for 'images/stars.jpg'

  // This can be downloaded directly:
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

  // Or inserted into an <img> element:
  var img = document.getElementById('myDiv');
  img.src = url;
}).catch(function(error) {
  // Handle any errors
});
function readFile(){	
	var file = this.files[0]; 
	//alert(this.files.length);
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
	
	var uploadTask = storageRef.child('Users/'+User+'picture').put(file);
}
  var Username_element = document.getElementById('Username');
  var Account_element = document.getElementById('Account'); 
  var Password_element = document.getElementById('Password');
  var Phone_element = document.getElementById('Phone'); 
  var Email_element = document.getElementById('Email');
  var Address_element = document.getElementById('Address');
  var Birth_element = document.getElementById('Birth');
citiesRef = db.collection('User23').doc(User1);
	   var getDoc = citiesRef.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}		
						Username_element.value=doc.data()['user_name'];
						Account_element.value=doc.data()['account'];
						Password_element.value=doc.data()['password'];
						Phone_element.value=doc.data()['phone'];
						Email_element.value=doc.data()['user_email'];
						Address_element.value=doc.data()['address'];
						var date=(doc.data()['birth']).toDate();
						Birth_element.value=date.getFullYear()+'/'+ date.getMonth()+'/'+date.getDate();
						//console.log(data);		
						//alert("aaaaasas");									
			})
			.catch(err => {
			console.log('Error getting document', err);
	   });
write_firbase=function() {
  /*var Username_element = document.getElementById('Username');
  var Account_element = document.getElementById('Account'); 
  var Password_element = document.getElementById('Password');
  var Phone_element = document.getElementById('Phone'); 
  var Email_element = document.getElementById('Email');
  var Address_element = document.getElementById('Address');
  var Birth_element = document.getElementById('Birth');*/

  var Username=Username_element.value;
  var Account=Account_element.value;
  var Password=Password_element.value;
  var Phone=Phone_element.value;
  var Email=Email_element.value;
  var Address=Address_element.value;
  var Birth1=Birth_element.value;
  /*alert('你的姓名是'+Username+'\n電子郵件是'+Account
        +'\n你的姓名是'+Password+'\n電子郵件是'+ConfirmPassword
		+'\n你的姓名是'+Phone+'\n電子郵件是'+Email
		+'\n你的姓名是'+Address+'\n電子郵件是'+Birth		
  );  */
  
  var Birth=new Date(Birth1);
  if(Address.length==0 || Account.length==0  || Password.length==0 || Phone.length==0 || Username.length==0 || Email.length==0 || Birth1.length==0){
	  alert("資料尚未完整");
	 // console.log('Document data1111:');
	  return ;
  }
  var data={ 
  account: Account, address: Address,
  password:Password,phone:Phone, user_name: Username,user_email:Email,user_birth:Birth
  };
  /*var data={
  account: 0,buyer_evaluation:'0', cart_id: '0', address: 0,
  password:0,phone:0,seller_evaluation:"0",
  user_id: '0', user_name: 0,user_email:0,user_birth:0
  };*/
 
  	var citiesRef = db.collection('User23');
	md= function(id){
		  var citiesRef = db.collection('User23');  
		  var allCities = citiesRef.where('account', '==',Account ).get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log('No matching documents.');
					citiesRef.doc(User1).update(data);
					alert("修改成功");
					//location.href = "./index.html";
				} 
				else{
					snapshot.forEach(doc => {
						console.log(doc.id, '=>', doc.data());
						if(doc.data()['account']==id){
							citiesRef.doc(User1).update(data);
							alert("修改成功");
							return;
						}
						else{
							//console.log(doc.data()['account']);
							//console.log(Account1);
							console.log('No matching documents.');
							alert("帳號重複，請重新輸入");
						}
					});	
				}	
					//location.href = "./index.html";
			})
			.catch(err => {
				console.log('Error getting documents', err);
			});
	}
	
	qu=function(callback){
	citiesRef = db.collection('User23').doc(User1);
	   var getDoc = citiesRef.get()
			.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}		
						callback(doc.data()['account']);
						//console.log(data);								
			})
			.catch(err => {
			console.log('Error getting document', err);
		});
	}
	qu(md);
}