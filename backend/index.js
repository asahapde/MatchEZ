const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const router = express.Router();
const connectToCluster = require('./Config/db');
const dotenv = require('dotenv');

//Importing Routes
const {routes, verifyUser} = require('./services/auth');
const matchRoutes = require('./services/Matching');
const matchtest = require('./services/matching2')
const parseRoute = require('./routes/parse');
const parseApplicantsRoute = require('./routes/parseApplicants');
const parseInstructorsRoute = require('./routes/parseInstructors');
const getCourseApplicationsRoute = require('./routes/courseApplications');
const applicationQuestionsRoute = require('./routes/applicationQuestions');
const coursesRoutes = require('./services/courses');
const concernRoute = require('./services/concerns');
const parseCourseSetup = require('./routes/parseCourseSetup');


dotenv.config({path:'./config/config.env'});


// Add cors for Angular
app.use(cors());

// Connecting To MongoDB
connectToCluster();

// Serve Front-End
app.use("/", express.static("static"));

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Parse data as json
app.use(express.json());

// Install the router at /api
app.use('/api', router);

//Routes
router.use('/auth', routes);
router.use('/parse', parseRoute);
router.use('/parseApplicants', parseApplicantsRoute);
router.use('/parseInstructors', parseInstructorsRoute);
router.use('/parseCourseSetup', parseCourseSetup)
router.use('/applications', getCourseApplicationsRoute);
router.use('/match', matchRoutes);
router.use('/matchtest', matchtest);
router.use('/addQuestions', applicationQuestionsRoute);
router.use('/courses', coursesRoutes);
router.use('/concerns', concernRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
