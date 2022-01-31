const { MongoClient } = require('mongodb');
const path = require('path');

const credentials = path.resolve(__dirname, '../private/X509-cert.pem');

const client = new MongoClient('<mongodb+srv://cluster0.l7wvm.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority>', {
  sslKey: credentials,
  sslCert: credentials
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('sample_airbnb');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
