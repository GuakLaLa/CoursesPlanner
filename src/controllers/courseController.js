import Course from "../models/course.js";

// GET /api/courses?semester=&instructorId=&page=&size=
export const getCourses = async (req, res) => {
  try {
    const { semester, instructorId, page = 1, size = 10 } = req.query;
    const query = {};
    if (semester) query.semester = semester;
    if (instructorId) query.instructorId = instructorId;

    const courses = await Course.find(query)
      .skip((page - 1) * size)
      .limit(Number(size))
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
