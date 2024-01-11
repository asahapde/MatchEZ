const routes = require('express').Router();
const concernsSchema = require('../models/Concerns');
const { authRoutes, verifyUser } = require('./auth');

routes.post("", verifyUser, async (req, res) => {
    let course = req.body.course;
    let title = req.body.title;
    let instructor = req.body.instructor;
    let concern = req.body.concern;
    let resolved = req.body.resolved;

    const con = new concernsSchema({
        course: course,
        title: title,
        instructor: instructor,
        concern: concern,
        resolved: resolved
    });

    con.save(function (err, concernDoc) {
        if (err) {
            res.status(404).json(err);
            return handleError(err);
        } else {
            res.status(200).json(concernDoc);
        }
    });
});

routes.get('/:flag', async (req, res) => {
    let resolved = req.params.flag;
    console.log(resolved);
    concernsSchema.find({ resolved: resolved }, (error, concern) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (concern.length == 0) return res.send({ message: `No Concerns found` });
            else res.status(200).json(concern);
        }
    })
})

routes.post('/resolve', async (req, res) => {
    let concern = req.body;
    try {
        await concernsSchema.updateOne({ _id: concern._id }, { resolved: true });
    } catch (e) {
        res.send({ err: 'Could not resolve concern' });
        return;
    }
    res.send({message: 'Concern has been resolved' });
})

routes.post('/dismiss', async (req, res) => {
    let concern = req.body;
    try {
        await concernsSchema.deleteOne({ _id: concern._id });
    } catch (e) {
        res.send({ err: 'Could not dismiss concern' });
        return;
    }
    res.send({message: 'Concern has been dismissed' });
})

module.exports = routes;