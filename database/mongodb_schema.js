const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews_service', {useNewUrlParser: true})
.then(() => console.log('Mongo connected'))
.catch(() => console.log('connection fails'));

// let reviewSchema = mongoose.Schema({
//   // TODO: your schema here!
//   id: {type: Number, unique: true},
//   product_id: Number,
//   rating: Number,
//   date: Date,
//   summary: String,
//   body: String,
//   recommended: String,
//   reported: String,
//   reviewer_name: String,
//   reviewer_email: String,
//   response: String,
//   helpfulness: Number
// });

// let Review = mongoose.model('Review', reviewSchema);

let insert = (dataObj) => {
  Review.insert(dataObj, (err, result) => {
    if(err) {
      console.log('error in insert method!');
    } else {
      console.log('inserted data in insert method!');
    }
  });
}

let updateReviewData = (callback) => {
  //return Review.update({"_id" : ObjectId("6052984da999e6f81c2ef62e")}, {$set: {test2: "testing againggggg"}});
  //   Review.coll01.find().forEach(function (doc1) {
  //     var doc2 = db.coll02.findOne({ id: doc1.id }, { name: 1 });
  //     if (doc2 != null) {
  //         doc1.name = doc2.name;
  //         db.coll01.save(doc1);
  //     }
  // });
  console.log(Review);
  // Review.find({id: 3})
  // .then((data) => callback(null, data))
  // .catch((err) => console.log('err in schema.js'));
}

module.exports.save = insert;
module.exports.updateReviewData = updateReviewData;