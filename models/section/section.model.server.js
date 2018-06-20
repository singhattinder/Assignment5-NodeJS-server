var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');

var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId})
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
      _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function updateSectionById(sectionId, sectionName, sectionSeats) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $set: {name: sectionName, seats: sectionSeats}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: 1}
    });
}
function deleteSection(sectionId) {
    return sectionModel.remove({
        _id: sectionId
    });
}

function getSectionById(sectionId) {
    return sectionModel.findOne({
        _id: sectionId
    });
}

var api = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    deleteSection: deleteSection,
    getSectionById: getSectionById,
    updateSectionById: updateSectionById
};

module.exports = api;