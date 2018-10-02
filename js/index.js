/* addUser(userName,userPassword)
   Takes two parameters input and stores them in the AWS DynamoDB
   Sample Request: addUser("Viswajeeet Balaji","HappeningPlace Password");
 */
function addUser(userName,userPassword,firstName,lastName,address_1,address_2,_city,_state,_zipcode)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	console.log("Hi");
	var req = new XMLHttpRequest();
	req.open('POST','https://9ojvtxgwid.execute-api.us-east-1.amazonaws.com/loginStage/user-signup');
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
	var parameters = {
		username:userName,
		password:userPassword,
		firstname:firstName,
		lastname:lastName,
		address1:address_1,
		address2:address_2,
		city:_city,
		state:_state,
		zipcode:_zipcode
	}
	req.send(JSON.stringify(parameters));
	console.log("Bye");
}

function createEvent(event_Name,eventZipcode,eventLocation)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST','https://9ojvtxgwid.execute-api.us-east-1.amazonaws.com/loginStage/createevent');
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
	var parameters = {
		eventName:event_Name,
		zipcode:eventZipcode,
		event_location:eventLocation
	}
	req.send(JSON.stringify(parameters));
}

function userLogin(username,password)
{
  var req = new XMLHttpRequest();
  req.open('POST','https://9ojvtxgwid.execute-api.us-east-1.amazonaws.com/loginStage/user-login')
  req.onreadystatechange = function(event)
  {
    //console.log(event);
    if(event.target.responseText==='true' && this.readyState==4)
            console.log("Success");
    else if (this.readyState==4)
      alert("Invalid Credentials");
  };
 req.setRequestHeader('Content-Type','application/json');
  var params =
  {
    userName : username,
    password : password
  }
  req.send(JSON.stringify(params));
}

function resetpassword(userName,userPassword,new_password,confirm_Password)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST','https://9ojvtxgwid.execute-api.us-east-1.amazonaws.com/loginStage/resetpassword');
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
	var params = {
		username: userName,
		password1: userPassword,
		password2: new_password,
		password3: confirm_Password
	}
	req.send(JSON.stringify(params));
}

function signup()
{

	addUser(document.getElementById("inputEmail4").value,
					document.getElementById("inputPassword4").value,
					document.getElementById("inputFName").value,
					document.getElementById("inputLName").value,
					document.getElementById("inputAddress").value,
					document.getElementById("inputAddress2").value,
					document.getElementById("inputCity").value,
					document.getElementById("inputState").value,
					document.getElementById("inputZip").value
				  );
	//window.location.replace("login.html");
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}

function reset()
{
	console.log("Hi");
	resetpassword(document.getElementById("inputEmail").value,
					document.getElementById("old_inputPassword").value,
					document.getElementById("new_inputPassword").value,
					document.getElementById("confirm_Password").value);
	//window.location.replace("login.html");
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}

function createE()
{
	console.log("Hi");
	createEvent(document.getElementById("EventName").value,
					document.getElementById("inputZip").value,
					document.getElementById("BuildingName").value);
	//window.location.replace("login.html");
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}