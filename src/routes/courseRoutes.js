const express = require('express');
const requireRole = require('../middleware/roles');
const router = express.Router();
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController.js');

router.get("/",  getCourses);

router.post("/", 
    requireRole('INSTRUCTOR'), 
    createCourse);

router.patch("/:id",  
    requireRole('INSTRUCTOR'), 
    updateCourse);

// DELETE course
router.delete("/:id",  
    requireRole('INSTRUCTOR'), 
    deleteCourse);

module.exports = router;



