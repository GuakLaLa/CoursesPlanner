import express from "express";
import { getCourses, createCourse, updateCourse } from "../controllers/courseController.js";
import { requireInstructor } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", requireInstructor, createCourse);
router.patch("/:id", requireInstructor, updateCourse);

export default router;
