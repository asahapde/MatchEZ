const applicationSchema = require('../models/Application');
const express = require('express');
const router = express.Router();


router.get('/:course', async (req, res) => {
    console.log("hello");
    applicationSchema.find({courseCode : req.params.course}, (error, application) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (application.length == 0) return res.status(404).json({ message: 'No Applications found' });
            else res.status(200).json(application);
        }
    })
})

router.post('/setRankings', async (req, res) => {
    let {rankings, courseCode} = req.body;


    try{
        for(let i = 0; i < rankings.length; i++)
        {
            await applicationSchema.updateOne({courseCode: courseCode, applicantEmail: rankings[i]}, {profRank: i+1});
        }
    }catch(e){
        res.status(404).json({message: `Could not set rankings. Please try again.`})
        return;
    }

    res.send({message: `Rankings have been succesffuly set`});
})

module.exports = router;