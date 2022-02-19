var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// I'm adding the clark thing in
var clarkRouter = require('./routes/clark');
 
var app = express();
 
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'client/build')));
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
// also added this in down here.
app.use('/clark', clarkRouter);
 
// Test api connection
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
 
// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});
 
module.exports = app;

// something that I've learned is that this is where we link the routes. for app.use
// we are able to add another path for us to look for something