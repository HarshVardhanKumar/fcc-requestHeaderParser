// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, response) {
  var a = req.headers['user-agent'].split(' ') ;
  a = a[a.length-2] ;
  var OSName = req.headers['user-agent'].split('(')[1].split(') ')[0]  ;
  OSName = OSName.substring(0, OSName.length)+" "+a ;
  
  var object = {} ;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress ;
  ip = ip.split(',') ;
  ip  = ip[0] ;
  object['ipaddress'] = ip ;
  object["language"] = req.headers['accept-language'].split(',')[0] ;
  object["browser"] = OSName ;
  
  response.jsonp(object) ;
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
