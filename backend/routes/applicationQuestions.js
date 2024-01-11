const express = require('express');
const router = express.Router();
const Question = require("../models/Questions.js");
const setupSchema = require('../models/Setup');

router.post('', (req, res) => {
  let instructorQuestions = new Question({
    course: req.body.course,
    questions: req.body.questions
  })
  instructorQuestions.save(function (err) {
    if (err) {
      console.error(err.message);
      res.send(err.message);
    } else {
      res.send({ savedMessage: "Application Questions Saved Sucessfully" });
    }
  });

});

router.get('/getApplications', async (req, res) => {
  try {
    let response = await Question.find({});
    let courseNames = await setupSchema.find({});
    if (response.length > 0) {
      response = response.map(a => {
        let name = courseNames.find(b => b.courseCode === a.course)
        let obj = {
          "Course Code": a.course,
          "Course Name": name.courseName
        }
        for (let i = 0; i < a.questions.length; i++) {
          obj[`Question ${i + 1}`] = a.questions[i];
        }
        return obj;
      })
      res.send(response);
    } else {
      res.send({ err: "No applications have been submitted yet" });
    }
  } catch (e) {
    console.log(e);
    res.send({ err: "Could not get applications" })
  }
})


module.exports = router;