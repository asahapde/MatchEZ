const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type:{
        type: String,
        default: "Course instructor",
    },
    courses:{
        type:Array,
        default: null,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);