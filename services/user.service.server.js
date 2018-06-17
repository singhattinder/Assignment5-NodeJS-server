
module.exports = function (app) {

app.get('/api/user', findAllUsers);
app.post('/api/user', createUser);
var userModel = require('../models/user/user.model.server');

function findAllUsers(req, res) {
    userModel.findAllUsers()
        .then(function (users)  {
            res.send(users);
        })
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (status) {
            res.send(status);
        });
}
};
