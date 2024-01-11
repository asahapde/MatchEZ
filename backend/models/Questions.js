const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({

    course:{
        type:String,
        required:false
    },

    questions:{
        type: Array
    },

  
},);

QuestionsSchema.set('timestamps', true);

const Question = mongoose.model('question', QuestionsSchema);

module.exports = Question;