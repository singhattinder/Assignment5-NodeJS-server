var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);


function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findUserByCredentials(credentials) {
     return userModel.findOne(credentials,  {password: -1});
}

function updateUser(studentId, user) {
    return userModel.updateOne({
        _id: studentId,
    }, {
        $set: {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    })
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser

};

module.exports = api;
