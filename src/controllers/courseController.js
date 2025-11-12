const Course = require("../models/course");
const Module = require("../models/module");
const Assignment = require("../models/assignment");
const SyllabusVersion = require("../models/syllabusVersion");

// GET /api/courses?semester=&instructorId=&page=&size=
const getCourses = async (req, res) => {
  try {
    //Get filters and pagination params from query string
    let { skip = 0, limit = 10, sort = 'createdAt', order = 'asc', semester, instructorId } = req.query;

    skip = parseInt(skip);
    limit = parseInt(limit);

    const query = {};
    if (semester) query.semester = semester;
    if (instructorId) query.instructorId = instructorId;

    //Get total count (for pagination info)
    const totalCourses = await Course.countDocuments(query);

    //Perform MongoDB query with pagination and sorting
    const courses = await Course.find(query)
      .skip(skip)                                //pagination: skip earlier pages
      .limit(limit)                                    //pagination: limit per page
      .sort({ [sort]: order === "asc" ? 1 : -1 });          //sorting: -1 = descending, 1 = ascending

    //Send paginated response
    res.json({
      skip,
      limit,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      sort,
      order,
      data: courses
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


// POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { code, title, semester, instructorId } = req.body;
    if (!code || !title || !instructorId) {
      return res.status(400).json({ message: "code, title, instructorId are required" });
    }

    //Check for unique course code
    const existingCourse = await Course.findOne({ code, semester });
    if(existingCourse){
        return res.status(400).json({ message: "Course code already exists for the semester" });
    }

    const newCourse = new Course({ 
        code, 
        title, 
        semester, 
        instructorId 
    });

    await newCourse.save();
    res.status(201).json(newCourse);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const course = await Course.findByIdAndUpdate( id, updates, { new: true });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/courses/:id (INSTRUCTOR ONLY)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course){ 
        return res.status(404).json({ message: "Course not found" });
    }

    // Delete related modules, assignments, and syllabus versions
    await Module.deleteMany({ courseId: req.params.id });
    await Assignment.deleteMany({ courseId: req.params.id });
    await SyllabusVersion.deleteMany({ courseId: req.params.id });

    await course.deleteOne();
    res.json({ message: "Course and related data deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };