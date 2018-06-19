var mongoose = require('mongoose');
var enrollmentSchema = mongoose.Schema({
    section: {
        type: mongoose.Schema.ObjectId,
        ref: 'SectionModel'},
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel'},
    grade: {
        type: String,
        default: 'W'}
},{collection: 'enrollments'});

module.exports = enrollmentSchema;