import Module from "../models/module.js";

// POST /api/courses/:id/modules
export const addModule = async (req, res) => {
  try {
    const exists = await Module.findOne({ courseId: req.params.id, week: req.body.week });
    if (exists) return res.status(400).json({ message: "Duplicate week for this course" });

    const newModule = await Module.create({ ...req.body, courseId: req.params.id });
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/courses/:id/modules
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find({ courseId: req.params.id }).sort({ week: 1 });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
