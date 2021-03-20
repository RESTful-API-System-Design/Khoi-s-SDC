const express = require('express');
const bodyParser = require('body-parser');
const parse = require('csv-parse');
const updateData = require('../database/mongodb_schema.js');
const fs = require('fs');
const db = require('../database/postgreSQL_config.js');
const assert = require('assert');
let port = 3000;


const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/reviews/:id/:count?/:sort?/:page?', db.getReview);
app.get('/reviews/meta/:product_id');
app.post('/reviews/:product_id?/:rating?/:summary?/:body?/:recommend?/:name?/:email?/:photos?/:characteristic?');
app.put('/reviews/:review_id/helpful');
app.put('/reviews/:review_id/report');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
