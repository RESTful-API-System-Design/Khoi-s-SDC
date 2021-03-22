const pool = require('./database_config.js');

/*

------------------------------------------------------------
|                        GET REVIEW                        |
------------------------------------------------------------

*/
const getReview = (request, response) => {
  const productID = parseInt(request.params.id);
  const count = parseInt(request.params.count);

  pool.databaseConfig.query(`SELECT * FROM reviews JOIN reviews_photo ON reviews.id = reviews_photo.review_id WHERE product_id = $1
                            ${count ? `FETCH FIRST ${count} ROW ONLY`: ''}`,
                            [productID], (error, results) => {
    if(error) {
      throw error;
    }
    const reviewData = {
      "product":productID,
      "page":'',
      "count":count,
      "results": []
    }
    for(let i = 0; i < results.rows.length; i++) {
      const reviewQueryResult =
        {
          "review_id":'',
          "rating":'',
          "summary":'',
          "recommend":'',
          "response":'',
          "body":'',
          "date":'',
          "reviewer_name":'',
          "helpfulness":'',
          "photos": []
      }

      reviewQueryResult["review_id"] = results.rows[i].id;
      reviewQueryResult["rating"] = results.rows[i].rating;
      reviewQueryResult["summary"] = results.rows[i].summary;
      reviewQueryResult["response"] = results.rows[i].response;
      reviewQueryResult["body"] = results.rows[i].body;
      reviewQueryResult["date"] = results.rows[i].date;
      reviewQueryResult["reviewer_name"] = results.rows[i].reviewer_name;
      reviewQueryResult["helpfulness"] = results.rows[i].helpfulness;
      reviewQueryResult["photos"].push({
        id: results.rows[i].photo_id,
        url: results.rows[i].url
      });
      if(results.rows[i].recommended === 1) {
        reviewQueryResult["recommend"] = results.rows[i][false];
      } else {
        reviewQueryResult["recommend"] = results.rows[i][true];
      }
      reviewData["results"].push(reviewQueryResult);
    }
    response.status(200).json(results.rows);
  })
}
/*

------------------------------------------------------------
|                    GET META DATA REVIEW                  |
------------------------------------------------------------

*/
const getMetaReview = (request, response) => {
  pool.databaseConfig.query('', (error, results) => {
    const metaReviewData = {
      "product_id": "2",
      "ratings": {},
      "recommended": {},
      "characteristics": {}
    };

    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/*

------------------------------------------------------------
|                     POST NEW REVIEW                      |
------------------------------------------------------------

*/
const postNewReview = (request, response) => {
  const {product_id, rating, summary, body, recommend, name, email, photos, characteristic} = request.body;
  console.log(request.body);
  pool.databaseConfig.query('SELECT MAX(id) FROM reviews')
    .then(result => {
      let max = result.rows[0].max + 1;
      pool.databaseConfig.query('INSERT INTO reviews (id, product_id, rating, date, summary, body, recommended, reviewer_name, reviewer_email, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)' ,[max, product_id, rating, new Date(), summary, body, recommend, name, email, 0, 0], (error, results) => {
        if(error) {
          throw error;
        }
        console.log('inserted review into reviews table');
      });

      //PHOTO INSERT
      pool.databaseConfig.query('SELECT MAX(photo_id) FROM reviews_photo', (err, resultPhotoId) => {
        maxPhotoId = resultPhotoId.rows[0].max + 1;
        for(let i = 0; i < photos.length; i++) {
          pool.databaseConfig.query('INSERT INTO reviews_photo (photo_id, review_id, url) VALUES ($1, $2, $3)', [maxPhotoId + i, max, photos[i]], (err, data) => {
            if(err) {
              throw err;
            }
          })
        }
        console.log('inserted url to reviews_photo table');
      })

      //CHARACTERISTIC INSERT
      pool.databaseConfig.query('SELECT MAX(id_pkey_characteristic) FROM characteristic_reviews', (err, resultCharacteristic) => {
        let maxCharacteristicPkeyID = resultCharacteristic.rows[0].max + 1;
        for(let key in characteristic) {
          console.log(maxCharacteristicPkeyID);
          pool.databaseConfig.query('INSERT INTO characteristic_reviews (id_pkey_characteristic, characteristic_id, review_id, value) VALUES ($1, $2, $3, $4)', [maxCharacteristicPkeyID++, max, key, characteristic[key]], (err, results) => {
            if(err) {
              throw err;
            }
            console.log('counter increase');
          });
        }
        console.log('inserted characteristics into characteristic_reviews table');
      });
    });
  response.status(201).json('new review posted to the database');
}
/*

------------------------------------------------------------
|                  MODIFY REVIEW BY HELPFUL                |
------------------------------------------------------------

*/

const modifyReviewHelpful = (request, response) => {
  const reviewID = request.params.review_id;
  pool.databaseConfig.query('SELECT helpfulness FROM reviews where id = $1', [reviewID], (err, result) => {
    if(err) {
      throw err;
    }
    let helpfulnessRating = result.rows[0].helpfulness + 1;
    pool.databaseConfig.query('UPDATE reviews SET helpfulness = $1 WHERE id = $2', [helpfulnessRating, reviewID], (err, helpfulnessUpdate) => {
      if(err) {
        throw err;
      }
      console.log('updated helpfulness count');
    });
    response.status(201).json('This review helpfulness increased!');
  });
};

/*

------------------------------------------------------------
|                      REPORT REVIEW                       |
------------------------------------------------------------

*/

const modifyReviewReport = (request, response) => {
  const reviewID = request.params.review_id;
  pool.databaseConfig.query('SELECT reported FROM reviews where id = $1', [reviewID], (err, result) => {
    if(err) {
      throw err;
    }
    let reportedBool = result.rows[0].reported;
    console.log('before', reportedBool);
    if(reportedBool === '0') {
      reportedBool = 1;
    } else {
      return response.status(201).json('This review was already reported');
    }
    console.log('after', reportedBool);
    pool.databaseConfig.query('UPDATE reviews SET reported = $1 WHERE id = $2', [reportedBool, reviewID], (err, reportedUpdate) => {
      if(err) {
        throw err;
      }
      console.log('updated reported boolean');
    });
    response.status(201).json('This review will be reported!');
  });
};

module.exports.getReview = getReview;
module.exports.postNewReview = postNewReview;
module.exports.modifyReviewHelpful = modifyReviewHelpful;
module.exports.modifyReviewReport = modifyReviewReport;



