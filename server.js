// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static assets: 
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// This sets the home path view:
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// test another end point:
app.get("/hello", function (req, res) {
  res.send('Hello Works');
});

// "date string is empty" :
app.get("/api/timestamp", function (req, res) {  
  var queryDate = new Date();  
  res.json({ "unix": queryDate.getTime(), "utc": queryDate.toUTCString() });
});

// "date string is valid"
app.get("/api/timestamp/:date_string?", function (req, res) {

  var queryString = req.params.date_string;
  
  if (queryString.indexOf("-") == -1) {
    queryString = Number.parseInt(queryString);
  }
    
  var queryDate = new Date(queryString);  
  
  if (queryDate == "Invalid Date") {
    res.json({ "error" : "Invalid Date" });
  } else {
    res.json({ "unix": queryDate.getTime(), "utc": queryDate.toUTCString() });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});