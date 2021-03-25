const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'reviews_service';

// Create a new MongoClient
const client = new MongoClient(url);


const getReviews = (request, response) => {
  const productID = Number(request.query.product_id);
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('review', (err, collection) => {
      collection.find({product_id: productID}).toArray(function(err, data) {
        const reviewData = {
          "product":productID.toString(),
          "page": 0,
          "count": 0,
          "results": []
        }
        for(let i = 0; i < data.length; i++) {
          const reviewQueryResult =
            {
              "review_id":'',
              "rating":'',
              "summary":'',
              "recommend":'',
              "response": '',
              "body":'',
              "date":'',
              "reviewer_name":'',
              "helpfulness":'',
              "photos": []
          }
          if(data[i].recommended === "1") {
            data[i].recommended = false;
          } else {
            data[i].recommended = true;
          }

          if(data[i].response === 'null') {
            data[i].response = null;
          }
          reviewQueryResult["review_id"] = data[i].id;
          reviewQueryResult["rating"] = data[i].rating;
          reviewQueryResult["summary"] = data[i].summary;
          reviewQueryResult["recommend"] = data[i].recommended;
          reviewQueryResult["response"] = data[i].response;
          reviewQueryResult["body"] = data[i].body;
          reviewQueryResult["date"] = data[i].date;
          reviewQueryResult["reviewer_name"] = data[i].reviewer_name;
          reviewQueryResult["helpfulness"] = data[i].helpfulness;
          reviewQueryResult["photos"] = data[i].review_photos;
          reviewData["results"].push(reviewQueryResult);
        }
        response.status(200).json(reviewData);
      });
    });

  });

  //client.close();
}

const getMetaReviews = (request, response) => {
  const productID = Number(request.query.product_id);
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('review', (err, collection) => {
      const metaReviewData = {
        "product_id": productID,
        "ratings": {
          1: '0',
          2: '0',
          3: '0',
          4: '0',
          5: '0'
        },
        "recommended": {
          "true": '0',
          "false": '0',
        },
        "characteristics": {}


      };
      collection.find({product_id: productID}).toArray(function(err, data) {
        response.status(200).json(metaReviewData);
      });
    });

  });

  //client.close();
}

module.exports.getReviews = getReviews;
module.exports.getMetaReviews = getMetaReviews;