const multer = require('multer');
const xlsx = require('xlsx');
const instructorSchema = require('../models/Instructor');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, "InstructorSetupSample.xlsx");
    }
})

const uploadInstructor = multer({ storage: storage }).fields([{ name: "spreadsheet" }])

router.post('/uploadInstructors', uploadInstructor, async (req, res) => {

    
    const InstructorName = req.body.instructorName.toUpperCase();
    const InstructorEmail = req.body.instructorEmail.toUpperCase();
    

    console.log(InstructorName)

    let wb = xlsx.readFile("./uploads/InstructorSetupSample.xlsx");

    let ws = wb.Sheets[wb.SheetNames[0]];

    let instructorData = xlsx.utils.sheet_to_json(ws, { header: "A" });
    console.log(instructorData);

    let instructorParse1 = instructorData.filter(e => e.hasOwnProperty(InstructorName) && e.hasOwnProperty(InstructorEmail));

    let allowed = [InstructorName, InstructorEmail];
    let instructorParse2 = [];

    instructorParse1.forEach(element => {
        instructorParse2.push(Object.keys(element)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = element[key];
                return obj;
            }, {}));
    })

    let finalData = instructorParse2.map(element => {
        let result = {
            instructorName: element[InstructorName],
            instructorEmail: element[InstructorEmail]
        }

        return result;
    });

    try {
        
        await instructorSchema.deleteMany({});
    
        for (let i = 1; i < finalData.length; i++) {
            await instructorSchema.create(finalData[i]);
         }
    } catch (e) {
        console.log(e);
        res.status(500).send({err: "Failed to upload spreadsheet"})
        return;
    }
    
    res.send({ 'message': 'File Uploaded!', 'finalData':finalData});
})

router.get('', async (req, res) => {
 instructorSchema.find({}, (error, instructor) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (instructor.length == 0) return res.status(404).json({ message: `No Instructor's found` });
            else res.status(200).json(instructor);
        }
    })
})

module.exports = router;
