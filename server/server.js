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
app.get('/reviews/', db.getReview);
app.get('/reviews/meta', db.getMetaReview);
app.post('/reviews', db.postNewReview);
app.put('/reviews/:review_id/helpful', db.modifyReviewHelpful);
app.put('/reviews/:review_id/report', db.modifyReviewReport);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
