const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const setupSchema = new Schema({
    courseCode: {type: String, required: false},
    courseName: {type: String, required: false},
    labHours : {type: Number, required: false},
    lecHours : {type: Number, required: false},
    section : {type: Number, required: false},
})

setupSchema.set('timestamps', true);

module.exports = mongoose.model('setup', setupSchema, 'setup');