module.exports = function (app) {

    app.get('/api/quiz', findAllQuizes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.post('/api/quiz/:quizId', submitQuiz);
    app.get('/api/quiz/:quizId/submissions', loadSubmissions);


    var quizzes =require('./quizzes.json');
    var submissionModel = require('../models/submission/submission.model.server');

    function findAllQuizes(req, res) {
        res.json(quizzes);
    }
    function loadSubmissions (req, res) {
        var quizId = req.params.quizId;
        submissionModel.findSubmissionForQuiz(quizId)
            .then(function (submission) {
                res.json(submission);
            })
    }
    
    function submitQuiz(req, res) {
        var submission = req.body;
        var quizId = req.params.quizId;
        submissionModel.submitQuiz(submission, quizId, 'user')
            .then(function (submission) {
                res.json(submission);
            })
    }

    function findQuizById(req, res) {
        var quiz  = quizzes.filter(function (q) {
            return q._id == req.params.quizId
        });
        res.json(quiz[0]);
    }
};

