/*Core Host View Javascript File
 * @author Viswajeeet Balaji
 * @version 2.0
 * @date 21st Oct, 2018
 */

//Amazon Web Services API Gateway Endpoints
var host_event_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-event-list";
var host_event_guest_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-event-guest-list";
var host_delete_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-delete-event";
var host_create_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-create-event";
var event_task_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-task-list"
var event_contributor_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-contributor-list"
var event_add_task_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-add-task";


function eventmanager() {
  document.getElementById("createEvent").innerHTML = "<div class=\"w3-display-container w3-panel w3-theme-d3\" style=\"padding:0px;\">";
  document.getElementById("createEvent").innerHTML += "<input class=\"w3-input\" type=\"text\" placeholder=\"Event Name\" id=\"eventname\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Date\" id=\"enterdate\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Time\" id=\"entertime\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Venue\" id=\"entervenue\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter zipcode\" id=\"enterzip\"><br><input class=\"w3-input\"type=\"text\" placeholder=\"Event Description\" id=\"description\"><br>";
  document.getElementById("createEvent").innerHTML += " <input class=\"w3-input\" type=\"text\" placeholder=\"Enter Tags\" id=\"tags\"><br><button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"create()\">Create Event</button>&nbsp<button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"cancel()\">Cancel</button></div>";
}

function cancel() {
  document.getElementById("createEvent").innerHTML = "";
}

function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-theme-d1", "");
  }
}

function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function hostguestlist() {
  var host_guest_list;
  text = "";
  for (i = 0; i < 3; i++) {
    text += "<div class=\"w3-bar-item w3-hover-white w3-button w3-card\">User Name</div>";
  }
  document.getElementById("hostEventGuestList").innerHTML = text;
}

function displayHostEventDetails(currentEvent) {
  localStorage.setItem("currentEvent", currentEvent);
  var task = "<button class=\"w3-button w3-hide-small w3-padding-large w3-hover-white\" title=\"Create Task\" onclick=\"callAddTask()\"><i class=\"fa fa-plus\"></i></button>";
  var contributor = "<button class=\"w3-button w3-hide-small w3-padding-large w3-hover-white\" title=\"Add Contributor\" onclick=\"addContributor()\"><i class=\"fa fa-plus\"></i></button>";

  for (var i = 0; i < 3; i++) {
    task += "<button class=\"w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2\" onclick=\"displayTaskDetails('" + currentEvent + "');\" >" + currentEvent + "Task</button>";
    contributor += "<button class=\"w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2\" onclick=\"displayContributorDetails('" + currentEvent + "');\" >" + currentEvent + "Contributor</button>";
  }
  document.getElementById("tasks").innerHTML = task;
  document.getElementById("contributors").innerHTML = contributor;
}
function callAddTask() {
  document.getElementById("createEvent").innerHTML = "<div class=\"w3-display-container w3-panel w3-theme-d3\" style=\"padding:0px;\">";
  document.getElementById("createEvent").innerHTML += "<input class=\"w3-input\" type=\"text\" placeholder=\"Task Name\" id=\"task_name\"><br><input class=\"w3-input\"type=\"text\" placeholder=\"Task Description\" id=\"task_description\"><br>";
  document.getElementById("createEvent").innerHTML += " <input class=\"w3-input\" type=\"text\" placeholder=\"Enter Tags with spaces\" id=\"tags\"><br><button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"addTask()\">Create Task</button>&nbsp<button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"cancel()\">Cancel</button></div>";
}

function addContributor() {
  document.getElementById("createEvent").innerHTML = "<div class=\"w3-display-container w3-panel w3-theme-d3\" style=\"padding:0px;\">";
  document.getElementById("createEvent").innerHTML += "<input class=\"w3-input\" type=\"text\" placeholder=\"Contributor e-mail ID\" id=\"contributoremail\">";
  document.getElementById("createEvent").innerHTML += "<br><button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"create()\">Add Contributor</button>&nbsp<button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"cancel()\">Cancel</button></div>";
}

function loadHostEventList(arr) {

  var hostEventNames = arr;
  if (arr == null) {
    document.getElementById("eventList").innerHTML = "No events hosted";
    return;
  }
  var text = "";
  var i;
  for (i = 0; i < hostEventNames.length; i++) {
    text += "<button class=\"w3-button w3-theme-d5 \"  onclick=\" displayHostEventDetails('" + hostEventNames[i][1] + "')\" >" + hostEventNames[i][0] + "</button><br><br>";
  }
  document.getElementById("eventList").innerHTML = text;

}

function displayTaskDetails(eventID) {
  var text = "";
  text = text + "<div class=\"w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d4\" title=\"Add Contributer\"><i class=\"fa fa-user-plus\"></i></div>";
  text = text + "<div class=\"w3-bar-item w3-hover-white w3-right w3-button w3-card-2 w3-medium w3-theme-d4\" title=\"Remove Task\"><i class=\"fa fa-close\"></i></div><br>";
  text += "<h2>" + eventID + "</h2><div class=\"w3-theme-d2 w3-card-2\" style=\"padding:10px\"><h4>Task Description</h4>";
  text += "<div class=\"w3-card-3 w3-theme-d3\" style=\"padding:5px\"><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Subtask Name\" id=\"subtaskname\">";
  text += "<button type=\"button\" class=\"w3-button w3-small w3-theme-d5\" onclick=\"create()\">Add Sub_Task</button></div>"
  text += "<div class=\" w3-bar\"> ";
  text += "<input class=\"w3-check\" type=\"checkbox\"><label>sub_task</label><br><input class=\"w3-small w3-check\" type=\"checkbox\"><label>sub_task</label><br><input class=\"w3-check\" type=\"checkbox\"><label>sub_task</label><br> </div>";
  document.getElementById("createEvent").innerHTML = text;
}

function displayContributorDetails(eventName) {
  var text = "<div>";
  text = "<div class=\"w3-theme-d4 w3-card-3\"><H3>&nbsp&nbspContributer Name</h3>";
  text += "<H3>&nbsp&nbspTask Assigned</h3>";
  text += "</div></div>";
  document.getElementById("createEvent").innerHTML = text;
}

function retrieveHostEventList() {

  var req = new XMLHttpRequest();
  req.open('POST', host_event_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      loadHostEventList(JSON.parse(event.target.response));
    }
  };
  userName = localStorage.getItem("username");
  var parameters = {
    username: userName,
  }
  req.send(JSON.stringify(parameters));
}

function addTask() {
  var req = new XMLHttpRequest();
  req.open('POST', event_add_task_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response=="true") {
       alert("Task added successfully");
    }
    else if(this.readyState==4) {
      console.log(event.target.response);
      alert("Sorry resource unavailable");
    }
  };
  var parameters = {
    event_id: localStorage.getItem("currentEvent"),
    task_name: document.getElementById("task_name").value,
    desc: document.getElementById("task_description").value,

  }
  req.send(JSON.stringify(parameters));
}