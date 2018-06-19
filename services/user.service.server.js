
module.exports = function (app) {

app.get('/api/user', findAllUsers);
app.get('/api/user/:userId', findUserById);
app.post('/api/user', createUser);
app.get('/api/profile', profile);
app.post('/api/logout', logout);
app.post('/api/login', login);
app.put('/api/profile', updateUser);
var userModel = require('../models/user/user.model.server');

function findAllUsers(req, res) {
    userModel.findAllUsers()
        .then(function (users)  {
            res.send(users);
        })
}
function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
        .then(function (user)  {
            res.json(user);
        })
}

function login(req, res) {
    var credentials = req.body;
    userModel.findUserByCredentials(credentials)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.json(user);
        })
}

function profile(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    userModel.findUserById(studentId)
        .then(function (user) {
            res.json(user);
        });

}

function logout(req, res) {
    req.session.destroy();
    res.send(200);
}

function updateUser(req, res) {
    var user = req.body;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    userModel.updateUser(studentId, user)
        .then(function (user) {
            res.json(user);
        })
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.send(user);
        });
}
};
