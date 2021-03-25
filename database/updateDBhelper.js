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

app.get('/testing', (req, res) => {
  //   client.connect(function(err) {
  //     assert.equal(null, err);
  //     console.log("Connected successfully to server");

  //     const db = client.db(dbName);

  //     db.collection('review', (err, collection) => {
  //       db.collection('characteristics', (err, collectionCharacteristic) => {
  //         collectionCharacteristic.find().forEach(characteristic => {
  //           collection.updateMany({product_id: characteristic.product_id}, {
  //             $push: {
  //               characteristic_name: {
  //                 id: characteristic.id,
  //                 name: characteristic.name
  //               }
  //             }
  //           })
  //         });
  //        })
  //     });
  //   });
  //   res.send('seeding....');
  //     client.close();
  // });

  // app.get('/testing2', (req, res) => {
  //   client.connect(function(err) {
  //     assert.equal(null, err);
  //     console.log("Connected successfully to server");

  //     const db = client.db(dbName);

  //     db.collection('review', (err, collection) => {
  //       db.collection('review_characteristic', (err, collectionCharacteristic) => {
  //         collectionCharacteristic.find().forEach(characteristic => {
  //           collection.updateMany({id: characteristic.review_id}, {
  //             $push: {
  //               characteristic_value_perID: {
  //                 id: characteristic.id,
  //                 characteristic_id: characteristic.characteristic_id,
  //                 value: characteristic.value
  //               }
  //             }
  //           })
  //         });
  //        })
  //     });
  //   });
  //   res.send('seeding2....');
  //     client.close();
  // });