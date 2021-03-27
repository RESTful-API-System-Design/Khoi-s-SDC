const express = require('express');
const bodyParser = require('body-parser');
const parse = require('csv-parse');
const db = require('../database/postgreSQL_config.js');
const assert = require('assert');
//const loaderio = require('../loaderio-2d2ec07ed6ecec6123084973a5ef072d.txt');
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
app.get('/loaderio-2d2ec07ed6ecec6123084973a5ef072d/', (req, res) => {
  res.sendFile(__dirname + '/loader.txt');
});
app.get('/reviews/', db.getReview);
app.get('/reviews/meta', db.getMetaReview);
app.post('/reviews', db.postNewReview);
app.put('/reviews/:review_id/helpful', db.modifyReviewHelpful);
app.put('/reviews/:review_id/report', db.modifyReviewReport);

app.listen(port, () => {
  console.log(`listening on port ${port}, postgreSQL`);
});
