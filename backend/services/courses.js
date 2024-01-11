const routes = require('express').Router();
const User = require("../models/User");
const Course = require('../models/Course');
const {authRoutes, verifyUser} = require('./auth');

routes.get("/instructor/:email", verifyUser, async (req, res) => {
    
    let uuid =  req.authData.user;
    let email = req.params.email;

    const prof = await User.findOne({ email: email }).exec();
    try {
        if (!prof)
            return res.status(400).send({
                err: "Instructor email does not exist",
            });

        res.send({ courses: prof.courses ? prof.courses : [] });
    } catch (err) {
        return res.send(err);
    }
});


routes.get("/codes", async (req, res) => {
    const courses = await Course.find({}).exec();
    try {
        if (!courses)
            return res.status(400).send({
                err: "There are no couses in the database",
            });

        let codes = courses.map(i => i.course);
        res.send({ codes: codes });
    } catch (err) {
        return res.send(err);
    }
});

routes.get("/emails", async (req, res) => {

    const profs = await User.find({type: "Instructor"}).exec();;
    try {
        if (!profs)
            return res.status(400).send({
                err: "There are no instructors in the database",
            });

        let emails = profs.map(i => i.email);
        res.send({ emails: emails });
    } catch (err) {
        return res.send(err);
    }
});

routes.post("/instructor/:email", verifyUser, async (req, res) => {
    let uuid = req.authData.user;
    let courseId = req.body.courseId;
    let email = req.params.email;

    const prof = await User.findOne({ email: email }).exec();
    const course = await Course.findOne({ course: courseId }).exec();
    try {
        if (!prof)
            return res.status(400).send({
                err: "Instructor email does not exist",
            });

        if (!course)
            return res.status(400).send({
                err: "Course ID does not exist",
            });

        let courses = prof.courses ? prof.courses : [];

        if (courses.includes(courseId))
            return res.status(400).send({
                err: "Course is already added to instructor",
            });

        courses.push(courseId);

        prof.courses = courses;
        prof.markModified("courses");
        const savedProf = await prof.save();
        res.send({ courses: prof.courses });
    } catch (err) {
        return res.send(err);
    }
});

routes.post("/instructor/deleteCourse/:email", verifyUser, async (req, res) => {
    let uuid = req.authData.user;
    let email = req.params.email;
    let courseId = req.body.courseId;

    const prof = await User.findOne({ email: email }).exec();
    const course = await Course.findOne({ course: courseId }).exec();
    try {
        if (!prof)
            return res.status(400).send({
                err: "Instructor email does not exist",
            });

        if (!course)
            return res.status(400).send({
                err: "Course ID does not exist",
            });

        let courses = prof.courses ? prof.courses : [];

        courses = courses.filter(i => i != courseId);

        prof.courses = courses;
        prof.markModified("courses");
        const savedProf = await prof.save();
        res.send({ courses: prof.courses });
    } catch (err) {
        return res.send(err);
    }
});


module.exports = routes;