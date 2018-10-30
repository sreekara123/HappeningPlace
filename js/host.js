/*Core Guest View Javascript File
 * @author Viswajeeet Balaji
 * @version 2.0
 * @date 21st Oct, 2018
 */

//Amazon Web Services API Gateway Endpoints
var user_sign_up_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-signup";
var user_login_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-login";
var user_password_reset_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-password-reset";
var guest_remove_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/guest-remove-event";
var guest_join_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/guest-join-event";
var user_event_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-list";
var user_event_history_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-history";


/* Function Lookup index
 * 1. Add user - Adds user to Database
 * 2. signup - Calls addUser and supplies details to it
 * 3. userLogin - Authenticates user login using Database
 * 4. login - Calls userLogin and supllies details to it
 * 5. resetPassword - Call
 * 6. reset - Calls resetPassword and supplies details to it
 * 7. createEvent - Adds the event to the events Database
 * 8. create - Calls creatEvent and supplies details to it
 * 9. guestEventList - Returns the list of events for a ZipCode
 * 10. retrieve  - Calls guestEventList and supllies details to it
 * 11. renderUI - Display the list of events to the user in UI
 * 12. getZip - Gets the event list for user's default zipcode
 * 13. joinEvent - Adds the username to the guest list for the event_time
 * 14. loadProfile - After successful login, the profile details to be displayed are updated
 */


// Add Users to the Users Database
function addUser(userName, userPassword, firstName, lastName, address_1, address_2, _city, _state, _zipcode,_usertags) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  var req = new XMLHttpRequest();
  req.open('POST', user_sign_up_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response === "true") {
      alert("Signed up successfully.");
      location.href = "homepage.html";
    } else if (this.readyState == 4) {
      alert("Invalid details")
    }
  };
  var parameters = {
    username: userName,
    password: userPassword,
    firstname: firstName,
    lastname: lastName,
    address1: address_1,
    address2: address_2,
    city: _city,
    state: _state,
    zipcode: _zipcode,
    usertags: _usertags
  }
  req.send(JSON.stringify(parameters));
}

// Calls addUser - connects frontend to API Gateway
function signup() {

  //Get the user interest tags supplied by the user during sign up
  var userInterestsArr = document.getElementById("inte").value.split(/[,]+/);
//Add user to the database
  addUser(document.getElementById("inputEmail4").value,
    document.getElementById("inputPassword4").value,
    document.getElementById("inputFName").value,
    document.getElementById("inputLName").value,
    document.getElementById("inputAddress").value,
    document.getElementById("inputAddress2").value,
    document.getElementById("inputCity").value,
    document.getElementById("inputState").value,
    document.getElementById("inputZip").value,
   userInterestsArr
  );
}

function userLogin(username, password) {
  var req = new XMLHttpRequest();
  req.open('POST', user_login_endpoint)
  req.onreadystatechange = function(event) {
    res= "";
    if(this.readyState==4)
    res = JSON.parse(event.target.response);
    if (res.response === 'true' && this.readyState == 4) {
      localStorage.setItem("username", document.getElementById('username').value);
      localStorage.setItem("userDetails",event.target.response);
      alert("Successful login");
      location.href = "guest.html"
    } else if (this.readyState == 4)
    {
      alert("Invalid Credentials");
    }
  };
  req.setRequestHeader('Content-Type', 'application/json');
  var params = {
    userName: username,
    password: password
  }
  req.send(JSON.stringify(params));

}

function login() {
  if(document.getElementById('username').value!="" && document.getElementById('password').value!="")
    userLogin(document.getElementById('username').value, document.getElementById('password').value);
}

function resetpassword(userName, userPassword, new_password, confirm_Password) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  if (new_password != confirm_Password) {
    alert("New Password do not match")
    return;
  }
  var req = new XMLHttpRequest();
  req.open('POST', user_password_reset_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response === "true") {
      alert("Reset successful");
    } else if (this.readyState == 4) {
      alert("Invalid account");
    }
  };
  var params = {
    username: userName,
    password1: userPassword,
    password2: new_password,
    password3: confirm_Password
  }
  req.send(JSON.stringify(params));
}

