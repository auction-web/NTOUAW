write_firbase=function() {

  var Username_element = document.getElementById('Username');
  var Username = Username_element.value;
  var Account_element = document.getElementById('Account');
  var Account = Account_element.value;
  var Password_element = document.getElementById('Password');
  var Password = Password_element.value;
  var ConfirmPassword_element = document.getElementById('ConfirmPassword');
  var ConfirmPassword = ConfirmPassword_element.value; 
  var Phone_element = document.getElementById('Phone');
  var Phone = Phone_element.value;
  var Email_element = document.getElementById('Email');
  var Email = Email_element.value;
  var Address_element = document.getElementById('Address');
  var Address = Address_element.value;
  var Birth_element = document.getElementById('Birth');
  var Birth = Birth_element.value;
  /*alert('你的姓名是'+Username+'\n電子郵件是'+Account
        +'\n你的姓名是'+Password+'\n電子郵件是'+ConfirmPassword
		+'\n你的姓名是'+Phone+'\n電子郵件是'+Email
		+'\n你的姓名是'+Address+'\n電子郵件是'+Birth		
  );  */
  
  var Birth=new Date(Birth);
  if(Address.length==0 || Account.length==0 ||  ConfirmPassword.length==0 || Password.length==0 || Phone.length==0 || Username.length==0 || Email.length==0 || Birth.length==0){
	  alert("資料尚未完整");
	 // console.log('Document data1111:');
	  return ;
  }
  if(ConfirmPassword!=Password){
	  alert("請檢查密碼");
	  return;
  }
  var data={ 
  account: Account,buyer_evaluation:'0', cart_id: '0', address: Address,
  password:Password,phone:Phone,seller_evaluation:"0",
  user_id: '0', user_name: Username,user_email:Email,user_birth:Birth
  };
  /*var data={
  account: 0,buyer_evaluation:'0', cart_id: '0', address: 0,
  password:0,phone:0,seller_evaluation:"0",
  user_id: '0', user_name: 0,user_email:0,user_birth:0
  };*/
  var firebase= require("./firebase");
  var query= require("./query");
  var db = firebase.firestore();
  var citiesRef = db.collection('User23');
  
  
  	//var citiesRef = db.collection('User23');
	var allCities = citiesRef.where('account', '==',Account ).get()
	.then(snapshot => {
		if (snapshot.empty) {
			console.log('No matching documents.');
			query(db,citiesRef,'User',data);
			alert("123");
			//location.href = "./index.html";
		} 
		else{
			alert("帳號重複，請重新輸入");
			snapshot.forEach(doc => {
			console.log(doc.id, '=>', doc.data());
			});
			return;
		}

		
	})
	.catch(err => {
		console.log('Error getting documents', err);
	});
}
//write_firbase();
