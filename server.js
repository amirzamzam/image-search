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
const app = express()

app.use(cors());
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
