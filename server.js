var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer1-2018');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.use(session({

    resave:false,
    saveUninitialized:true,
    secret:'hello'

}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var userService = require('./services/user.service.server');
userService(app);


app.listen(4000);