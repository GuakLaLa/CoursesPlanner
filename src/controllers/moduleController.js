const Module = require("../models/module");

// POST /api/courses/:id/modules (INSTRUCTOR ONLY)
const addModule = async (req, res) => {
  try {
    const { week, topic, reading } = req.body;
    const { id: courseId } = req.params;

    // Ensure module week unique per course
    const exists = await Module.findOne({ courseId, week});
    if (exists) {
      return res.status(400).json({ message: "Week already exists for this course" });
    }

    const mod = new Module({
      courseId,
      week,
      topic,
      reading
    });

    await mod.save();
    res.status(201).json(mod);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// GET /api/courses/:id/modules (STUDENT + INSTRUCTOR)
const getModules = async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const modules = await Module.find({ courseId })
      .sort({ week: 1 });

    res.status(200).json(modules);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/courses/:courseId/modules/:moduleId (INSTRUCTOR ONLY)
const deleteModule = async (req, res) => {
  try {
    const { id:courseId, moduleId } = req.params;
    const mod = await Module.findOne({ _id: moduleId, courseId });
    if (!mod) 
        return res.status(404).json({ message: "Module not found" });

    await mod.deleteOne();
    res.json({ message: "Module deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addModule, getModules, deleteModule };