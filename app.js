var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require('./bin/auth');
var cors = require("cors");
var fs = require('fs'); 


var usersRouter = require('./routes/api/user');
// I'm adding the clark thing in
var clarkRouter = require('./routes/clark');
 
var app = express();
 
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'client/build')));

app.use('/api/*', (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ','');
    auth.verify(token)
    .then(() => { 
        console.log("Auth success: ", token);
        next(); })
    .catch((error) => {
        console.log("Auth failure: ", token);
        console.log(error);
        res.status(403).send({'status' : JSON.stringify(error)});
    });
})
 
app.use('/api/user', usersRouter);
// also added this in down here.
app.use('/clark', clarkRouter);
 
// Test api connection
app.get("/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});
 
// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});
 

fs.appendFile('goals.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });


   
  

module.exports = app;

// something that I've learned is that this is where we link the routes. for app.use
// we are able to add another path for us to look for something