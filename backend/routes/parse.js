const multer = require('multer');
const xlsx = require('xlsx');
const courseSchema = require('../models/Course');
const User = require("../models/User");
const setupSchema = require('../models/Setup');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, "spreadsheet.xlsx");
    }
})

const upload = multer({ storage: storage }).fields([{ name: "spreadsheet" }])

router.post('/upload', upload, async (req, res) => {

    const Courses = req.body.courses.toUpperCase();
    const CurrrentEnrollment = req.body.currentEnrollment.toUpperCase();
    const PreviousEnrollment = req.body.previousEnrollment.toUpperCase();
    const PreviousHours = req.body.preivousHours.toUpperCase();
    const LabHours = req.body.labHours.toUpperCase();

    console.log(Courses)

    let wb = xlsx.readFile("./uploads/spreadsheet.xlsx");

    let ws = wb.Sheets[wb.SheetNames[0]];

    let data = xlsx.utils.sheet_to_json(ws, { header: "A" });


    let parse1 = data.filter(element => element.hasOwnProperty(Courses) && element.hasOwnProperty(LabHours)
        && element.hasOwnProperty(CurrrentEnrollment) && element.hasOwnProperty(PreviousEnrollment) && element.hasOwnProperty(PreviousHours));


    const allowed = [Courses, LabHours, CurrrentEnrollment, PreviousEnrollment, PreviousHours, "hrsEst"];

    let parse2 = [];

    parse1.map(element => {
        let estimate = 0;

        estimate = Math.ceil((element[PreviousHours] / element[PreviousEnrollment]) * element[CurrrentEnrollment]);

        console.log(estimate)

        element["hrsEst"] = estimate;

        return element;
    })


    parse1.forEach(element => {
        parse2.push(Object.keys(element)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = element[key];
                return obj;
            }, {}));
    })

    let finalData = parse2.map(element => {
        let result = {
            course: element[Courses],
            labHrs: element[LabHours],
            prevenrol: element[PreviousEnrollment],
            currenrol: element[CurrrentEnrollment],
            hrsest: element["hrsEst"],
            prevhrs: element[PreviousHours],
        }

        return result;
    });

    try {

        await courseSchema.deleteMany({});

        for (let i = 1; i < finalData.length; i++) {
            await courseSchema.create(finalData[i]);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ err: "Failed to upload spreadsheet" })
        return;
    }

    res.send({ 'message': 'File Uploaded!!' })
})

router.get('', async (req, res) => {

    try {
        let courses = await courseSchema.find({});
        res.send(courses);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'No Courses found' });
    }
})

router.get('/instructorCourses:email', async (req, res) => {
    let email = req.params.email;
    console.log(email)

    try {
        let courses = await courseSchema.find({});

        let instructorCourses = await User.findOne({ email: email });

        let response = courses.filter(c => {
            let found = instructorCourses.courses.find(a => a === c.course)
            if (found) {
                return true;
            }
            else {
                return false;
            }
        })

        res.send(response);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'No Courses found' });
    }
})


router.post('/editHours', async (req, res) => {
    const courseName = req.body.course.toUpperCase();
    const hours = req.body.hours;

    courseSchema.findOneAndUpdate({ course: courseName }, { hrsest: hours }, { new: true }, (error, course) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (!course) return res.status(404).json({ message: `${courseName} was not found` });
            else res.status(200).json({ message: `${courseName} has been edited.`, course: course });
        }
    })
})


module.exports = router;
