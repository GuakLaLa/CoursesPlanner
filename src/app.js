const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

//Connect to database
const mongoose = require('mongoose');
const uri ="mongodb+srv://23005011_db_user:cRvfS4eZYl69A5Mb@coursesplanner.rox5lkk.mongodb.net/?retryWrites=true&w=majority";
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
const courseRoute = require('./routes/courseRoutes');
const moduleRoute = require('./routes/moduleRoutes');
const assignmentRoute = require('./routes/assignmentRoutes');
const syllabusRoute = require('./routes/syllabusRoutes');

//Use Routes
app.use('/CoursesPlanner/api/auth', authRoute);
app.use('/CoursesPlanner/api/courses', authMiddleware, courseRoute);
app.use('/CoursesPlanner/api', authMiddleware, moduleRoute);
app.use('/CoursesPlanner/api', authMiddleware, assignmentRoute);
app.use('/CoursesPlanner/api', authMiddleware, syllabusRoute);

//404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});