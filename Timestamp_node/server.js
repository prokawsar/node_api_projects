// server.js
// where your node app starts

// init project
var express = require('express');
var url = require('url');

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));

function result(date){
  return {
     unix: (new Date(date).getTime()/1000),
     natural: date
  }
}

var month = new Array(12);
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";

app.get("/", function (request, response) {
   
  response.write(JSON.stringify( {unix: null, natural: null }));
  response.end();
});

app.get("/:query", function (request, response) {
   
  var link = (request.originalUrl).substring(1);
 
  var c = link.split('%20');
  if(c.length == 3){
    var date = c.join(' ');
    response.write(JSON.stringify( result(date)));

  }else{
    var a = new Date(link * 1000);
    var x =  {unix: link, natural: month[a.getMonth()]+' '+a.getDate()+', '+a.getFullYear()};
    response.write(JSON.stringify(x));
  }
 // response.write("Its working");
  response.end();
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
