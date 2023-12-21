const mongoose = require('mongoose');
const User = require('./user.model');
const Survey = mongoose.model('Survey', surveySchema);


const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User
  },
  questionid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Survey
  }

});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String, 
    required: true,
  },
  answers: [answerSchema],

});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  answers: [answerSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});



module.exports = mongoose.model('Survey', surveySchema);