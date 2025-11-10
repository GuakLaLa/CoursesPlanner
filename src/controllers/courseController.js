import Course from "../models/course.js";

// GET /api/courses?semester=&instructorId=&page=&size=
export const getCourses = async (req, res) => {
  try {
    //Get filters and pagination params from query string
    const { semester, instructorId, page = 1, size = 10, sortBy = "createdAt" } = req.query;

    //Build query object
    const query = {};
    if (semester) query.semester = semester;
    if (instructorId) query.instructorId = instructorId;

    //Get total count (for pagination info)
    const totalCourses = await Course.countDocuments(query);

    //Perform MongoDB query with pagination and sorting
    const courses = await Course.find(query)
      .skip((page - 1) * size)          //pagination: skip earlier pages
      .limit(Number(size))              //pagination: limit per page
      .sort({ [sortBy]: -1 });          //sorting: -1 = descending, 1 = ascending

    //Send paginated response
    res.json({
      page: Number(page),
      size: Number(size),
      totalCourses,
      totalPages: Math.ceil(totalCourses / size),
      sortBy,
      data: courses
    });
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
