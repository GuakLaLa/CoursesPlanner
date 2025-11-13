const express = require('express');
const requireRole = require('../middleware/roles');
const router = express.Router();
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController.js');

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management routes
 */

/**
 * @swagger
 * /CoursesPlanner/api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successfully retrieved all courses
 */
router.get("/",  getCourses);

/**
 * @swagger
 * /CoursesPlanner/api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: Only instructors can create a course
 */
router.post("/", 
    requireRole('INSTRUCTOR'), 
    createCourse);

/**
 * @swagger
 * /CoursesPlanner/api/courses/{id}:
 *   patch:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Course Name
 *               code:
 *                 type: string
 *                 example: CS202
 *               description:
 *                 type: string
 *                 example: Updated description for the course
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       403:
 *         description: Only instructors can update a course
 */
router.patch("/:id",  
    requireRole('INSTRUCTOR'), 
    updateCourse);

/**
 * @swagger
 * /CoursesPlanner/api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       403:
 *         description: Only instructors can delete a course
 */
router.delete("/:id",  
    requireRole('INSTRUCTOR'), 
    deleteCourse);

// GET by semester & instructorId
//router.get("/bySemesterInstructor", getCoursesBySemesterAndInstructorId);

module.exports = router;



