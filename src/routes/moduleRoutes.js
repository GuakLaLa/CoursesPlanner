import express from "express";
import { addModule, getModules } from "../controllers/moduleController.js";
import { requireInstructor } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/modules", getModules);
router.post("/:id/modules", requireInstructor, addModule);
// DELETE module
router.delete("/:courseId/modules/:moduleId", protect, authorize("INSTRUCTOR"), deleteModule);

export default router;
