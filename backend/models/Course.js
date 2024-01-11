const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    course: {type: String, required: false},
    name: {type: String, required: false},
    labHrs: {type: Number, required: false},
    prevenrol : {type: Number, required: false},
    currenrol : {type: Number, required: false},
    hrsest : {type: Number, required: false},
    prevhrs : {type: Number, required: false},
})

courseSchema.set('timestamps', true);

module.exports = mongoose.model('course', courseSchema, 'courses');
