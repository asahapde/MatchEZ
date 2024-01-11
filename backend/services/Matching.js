const TA = require('../models/Application');
const Course = require('../models/Course');

const matchRoutes = require('express').Router();

matchRoutes.get("/test", async (req, res) => {
    let matches = await Match(true);
    res.send(matches);
});

async function Match(applciantFirst) {
    let applicants = [];
    let couseApplications = [];
    //assignemnt = {courseID, applicantId, applicantHours}
    let assignments = [];

    function normaliseApplicantScore(email, score) {
        let normalisedSocre = 0;
        applicants.forEach(i => {
            if (i.email == email) {
                normalisedSocre = score / applicants.applications;
            }
        });
        return normalisedSocre;
    }

    function normaliseProfScore(courseCode, score) {
        let normalisedSocre = 0;
        couseApplications.forEach(i => {
            if (i.courseCode == courseCode) {
                normalisedSocre = score / applicants.applications;
            }
        });
        return normalisedSocre;
    }

    const courses = await Course.find({}).exec();
    const tas = await TA.find({}).exec();
    try {
        tas.forEach(application => {
            let isNew = true;
            applicants.forEach(i => {
                if (i.email == application.applicantEmail) {
                    isNew = false;
                    i.applications.push(application);
                }
            });
            if (isNew) {
                applicants.push({ email: application.applicantEmail, assigned: false, applications: [application] });
            }

            isNew = true;
            couseApplications.forEach(i => {
                if (i.courseCode == application.courseCode) {
                    isNew = false;
                    i.applicants += 1;
                }
            });
            if (isNew) {
                let hours = courses.find(i => i.course == application.courseCode).hrsest;
                couseApplications.push({ courseCode: application.courseCode, applicants: 1, hours: hours, hrset: 0 });
            }
        });
        tas.forEach(application => {
            application.score = application.applicantStatus * 50;
            if (applciantFirst) {
                application.score += ((1 - normaliseApplicantScore(application.applicantEmail, application.courseRank)) * 2);
                application.score += (1 - normaliseProfScore(application.courseCode, application.profRank));
            } else {
                application.score += (1 - normaliseApplicantScore(application.applicantEmail, applicantEmail.courseRank));
                application.score += ((1 - normaliseProfScore(application.courseCode, application.profRank)) * 2);
            }
        });

        tas.sort(function (a, b) { return a.score - b.score });
        tas.forEach(application => {
            let course = couseApplications.find(i => i.courseCode == application.courseCode);
            if (course.hrset + application.numberOfHours <= course.hours) {
                let applicant = applicants.find(x => x.email == application.applicantEmail);
                if (applicant.assigned == false) {
                    assignments.push({ courseCode: application.courseCode, email: application.applicantEmail, applicantHours: application.numberOfHours });
                    couseApplications.find(y => y.courseCode == application.courseCode).hrset += application.numberOfHours;
                    applicant.assigned = true;
                }
            }
        });
        

        console.log("Here: " + assignments);
    } catch (err) {
        console.log(err);
    }

    return assignments;
}

module.exports = matchRoutes;