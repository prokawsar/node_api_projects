// server.js
// where your node app starts

// init project
var express = require('express');
const requestIp = require('request-ip');

var app = express();

// Header Reader 

// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(express.static('public'));
app.use(requestIp.mw());

app.get("/", function (request, response) {
  
  var ip = request.clientIp;
  var lang = request.headers["accept-language"].split(",");
  lang = lang[0];
  
  var soft = request.headers['user-agent'];
  soft = soft.substring(soft.indexOf("(")+1, soft.indexOf(")"));
  
  response.write(JSON.stringify( {ipaddress: ip, language: lang, software: soft }));
  // response.write(soft);
  
  response.end();
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