function reset() {
  resetpassword(document.getElementById("inputEmail").value,
    document.getElementById("old_inputPassword").value,
    document.getElementById("new_inputPassword").value,
    document.getElementById("confirm_Password").value
  );

}

function createEvent(userName, event_Name, eventZipcode, eventLocation, time, description, tags) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  var req = new XMLHttpRequest();
  req.open('POST', host_create_event_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      console.log(event.target.response);
      alert("Event Creation Successful");
    }
  };
  var parameters = {
    username: userName,
    eventName: event_Name,
    zipcode: eventZipcode,
    event_location: eventLocation,
    event_time: time,
    desc: description,
    usertags: tags
  }
  req.send(JSON.stringify(parameters));
}




function guestEventList() {
  var req = new XMLHttpRequest();
  req.open('POST', user_event_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response != "[]") {
      renderUI(JSON.parse(event.target.response));
    } else if (this.readyState == 4 && event.target.response == "[]") {
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
        document.getElementById('searchResults').innerHTML = "Sorry no events found for that zipcode.";
    }
  };
  var parameters = {
    zip_code: document.getElementById('zipcodeInput').value,
    interest_tags:document.getElementById('tagsInput').value
  }
  req.send(JSON.stringify(parameters));
}

function renderUI(arr) {

  if (arr != null) {
    console.log(arr);
    document.getElementById('searchResults').innerHTML = "";
    document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
    document.getElementById('searchResults').innerHTML = "Sorry no events found for that zipcode.";
    var flag=0;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i]!=null)
      { document.getElementById("backgroundCard").className = "w3-card w3-container w3-blue";
        if(flag==0)
        {
          document.getElementById('searchResults').innerHTML = "";
          flag=1;
        }
        document.getElementById('searchResults').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\">1 min</span><h4>" + arr[i].name + " " + arr[i].location + "</h4><br><hr class=\"w3-clear\"><p>Location: " + arr[i].location + "<br>Time: " + arr[i].time + "<br>ZipCode: " + arr[i].zipcode + "<br> Description:" + arr[i].desc + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div><button type=\"button\" class=\"w3-button w3-theme-d1 w3-margin-bottom\" onclick=\"joinEvent(" + arr[i].eventid + ")\"><i class=\"fa fa-thumbs-up\"></i>  Going?</button><button type=\"button\" class=\"w3-button w3-theme-d2 w3-margin-bottom\">&nbsp<i class=\"fa fa-comment\"></i>  Share</button></div>";
      }
  }
  }
}

function joinEvent(eventID) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  userLoggedIn = localStorage.getItem("username");
  console.log(userLoggedIn.toString());
  console.log(eventID.toString());
  var req = new XMLHttpRequest();
  req.open('POST', guest_join_event_endpoint);
  req.onreadystatechange = function(event) {
    console.log(event.target.response);
    alert("Added to event")
  };
  console.log(eventID);
  var params = {
    username: userLoggedIn.toString(),
    event_id: eventID.toString()
  }
  req.send(JSON.stringify(params));
}

function loadProfile()
{
  //Tags updated
  arr = JSON.parse(localStorage.getItem("userDetails"));
  console.log(arr);
  for(var i=0;i<arr.interest_tags.length;i++)
  {
    document.getElementById("tags").innerHTML += "<span class=\"w3-tag w3-small w3-theme-l"+((i%5))+"\">"+arr.interest_tags[i]+"</span> ";
  }

  //Profile name
  document.getElementById("firstName").innerHTML = arr.firstname+"'s";
  document.getElementById("address1").innerHTML += arr.address1+", "+arr.address2;
  document.getElementById("email").innerHTML += arr.email;
}
