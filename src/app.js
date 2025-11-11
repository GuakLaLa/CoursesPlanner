const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const cookieParser = require('cookie-parser');
require('dotenv').config();

//Connect to database
const mongoose = require('mongoose');
const uri =""; //MongoDB connection here
mongoose.connect(uri)
.then(()=> {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`CoursesPlanner app listening to ${port}`);
    })
})
.catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});

//Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Import Middleware
const authMiddleware = require('./middleware/auth');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Import Routes
const authRoute = require('./routes/authRoute');
const courseRoute = require('./routes/courseRoute');
const moduleRoute = require('./routes/moduleRoutes');
const assignmentRoute = require('./routes/assignmentRoute');
const syllabusRoute = require('./routes/syllabusRoute');

//Use Routes
app.use('/CoursesPlanner/api/auth', authRoute);
app.use('/CoursesPlanner/api/courses', authMiddleware, courseRoute);
app.use('/CoursesPlanner/api', authMiddleware, moduleRoute);
app.use('/CoursesPlanner/api', authMiddleware, assignmentRoute);
app.use('/CoursesPlanner/api', authMiddleware, syllabusRoute);

//404 handler
app.use((req, res) => {
    res.status(404),send("Page not found");
});