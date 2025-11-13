const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const syllabusController = require('../controllers/syllabusController');

/**
 * @swagger
 * tags:
 *   name: Syllabus
 *   description: Syllabus management routes
 */

/**
 * @swagger
 * /CoursesPlanner/api/syllabus:
 *   get:
 *     summary: Get all syllabus versions
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *           example: 6730ad3c45bcda12f4f8b982
 *     responses:
 *       200:
 *         description: Successfully retrieved syllabus list
 *       404:
 *         description: Syllabus not found
 *       401:
 *         description: Unauthorized access
 */
//GET
router.get('/courses/:id/syllabus/current',
    authMiddleware,
    syllabusController.getCurrentSyllabusVersion
);

/**
 * @swagger
 * /CoursesPlanner/api/courses/{courseId}/syllabus/versions:
 *   get:
 *     summary: Get all syllabus versions for a specific course
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *           example: 6730ad3c45bcda12f4f8b982
 *     responses:
 *       200:
 *         description: Successfully retrieved all syllabus versions
 *       404:
 *         description: No syllabus versions found
 *       401:
 *         description: Unauthorized access
 */
router.get('/courses/:id/syllabus/versions',
    authMiddleware,
    syllabusController.getAllSyllabusVersions
);

/**
 * @swagger
 * /CoursesPlanner/api/syllabus/{courseId}:
 *   post:
 *     summary: Add or update syllabus for a course
 *     tags: [Syllabus]
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
 *               version:
 *                 type: number
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Syllabus saved successfully
 */ 
router.post('/courses/:id/syllabus/versions',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    syllabusController.createSyllabusVersion
);

/**
 * @swagger
 * /CoursesPlanner/api/courses/{courseId}/syllabus/versions:
 *   put:
 *     summary: Update an existing syllabus version for a course
 *     tags: [Syllabus]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *           example: 6730ad3c45bcda12f4f8b982
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - version
 *               - content
 *             properties:
 *               version:
 *                 type: number
 *                 example: 2
 *               content:
 *                 type: string
 *                 example: Revised syllabus with updated schedule and grading criteria.
 *     responses:
 *       200:
 *         description: Syllabus version updated successfully
 *       404:
 *         description: Syllabus version not found
 *       403:
 *         description: Only instructors can update syllabus versions
 *       401:
 *         description: Unauthorized access
 */
router.put('/courses/:id/syllabus/versions',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    syllabusController.updateSyllabusVersion
);

module.exports = router;


