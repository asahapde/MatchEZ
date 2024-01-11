const multer = require('multer');
const xlsx = require('xlsx');
const applicationSchema = require('../models/Application');
const express = require('express');
const e = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, "SampleApplicantInput_updated.xlsx");
    }
})

const uploadApplicant = multer({ storage: storage }).fields([{ name: "SampleApplicantInput_updated" }])

router.post('/uploadApplicant', uploadApplicant, async (req, res) => {

    const CourseCode = req.body.courseCode.toUpperCase();
    const ApplicantName = req.body.applicantName.toUpperCase();
    const ApplicantEmail = req.body.applicantEmail.toUpperCase();
    const ApplicantStatus = req.body.applicantStatus.toUpperCase();
    const NumberOfHours = req.body.numberOfHours.toUpperCase();
    const CourseRank = req.body.courseRank.toUpperCase();
    const From = req.body.from.toUpperCase();
    const To = req.body.to.toUpperCase();


    let wb = xlsx.readFile("./uploads/SampleApplicantInput_updated.xlsx");

    let ws = wb.Sheets[wb.SheetNames[0]];

    let applicantData = xlsx.utils.sheet_to_json(ws, { header: "A" });

    let applicantParse1 = applicantData.filter(e => e.hasOwnProperty(CourseCode) && e.hasOwnProperty(ApplicantName) && e.hasOwnProperty(ApplicantEmail) && e.hasOwnProperty(ApplicantStatus) && e.hasOwnProperty(NumberOfHours) && e.hasOwnProperty(CourseRank));

    applicantParse1.forEach(element => {
        let questions = Object.keys(element).filter(key => key >= From && key <= To);
        element['questions'] = [];

        for(let i = 0; i < questions.length; i += 2){
            let question = element[questions[i]];
            if( element[questions[i+1]] === undefined){
                answer = "No Response";
            }else{
                answer = element[questions[i+1]];
            }
            element['questions'].push({question: question, answer: answer});
        }
    })
    let allowed = [CourseCode, ApplicantName, ApplicantEmail, ApplicantStatus, NumberOfHours, CourseRank, "questions"];
    let applicantParse2 = [];

    applicantParse1.forEach(element => {
        applicantParse2.push(Object.keys(element)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = element[key];
                return obj;
            }, {}));
    })

    let finalData = applicantParse2.map(element => {
        let result = {
            courseCode: element[CourseCode],
            applicantName: element[ApplicantName],
            applicantEmail: element[ApplicantEmail],
            applicantStatus: element[ApplicantStatus],
            numberOfHours: element[NumberOfHours],
            courseRank: element[CourseRank],
            questions: element['questions']
        }

        return result;
    });

    try {

        await applicationSchema.deleteMany({});

        for (let i = 1; i < finalData.length; i++) {
            await applicationSchema.create(finalData[i]);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ err: "Failed to upload spreadsheet" })
        return;
    }

    res.send({ 'message': 'File Uploaded!', 'finalData': finalData });
})

router.get('', async (req, res) => {
    applicationSchema.find({}, (error, ta) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (ta.length == 0) return res.status(404).json({ message: `No Ta's found` });
            else res.status(200).json(ta);
        }
    })
})




module.exports = router;
