const TA = require('../models/Application');
const Course = require('../models/Course');
const Allocation = require('../models/Allocation');
const router = require('../routes/parse');

const matchRoutes = require('express').Router();

matchRoutes.get('', async (req, res) => {

    let { rankedApplicants, reserveApplicants, courses } = await formatApplicationData();
    let allocations = [];
    console.log("Ranked Applicants");
    console.log(rankedApplicants);
    allocate(rankedApplicants, courses);

    courses.forEach(a => {
        a.allocations.forEach(b => {
            allocations.push(b);
        })
    })

    reserveApplicants = reserveApplicants.filter(a => {
        let unique = allocations.find(b => b.email === a.email)
        if (unique === undefined)
            return true;
        else
            return false
    })
    console.log("Reserved Applicants");
    console.log(reserveApplicants)

    allocate(reserveApplicants, courses);

    try {
        await Allocation.deleteMany({});

        for (let i = 0; i < courses.length; i++) {
            let obj = {
                course: courses[i].course,
                allocations: courses[i].allocations
            }
            await Allocation.create(obj);
        }
    } catch (e) {
        res.status(500).send({ err: 'Failed to perform allocations' })
        return;
    }

    res.send({ message: 'Success' })
});

matchRoutes.get('/getAllocations', async (req, res) => {
    await Allocation.find({}, (error, application) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (application.length == 0) return res.status(404).json({ message: 'No Applications found' });
            else res.status(200).json(application);
        }
    })
})

matchRoutes.get('/getTaAllocations/:course', async (req, res) => {
    let course = req.params.course.toUpperCase();
    await Allocation.find({ course: course }, (error, application) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (application.length == 0) return res.status(404).json({ message: 'No Applications found' });
            else res.status(200).json(application);
        }
    })
})

matchRoutes.post('/editAllocations', async (req, res) => {
    const { taInfo, course } = req.body;

    try {
        await Allocation.updateOne(
            { course: course },
            { $pull: { allocations: { email: taInfo.email } } }
        );

        await Allocation.updateOne(
            { course: taInfo.course },
            { $push: { allocations: taInfo } }
        )
    } catch (e) {
        console.log(e)
        res.status(404).json({ err: `Could not make changes` });
        return;
    }

    res.send({ message: `Successfully updated` })
})

matchRoutes.post(`/addTA`, async (req, res) => {
    const { taInfo, course } = req.body;

    try {
        await Allocation.updateOne({ course: course },
            { $push: { allocations: taInfo } })
    } catch (e) {
        res.status(404).json({ err: `Could not Add TA` });
        return;
    }
    res.send({ message: `Successfully Updated` });
})

matchRoutes.post('/deleteAllocation', async (req, res) => {
    const { ta } = req.body;

    try {
        await Allocation.updateOne(
            { course: ta.course },
            {
                $pull: { allocations: { email: ta.email } }
            })
    } catch (e) {
        res.status(404).json({ err: `Could not delete TA allocation` });
        return;
    }
    res.send({message: `Successfully deleted TA allocation`})
})


// Helper Functions

function allocate(rankings, courses) {

    let fundable = rankings.filter(a => a.type === 1);
    let unfundable = rankings.filter(a => a.type === 2);
    let external = rankings.filter(a => a.type === 3);

    match(fundable, courses);
    match(unfundable, courses);
    match(external, courses);
}

function match(rankings, courses) {
    console.log("Rankings");
    console.log(rankings);
    console.log("Courses");
    console.log(courses);
    while (rankings.length > 0) {
        const course = courses.findIndex(c => c.course === rankings[0].course);
        // if(courses[course].hrsest <= 0){
        //     rankings = rankings.filter(a => a.course != courses[course].course)
        //     continue;
        // }
        if (courses[course].hrsest >= rankings[0].hrs) {
            courses[course].hrsest -= rankings[0].hrs;
            courses[course].allocations.push(rankings[0]);
            rankings = rankings.filter(a => a.email != rankings[0].email);
        }
        else if(courses[course].hrsest > 0) {
            rankings[0].hrs = courses[course].hrsest;
            courses[course].hrsest = 0;
            courses[course].allocations.push(rankings[0]);
            rankings = rankings.filter(a => a.course != courses[course].course)
            rankings = rankings.filter(a => a.email != rankings[0].email);
        }
        else{
            rankings = rankings.filter(a => a.course != courses[course].course)
        }
        // if (courses[course].hrsest >= 5) {
        //     courses[course].hrsest -= rankings[0].hrs
        //     courses[course].allocations.push(rankings[0])
        //     rankings = rankings.filter(a => a.email != rankings[0].email)
        // }
        // else if (courses[course].hrsest < 5) {
        //     rankings = rankings.filter(a => a.course != courses[course].course)
        // }
    }
}

async function formatApplicationData() {
    let applications = await TA.find({});
    let reserveApplicants = applications.filter(a => a.profRank === undefined)
    rankedApplicants = applications.filter(a => a.profRank != undefined);
    let courses = [];

    applications.filter(async a => {
        let unique = courses.filter(b => a.courseCode === b);
        if (unique.length === 0) {
            courses.push(a.courseCode)
        }
    });

    for (let i = 0; i < courses.length; i++) {
        const courseInfo = await Course.findOne({ course: courses[i] })
        courses[i] = {
            course: courses[i],
            hrsest: courseInfo.hrsest,
            allocations: []
        };
    }

    let rankings = rankedApplicants.map(a => {
        let obj = {
            name: a.applicantName,
            email: a.applicantEmail,
            course: a.courseCode,
            taRank: a.courseRank,
            type: a.applicantStatus,
            profRank: a.profRank,
            hrs: a.numberOfHours,
            score: score(a.courseRank, a.profRank)
        }
        return obj;
    })

    let reservedRankings = reserveApplicants.map(a => {
        let obj = {
            name: a.applicantName,
            email: a.applicantEmail,
            course: a.courseCode,
            taRank: a.courseRank,
            type: a.applicantStatus,
            profRank: 1,
            hrs: a.numberOfHours,
            score: score(a.courseRank, 1)
        }
        return obj;
    })

    rankings.sort((a, b) => b.score - a.score);
    reservedRankings.sort((a, b) => b.score - a.score)

    return { rankedApplicants: rankings, reserveApplicants: reservedRankings, courses: courses }
}

function score(profRank, taRank) {
    return (1 - ((0.1) * taRank)) + (1 - ((0.2) * profRank))
}

module.exports = matchRoutes;