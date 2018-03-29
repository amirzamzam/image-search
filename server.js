// server.js
// where your node app starts

// init project
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const searchTerm = require('./models/searchTerm');
const qwant = require('qwant-api');
// const Bing = require('node-bing-api')({accKey:"547f17cf520b4edd89ab9f175b63732e"});
const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://amir:1234@ds019836.mlab.com:19836/image-search').then(
  () => { console.log("Connected"); },
  err => { console.log("Error connecting");}
);;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})


app.get('/api/recentsearches', function(req,res,next){
searchTerm.find({}, function(err,data){
res.json(data);
});
  
});

//get request for image
app.get('/api/imagesearch/:searchVal*', function(req,res,next){
var searchVal = req.params.searchVal;
var offset = req.query.offset;
  
  
var data = new searchTerm({
  searchVal,
  searchDate: new Date()  
});  
  
  data.save(function(err){
  if(err){
    return res.send('Error saving to database');
  }
    res.json(data);
  
  });
  
  qwant.search("web", { query: "test", count: 10, offset: 1, language: "german" }, function(err, data){
    if (err) return console.log(err);
    console.log(data);
});
  
  
  
  
//   Bing.images(searchVal, {
//                 top:10
//   }, function(error,rez,body){
    
//     console.log(body);
    
//   });
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
