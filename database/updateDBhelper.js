const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'reviews_service';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
app.get('/testing', (req, res) => {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('review', (err, collection) => {
      db.collection('characteristic', (err, collectionCharacteristic) => {
      collectionCharacteristic.find().forEach(characteristic => {
          collection.updateMany({product_id: characteristic.product_id}, {
            $set: {
              characteristic: {
                id: characteristic.id,
                name: characteristic.name
              }
            }
          })
        });
       })
    });
  });
    client.close();
});