const { MongoClient } = require('mongodb');
const path = require('path');

const credentials = path.resolve(__dirname, '../private/X509-cert.pem');

const client = new MongoClient('mongodb+srv://cluster0.l7wvm.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials
});

let dbConnection;
const database = client.db("sample_training");
const collection = database.collection("companies");

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }


      // changing this to sample training allows clark to work..
      // dbConnection = db.db('sample_training');
      dbConnection = db.db('sample_airbnb');
      console.log('Successfully connected to MongoDB.');
      
      return callback();
    });
  },

  // simple getter like from object oriented
  getDb: function () {
    return dbConnection;
  },
};

// I ended up adding some stuff for a react login