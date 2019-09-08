var config = {
  apiKey: "AIzaSyDts6Yhgaby6XqloH96wqm_8RZfcFP_Kv4",
  authDomain: "hifi-51014.firebaseapp.com",
  databaseURL: "https://hifi-51014.firebaseio.com",
  projectId: "hifi-51014",
  storageBucket: "hifi-51014.appspot.com",
  messagingSenderId: "199206818561",
  appId: "1:199206818561:web:6fade7bcdfb0c7f5bd4100"
};

firebase.initializeApp(config);
var database = firebase.database();
var tableBody = $("tbody");

var submit = $("#submit");

submit.on("click", function(e) {
  e.preventDefault();
  var name = $("#name").val();
  var role = $("#role").val();
  var rate = $("#rate").val();
  var date = $("#date").val();

  database.ref().push({
    name: name,
    role: role,
    rate: rate,
    date: date
  });

  database.ref().on("child_added", function(snap) {
    var data = snap.val();
    var rname = data.name;
    var rrole = data.role;
    var rrate = data.rate;
    var rdate = data.date;
  });
});

database.ref().on("child_added", function(snap) {
  var data = snap.val();
  var rname = data.name;
  var rrole = data.role;
  var rrate = data.rate;
  var rdate = data.date;

  var dateFormat = "YYYY-MM-DD";
  var momentDate = moment(rdate, dateFormat);
  var today = moment();

  var diff = today.diff(momentDate, "months");
  var bill = diff * rrate;

  var results =
    "<tr><td>" +
    rname +
    "</td><td>" +
    rrole +
    "</td><td>" +
    rdate +
    "</td><td>" +
    diff +
    "</td><td>" +
    rrate +
    "</td></tr>";
  tableBody.prepend(results);
  clearValues();
});

function clearValues() {
  $("#name").val("");
  $("#role").val("");
  $("#rate").val("");
  $("#date").val("");
}
