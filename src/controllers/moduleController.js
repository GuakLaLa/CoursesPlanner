import Module from "../models/module.js";

// POST /api/courses/:id/modules (INSTRUCTOR ONLY)
export const addModule = async (req, res) => {
  try {
    const { week, topic, reading } = req.body;

    // Ensure module week unique per course
    const exists = await Module.findOne({
      courseId: req.params.id,
      week
    });

    if (exists) {
      return res.status(400).json({ message: "Week already exists" });
    }

    const mod = new Module({
      courseId: req.params.id,
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
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find({ courseId: req.params.id })
      .sort({ week: 1 });

    res.json(modules);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/courses/:courseId/modules/:moduleId (INSTRUCTOR ONLY)
export const deleteModule = async (req, res) => {
  try {
    const mod = await Module.findOne({ _id: req.params.moduleId, courseId: req.params.courseId });
    if (!mod) return res.status(404).json({ message: "Module not found" });

    await mod.deleteOne();
    res.json({ message: "Module deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};