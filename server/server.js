const express = require('express');
const bodyParser = require('body-parser');
const parse = require('csv-parse');
const updateData = require('../database/mongodb_schema.js');
const fs = require('fs');
const assert = require('assert');
let port = 3000;


const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

