const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    courseCode: {type: String, required: false},
    applicantName: {type: String, required: false},
    applicantEmail : {type: String, required: false},
    applicantStatus : {type: Number, required: false},
    numberOfHours : {type: Number, required: false},
    courseRank : {type: Number, required: false},
    questions: {type: Array, required: false},
    profRank: {type: Number, required: false}
})

applicationSchema.set('timestamps', true);
module.exports = mongoose.model('application', applicationSchema,'application');
