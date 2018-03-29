// server.js
// where your node app starts

// init project
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Google = require('node-google-api')({
    apiKey: 'AIzaSyDTF9Y0bkGKy_uUCZPIyqdit7wuLDI5KqQ'
,
    debugMode: true // Throws errors instead of passing them silently.
});
const searchTerm = require('./models/searchTerm');
const app = express()

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

//   return res.json({
//   searchVal,
//   offset
//   });
  
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
