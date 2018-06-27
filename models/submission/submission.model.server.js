var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');

var submissionModel = mongoose.model('SubmissionModel', submissionSchema);


function submitQuiz(submission, quizId, username) {
    return submissionModel.create({
        quizId: quizId,
        username: username,
        answers: submission
    });
}

function findSubmissionForQuiz(quizId) {
    return submissionModel.find({quizId: quizId})
}

function findSubmissionForUsername(username) {
    return submissionModel.find({username: username})
}



var api = {
    submitQuiz:  submitQuiz,
    findSubmissionForQuiz: findSubmissionForQuiz,
    findSubmissionForUsername: findSubmissionForUsername

};

module.exports = api;
