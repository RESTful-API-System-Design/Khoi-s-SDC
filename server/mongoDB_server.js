const express = require('express');
const bodyParser = require('body-parser');
const parse = require('csv-parse');
const db = require('../database/mongodb_schema.js');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//const db = require('../database/mongodb_config.js');
let port = 3001;
// Connection URL
//const url = 'mongodb://localhost:27017';

// Database Name
//const dbName = 'reviews_service';

// Create a new MongoClient
//const client = new MongoClient(url);

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/reviews', db.getReviews);
app.get('/reviews/meta', db.getMetaReview);
app.post('/reviews', db.postNewReview);
// Use connect method to connect to the Server
//



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
