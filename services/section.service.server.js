module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);

    var sectionModel = require('../models/section/section.model.server');

    function createSection(req, res) {
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
}