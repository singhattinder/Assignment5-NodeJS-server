var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentsInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

module.exports = {
    enrollStudentsInSection: enrollStudentsInSection
};