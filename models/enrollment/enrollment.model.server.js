var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentsInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function findSectionsForStudents(studentId ) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section');
}
function unEnrollStudentInSection(studentId, sectionId) {
    return enrollmentModel.remove({
        student: studentId,
        section: sectionId
    })
}

module.exports = {
    enrollStudentsInSection: enrollStudentsInSection,
    findSectionsForStudents: findSectionsForStudents,
    unEnrollStudentInSection: unEnrollStudentInSection
};