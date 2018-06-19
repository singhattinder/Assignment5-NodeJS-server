module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel.findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }
    
    function enrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        }

        enrollmentModel.enrollStudentsInSection(enrollment)
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }
    
    function createSection(req, res) {
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
}