import express from "express";
import { getCourses, createCourse, updateCourse } from "../controllers/courseController.js";
import { requireInstructor } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", requireInstructor, createCourse);
router.patch("/:id", requireInstructor, updateCourse);
// DELETE course
router.delete("/:id", protect, authorize("INSTRUCTOR"), deleteCourse);

export default router;
