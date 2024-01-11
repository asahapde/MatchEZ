const multer = require('multer');
const xlsx = require('xlsx');
const setupSchema = require('../models/Setup');
const courseSchema = require('../models/Course');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, "CourseSetupSample.xlsx");
    }
})

const uploadSetup = multer({ storage: storage }).fields([{ name: "spreadsheet" }])

router.post('/upload', uploadSetup, async (req, res) => {

    
    const courseCode = req.body.code.toUpperCase();
    const courseName = req.body.name.toUpperCase();
    const lecHours = req.body.lecHours.toUpperCase();
    const labHours = req.body.labHours.toUpperCase();
    const section = req.body.section.toUpperCase();

    let wb = xlsx.readFile("./uploads/CourseSetupSample.xlsx");

    let ws = wb.Sheets[wb.SheetNames[0]];

    let setupData = xlsx.utils.sheet_to_json(ws, { header: "A" });

    let courseSetup1 = setupData.filter(e => e.hasOwnProperty(courseCode) && e.hasOwnProperty(courseName));

    let allowed = [courseCode, courseName, lecHours, labHours, section];
    let courseSetup2 = [];

    courseSetup1.forEach(element => {
        courseSetup2.push(Object.keys(element)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = element[key];
                return obj;
            }, {}));
    })

    let finalData = courseSetup2.map(element => {
        let result = {
            courseCode: element[courseCode],
            courseName: element[courseName],
            lecHours: element[lecHours],
            labHours: element[labHours],
            section: element[section]
        }

        return result;
    });

    try {
        
        await setupSchema.deleteMany({});
    
        for (let i = 1; i < finalData.length; i++) {
            await setupSchema.create(finalData[i]);
            await courseSchema.updateOne({course: finalData[i].courseCode}, {name: finalData[i].courseName});
         }
    } catch (e) {
        console.log(e);
        res.status(500).send({err: "Failed to upload spreadsheet"})
        return;
    }
    
    res.send({ 'message': 'File Uploaded!', 'finalData':finalData});
})

router.get('', async (req, res) => {
 setupSchema.find({}, (error, course) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (course.length == 0) return res.status(404).json({ message: `No courses found` });
            else res.status(200).json(instructor);
        }
    })
})

module.exports = router;