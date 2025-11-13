const express = require('express');
const requireRole = require('../middleware/roles');
const router = express.Router({ mergeParams: true });
const { addModule, getModules, deleteModule } = require( '../controllers/moduleController');

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Module management routes
 */

/**
 * @swagger
 * /CoursesPlanner/api/courses/{courseId}/modules:
 *   get:
 *     summary: Get all modules for a specific course
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved modules
 */
router.get("/:id/modules", getModules);

/**
 * @swagger
 * /CoursesPlanner/api/courses/{courseId}/modules:
 *   post:
 *     summary: Add a new module to a specific course
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Module added successfully
 *       403:
 *         description: Only instructors can add modules
 */
router.post("/:id/modules", 
    requireRole('INSTRUCTOR'), 
    addModule);

/**
 * @swagger
 * /CoursesPlanner/api/courses/{courseId}/modules/{moduleId}:
 *   delete:
 *     summary: Delete a specific module from a course
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course containing the module
 *         schema:
 *           type: string
 *           example: 6730ad3c45bcda12f4f8b982
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: ID of the module to delete
 *         schema:
 *           type: string
 *           example: 6730b12f45bcda12f4f8c999
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       403:
 *         description: Only instructors can delete modules
 */
router.delete("/:id/modules/:moduleId", 
    requireRole('INSTRUCTOR'), 
    deleteModule);

module.exports = router;