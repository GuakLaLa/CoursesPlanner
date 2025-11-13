// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app"); // Make sure app.js uses module.exports = app;
// const SyllabusVersion = require("../models/syllabusVersion");
// const Course = require("../models/course");

// beforeAll(async () => {
//   const uri = "mongodb+srv://23005011_db_user:cRvfS4eZYl69A5Mb@coursesplanner.rox5lkk.mongodb.net/?retryWrites=true&w=majority";
//   await mongoose.connect(uri);
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

// describe("Syllabus Versioning Logic", () => {
//   it("should mark old syllabus as not current when new version added", async () => {
//     // 1. Create dummy course
//     const course = await Course.create({
//       code: "CS100",
//       title: "Intro to Testing",
//       semester: "2025/1",
//       instructorId: new mongoose.Types.ObjectId()
//     });

//     // 2. Create first syllabus
//     const v1 = await SyllabusVersion.create({
//       courseId: course._id,
//       version: 1,
//       notes: "Initial version",
//       isCurrent: true
//     });

//     // 3. POST new version (simulate controller logic)
//     const res = await request(app)
//       .post(`/api/courses/${course._id}/syllabus/versions`)
//       .send({
//         version: 2,
//         noteas: "Updated version",
//         isCurrent: true
//       });

//     // 4. Fetch from DB
//     const allVersions = await SyllabusVersion.find({ courseId: course._id });

//     const oldVersion = allVersions.find(v => v.version === 1);
//     const newVersion = allVersions.find(v => v.version === 2);

//     expect(oldVersion.isCurrent).toBe(false);
//     expect(newVersion.isCurrent).toBe(true);
//     expect(res.statusCode).toBe(201);
//   });
// });
