var cook=getCookie('id');


if(cook!=""){
	location.href = "./home.html";
}

login=function(){
	 var Account_element = document.getElementById('Account');
	 var Account= Account_element.value;
	 var Password_element = document.getElementById('Password');
	 var Password = Password_element.value;
	 
	 if(Password.length==0 || Account.length==0){
		  alert("帳密尚未完整");
		 // console.log('Document data1111:');
		  return ;
	 }
	  var firebase= require("./firebase");
	  var db = firebase.firestore();
	  var citiesRef = db.collection('User23');
  
	 var allCities = citiesRef.where('account', '==',Account ).where('password', '==',Password ).get()
	 .then(snapshot => {
		if (snapshot.empty) {
			console.log('No matching documents.');
			alert("帳密錯誤");
			//location.href = "./index.html";
		} 
		else{
			snapshot.forEach(doc => {
				console.log(doc.id, '=>', doc.data());
				setCookie('id',doc.data()['user_id'],30);
			});
			location.href = "./home.html";
		}
	})
	.catch(err => {
		console.log('Error getting documents', err);
	});
 }
