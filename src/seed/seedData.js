const mongoose = require('mongoose');
const Course = require('./models/course');
const Module = require('./models/module');

const uri = "YOUR_MONGO_URI";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const seedData = async () => {
  try {
    // Delete existing data
    await Course.deleteMany();
    await Module.deleteMany();

    // Create courses
    const course1 = await Course.create({
      code: "CS101",
      title: "Introduction to Programming",
      semester: "Fall 2024",
      instructorId: "64f123abc1234567890abcde"
    });

    const course2 = await Course.create({
      code: "CS102",
      title: "Data Structures",
      semester: "Spring 2025",
      instructorId: "64f123abc1234567890abcdf"
    });

    // Create modules
    await Module.create([
      { courseId: course1._id, week: 1, topic: "Variables & Data Types", reading: "Chapter 1" },
      { courseId: course1._id, week: 2, topic: "Loops", reading: "Chapter 2" },
      { courseId: course2._id, week: 1, topic: "Arrays & Linked Lists", reading: "Chapter 1" }
    ]);

    console.log("Fake data inserted!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
