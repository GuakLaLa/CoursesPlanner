import SyllabusVersion from "../models/syllabusVersion.js";

// POST /api/courses/:id/syllabus/versions
export const addSyllabusVersion = async (req, res) => {
  try {
    // Mark old syllabus as not current
    await SyllabusVersion.updateMany({ courseId: req.params.id }, { isCurrent: false });

    const latest = await SyllabusVersion.find({ courseId: req.params.id })
      .sort({ version: -1 })
      .limit(1);

    const nextVersion = latest.length ? latest[0].version + 1 : 1;

    const newVersion = await SyllabusVersion.create({
      ...req.body,
      courseId: req.params.id,
      version: nextVersion,
      isCurrent: true
    });

    res.status(201).json(newVersion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/courses/:id/syllabus/current
export const getCurrentSyllabus = async (req, res) => {
  const current = await SyllabusVersion.findOne({ courseId: req.params.id, isCurrent: true });
  res.json(current);
};

// GET /api/courses/:id/syllabus/versions
export const getAllVersions = async (req, res) => {
  const versions = await SyllabusVersion.find({ courseId: req.params.id }).sort({ version: -1 });
  res.json(versions);
};
