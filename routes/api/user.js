var express = require('express');
var router = express.Router();
var db = require('../../bin/db');

async function upsertUser(profile) {
    const query = {
      googleId: profile.googleId,
      email: profile.email,
      givenName: profile.givenName,
      familyName: profile.familyName,
      imageUrl: profile.imageUrl
    };
    const update = { $set: query };
    const options = { upsert: true };
    const result = await db.getDb()
      .collection('users')
      .updateOne(query, update, options);
      
    return result;
  }

router.post('/', function(req, res, next) {
    const profile = req.body; 
    console.log('POST /api/users: ', profile);
    upsertUser(profile)
    .then((mongoWrite) => { 
      if(mongoWrite.acknowledged) {
        res.status(201).send({'status' : req.baseUrl + req.path + ' user saved.'});
      } else {
        res.status(500).send({'status': req.baseUrl + req.path + ' failed to record user.'});
      }
    })
    .catch((error) => {
      res.status(500).send({'status': req.baseUrl + req.path + ' ' + JSON.stringify(error)});
    })
  })

  module.exports = router;