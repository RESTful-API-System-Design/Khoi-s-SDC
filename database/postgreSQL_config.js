const pool = require('./database_config.js');

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
          "helpfulness":''
      }

      reviewQueryResult["review_id"] = results.rows[i].id;
      reviewQueryResult["rating"] = results.rows[i].rating;
      reviewQueryResult["summary"] = results.rows[i].summary;
      reviewQueryResult["response"] = results.rows[i].response;
      reviewQueryResult["body"] = results.rows[i].body;
      reviewQueryResult["date"] = results.rows[i].date;
      reviewQueryResult["reviewer_name"] = results.rows[i].reviewer_name;
      reviewQueryResult["helpfulness"] = results.rows[i].helpfulness;
      if(results.rows[i].recommended === 1) {
        reviewQueryResult["recommend"] = results.rows[i][false];
      } else {
        reviewQueryResult["recommend"] = results.rows[i][true];
      }
      reviewData["results"].push(reviewQueryResult);
    }
    response.status(200).json(reviewData);
  })
}

const getMetaReview = (request, response) => {
  pool.databaseConfig.query();
  if(error) {
    throw error;
  }
  response.status(200).json(results.rows);
}



module.exports.getReview = getReview;
