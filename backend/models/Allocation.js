const { array } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allocationSchema = new Schema({
    course: { type: String, required: false },
    allocations: {type: Array, default: []}
})

allocationSchema.set('timestamps', true);
module.exports = mongoose.model('allocation', allocationSchema, 'allocation');