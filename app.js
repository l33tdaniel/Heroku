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