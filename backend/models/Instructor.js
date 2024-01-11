const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  
    instructorName: {type: String, required: false},
    instructorEmail : {type: String, required: false},
})

instructorSchema.set('timestamps', true);
module.exports = mongoose.model('instructor', instructorSchema,'instructor');
