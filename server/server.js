const express = require('express');
const bodyParser = require('body-parser');
const parse = require('csv-parse');
const updateData = require('../database/mongodb_schema.js');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let port = 3000;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'reviews_service';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server

const app = express();

app.use(bodyParser.json());

app.get('/testing', (req, res) => {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('review', (err, collection) => {
      collection.update({id : 3}, {$set: {test3: "testing againggggg"}});
    });

    client.close();
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});