
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk'); 

AWS.config.update({
    'accessKeyId': 'zelenskiy.developer@gmail.com',
    'secretAccessKey': 'luk5u2TkZMvk74PGVpHLDIqugoxZaSCC2pZIFpJzFTMGVoD8',
    s3ForcePathStyle: true
});


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/get', function (req, res) {
  console.log(req.body)
    var s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('https://s3.sirv.com'),
    params: {
        Bucket: 'vitaliy',
        Key: req.body.url,
    }
  });
s3.getObject({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else  {
    console.log(data.Body.toString('utf8'));
     res.send(data.Body.toString('utf8'));
  }              // successful response
});

});



app.post('/', function (req, res) {
  
   var buf = new Buffer(JSON.stringify(req.body.core));

  var s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('https://s3.sirv.com'),
    params: {
        Bucket: 'vitaliy',
        Key: req.body.url,
        Body: buf
    }
  });
  
  s3.putObject({}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(222222);           // successful response
  });
  
});


app.listen(process.env.PORT || 80);
console.log("Server running on port 3000");