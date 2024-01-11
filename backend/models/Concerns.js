const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const concernSchema = new Schema({
    course: {type: String, required: true},
    title: {type: String, required: true},
    instructor: {type: String, required: true},
    concern: {type: String, required: true},
    resolved: {type: Boolean, required: false}
})

concernSchema.set('timestamps', true);

module.exports = mongoose.model('concern', concernSchema, 'concerns');