const routes = require('express').Router();
const admin = require("firebase-admin");
const firebase = require("firebase");
const serviceAccount = require("../serviceKey.json");
const instructorSchema = require('../models/Instructor');
const User = require("../models/User");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const firebaseConfig = {
    apiKey: "AIzaSyBAgRxItS6ssAj8zV2UHOkTPSgPV7kznJc",
    authDomain: "matchez-aaa69.firebaseapp.com",
    projectId: "matchez-aaa69",
    storageBucket: "matchez-aaa69.appspot.com",
    messagingSenderId: "864643890388",
    appId: "1:864643890388:web:548e54a07732a6f8e38f41",
};

// Initialize Firebase
const fireapp = firebase.initializeApp(firebaseConfig);

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
});

routes.post("/login", async (req, res) => {
    fireapp
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(async (user) => {
            const userAccount = await User.findOne({ uuid: user.user.uid }).exec();
            try {
                if (userAccount)
                    jwt.sign({ user: user.user.uid }, "secretkey", (err, token) => {
                        res.json({ token: token, type: userAccount.type });
                    });
                else
                    res.status(400).json({ err: "Account not created" });
                return;
            } catch (err) {
                return res.status(400).send({ err: err });
            }
        })
        .catch((err) => {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                    res.status(400).send({ err: err.message });
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    res.status(400).send({
                        err: "Either the email or the password you provided are wrong",
                    });
            }
            return;
        });
});

routes.post("/signup", async (req, res) => {
    const schema = Joi.object({
        fname: Joi.string().max(30).required(),
        lname: Joi.string().max(30).required(),
        // username: Joi.string().max(50).required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().max(50).required(),
        type: Joi.string()
            .valid(
                ...[
                    "Undergraduate Chair",
                    "ECE Department Administrator",
                    "Instructor",
                ]
            )
            .required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(400).send({ err: result.error.details[0].message });
    }

    let fname = req.body.fname;
    let lname = req.body.lname;
    // let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let type = req.body.type;

    try {
        //check if username or email already exists
        // const usernameAccount = await User.findOne({ username: username }).exec();
        const emailAccount = await User.findOne({ email: email }).exec();
        const validInstructor = await instructorSchema.findOne({instructorEmail: email});
        console.log(validInstructor);

        if(validInstructor == undefined && type === "Instructor"){
            return res.status(400).send({
                err: `Could not register as an instructor because ${email} does not belong to an Instructor`
            })
        }
        if (emailAccount) {
            return res.status(400).send({
                err: "The email already exists",
            });
        }
         else {
            admin
                .auth()
                .createUser({
                    email: email,
                    password: password,
                    displayName: fname + " " + lname,
                })
                .then(async (userInfo) => {
                    //create a new user record
                    const nuser = new User({
                        uuid: userInfo.uid,
                        fname: fname,
                        lname: lname,
                        // username: username,
                        email: email,
                        type: type,
                    });
                    try {
                        const savedUser = await nuser.save();
                        jwt.sign({ user: userInfo.uid }, "secretkey", (err, token) => {
                            res.json({ token: token, type: type });
                        });
                    } catch (err) {
                        console.log(err);
                        return res.status(400).send({
                            err: err,
                        });
                    }
                })
                .catch((err) => {
                    return res.status(400).send({ error: err });
                });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            err: err,
        });
    }
});


routes.get("/test", verifyUser, async (req, res) => {
    res.send("ok");
});

function verifyToken(token) {
    let verified;
    jwt.verify(token, 'secretkey', (err, authData) => {
        if (!err)
            verified = authData;
    });

    return verified;
}

async function verifyUser(req, res, next) {
    if (!req.headers.authorization) {
        return res.json({ error: 'No credentials sent!' });
    }

    let token = req.headers.authorization;

    let authData = verifyToken(token);
    if (!authData) {
        res.sendStatus(401);
        return;
    }
    console.log(authData);
    req.authData = authData;

    /*
    const userAccount = await User.findOne({ uuid: authData.user }).exec();
    try {
        if (userAccount) {
            if (userAccount.type != "Undergraduate Chair") {
                res.sendStatus(401).sendStatus("You dont have the correct permissions to access this resource");
            } else {
                next();
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.json({ message: err });
        return;
    }
    */

    next();
}

module.exports = { routes, verifyUser };