var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({

    resave:false,
    saveUninitialized:true,
    secret:'icecream'

}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://nodejs-client-assignment5.herokuapp.com'");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



var userService = require('./services/user.service.server');
userService(app);
var sectionService = require('./services/section.service.server');
sectionService(app);


var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});