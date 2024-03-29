module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudents);
    app.delete('/api/student/section/:sectionId', unEnrollStudentInSection);
    app.delete('/api/section/:sectionId', deleteSection);
    app.get('/api/section/:sectionId', getSectionById);
    app.put('/api/section/:sectionId', updateSectionById);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel.findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function findSectionsForStudents(req, res) {
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudents(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            })
    }

    function getSectionById(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.getSectionById(sectionId)
            .then(function (section) {
                res.json(section);
            })
    }


    function enrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
               return enrollmentModel
                   .enrollStudentsInSection(enrollment)
            })
            .then(function (enrollment) {
            res.json(enrollment);
        })
    }

    function unEnrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .unEnrollStudentInSection(studentId, sectionId)
            }).then(function (enrollment) {
            res.json(enrollment);
        })


    }

    function deleteSection(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(function (section) {
                res.json(section);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
    function updateSectionById(req, res) {
        var section = req.body;
        var sectionId = req.params['sectionId'];
        sectionModel.updateSectionById(sectionId, section.name, section.seats)
            .then(function (section) {
                res.json(section);
            })
    }
};