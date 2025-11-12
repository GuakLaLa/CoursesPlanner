const mongoose = require('mongoose');
const User = require('../models/user');
const Course = require('../models/course');
const Module = require('../models/module');
const Assignment = require('../models/assignment');
const Syllabus = require('../models/syllabusVersion');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://23005011_db_user:cRvfS4eZYl69A5Mb@coursesplanner.rox5lkk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const seedData = async () => {
  try {
  // Delete existing data
  await User.deleteMany();
  await Course.deleteMany();
  await Module.deleteMany();
  await Assignment.deleteMany();
  await Syllabus.deleteMany();

    // Create users (hash passwords so tests / login can work)
    const saltRounds = 10;
    const pwInstructor = await bcrypt.hash('instructorPass123', saltRounds);
    const pwStudent = await bcrypt.hash('studentPass123', saltRounds);

    const [instructor1, instructor2, student1, student2] = await User.create([
      { username: 'alice_instructor', email: 'alice@school.edu', password: pwInstructor, role: 'INSTRUCTOR' },
      { username: 'bob_instructor', email: 'bob@school.edu', password: pwInstructor, role: 'INSTRUCTOR' },
      { username: 'charlie_student', email: 'charlie@school.edu', password: pwStudent, role: 'STUDENT' },
      { username: 'dana_student', email: 'dana@school.edu', password: pwStudent, role: 'STUDENT' }
    ]);

    // Create courses
    const course1 = await Course.create({
      code: "CS101",
      title: "Introduction to Programming",
      semester: "Fall 2024",
      instructorId: instructor1._id
    });

    const course2 = await Course.create({
      code: "CS102",
      title: "Data Structures",
      semester: "Spring 2025",
      instructorId: instructor2._id
    });

    // Create modules
    await Module.create([
      { courseId: course1._id, week: 1, topic: "Variables & Data Types", reading: "Chapter 1" },
      { courseId: course1._id, week: 2, topic: "Loops", reading: "Chapter 2" },
      { courseId: course1._id, week: 3, topic: "Functions", reading: "Chapter 3" },
      { courseId: course2._id, week: 1, topic: "Arrays & Linked Lists", reading: "Chapter 1" },
      { courseId: course2._id, week: 2, topic: "Stacks & Queues", reading: "Chapter 2" }
    ]);

    // Create assignments (assignment.courseId is string in the schema, store as string)
    await Assignment.create([
      { courseId: course1._id.toString(), title: 'Homework 1: Variables', dueDate: new Date('2024-09-15'), points: 100 },
      { courseId: course1._id.toString(), title: 'Project 1: Small App', dueDate: new Date('2024-10-15'), points: 200 },
      { courseId: course2._id.toString(), title: 'Homework 1: Arrays', dueDate: new Date('2025-02-10'), points: 100 }
    ]);

    // Create syllabus versions
    await Syllabus.create([
      { courseId: course1._id, version: 1, notes: 'Initial syllabus for CS101', isCurrent: true },
      { courseId: course2._id, version: 1, notes: 'Initial syllabus for CS102', isCurrent: true }
    ]);

    console.log("Fake data inserted!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();