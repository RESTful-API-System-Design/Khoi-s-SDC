const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews_service', {useNewUrlParser: true})
.then(() => console.log('Mongo connected'))
.catch(() => console.log('connection fails'));

let reviewSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, unique: true},
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommended: String,
  reported: String,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number
});

let Review = mongoose.model('Review', reviewSchema);

function find (name, query, cb) {
  mongoose.connection.db.collection(name, function (err, collection) {
     collection.find(query).toArray(cb);
 });
}

let getReviews = (request, response) => {
  const productID = Number(request.query.product_id);
  find('review', {product_id: productID}, (err, data) => {
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
  })
}

let getMetaReview = (request, response) => {
  const productID = Number(request.query.product_id);
  find('review', {product_id: productID}, (err, data) => {
    const metaReviewData = {
      "product_id": productID,
      "ratings": {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      "recommended": {
        "true": 0,
        "false": 0,
      },
      "characteristics": {}
    };
    let arrayOfValue = [];
    let arrayAnswer = [];

    for(let i = 0; i < data.length; i++) {
      for(let key in metaReviewData["ratings"]) {
        if(Number(key) === data[i].rating) {
          metaReviewData["ratings"][key]++;
        }
      }

      for(let key in metaReviewData["recommended"]) {
        if(key === "false" && data[i].recommend === 1) {
          metaReviewData["recommended"][key]++;
        } else  if(key === "true" && data[i].recommend === 0) {
          metaReviewData["recommended"][key]++;
        }
      }
      arrayOfValue.push(data[i].characteristic_value_perID);
      metaReviewData["characteristics"][data[i].characteristic_name[i].name] = {
        id: data[i].characteristic_name[i].id,
        value: 0
      };
    }

    for(let key in metaReviewData["characteristics"]) {
      for(let i = 0; i < arrayOfValue.length; i++) {
        for(let j = 0; j < arrayOfValue[i].length; j++) {
          if(metaReviewData["characteristics"][key].id === arrayOfValue[i][j].characteristic_id) {
            metaReviewData["characteristics"][key].value = metaReviewData["characteristics"][key].value + arrayOfValue[i][j].value;
          }
        }
      }
      metaReviewData["characteristics"][key].value = metaReviewData["characteristics"][key].value / data.length;
    }
    response.status(200).json(metaReviewData);
  });
}

const postNewReview = (request, response) => {
  const {product_id, rating, summary, body, recommend, reported, helpfulness, name, email, photos, characteristic} = request.body;
};

module.exports.getReviews = getReviews;
module.exports.getMetaReview = getMetaReview;
module.exports.postNewReview = postNewReview;