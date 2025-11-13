const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const assignmentController = require('../controllers/assignmentController');

//POST & PUT - only INSTRUCTOR can create and update assignments
/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assignment management routes
 */

/**
 * @swagger
 * /CoursesPlanner/api/modules/{moduleId}/assignments:
 *   get:
 *     summary: Get all assignments for a module
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved assignments
 *       401:
 *         description: Unauthorized access
 */
router.get('/courses/:id/assignments',
    authMiddleware,
    assignmentController.getAssignment);

/**
 * @swagger
 * /CoursesPlanner/api/modules/{moduleId}/assignments:
 *   post:
 *     summary: Create a new assignment in a module
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: moduleId
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
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       403:
 *         description: Only instructors can create assignments
 *       401:
 *         description: Unauthorized access
 */
router.post('/courses/:id/assignments',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.createAssignment);

/**
 * @swagger
 * /CoursesPlanner/api/modules/{moduleId}/assignments/{assignmentId}:
 *   put:
 *     summary: Update an existing assignment in a module
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: ID of the module containing the assignment
 *         schema:
 *           type: string
 *           example: 6730b12f45bcda12f4f8c999
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         description: ID of the assignment to update
 *         schema:
 *           type: string
 *           example: 6730d12f45bcda12f4f8f111
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Assignment Title
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-10
 *               description:
 *                 type: string
 *                 example: Updated assignment instructions
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 *       403:
 *         description: Only instructors can update assignments
 *       401:
 *         description: Unauthorized access
 */
router.put('/courses/:id/assignments/:assignmentId',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.updateAssignment);

/**
 * @swagger
 * /CoursesPlanner/api/modules/{moduleId}/assignments/{assignmentId}:
 *   delete:
 *     summary: Delete a specific assignment from a module
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: ID of the module containing the assignment
 *         schema:
 *           type: string
 *           example: 6730b12f45bcda12f4f8c999
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         description: ID of the assignment to delete
 *         schema:
 *           type: string
 *           example: 6730d12f45bcda12f4f8f111
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 *       403:
 *         description: Only instructors can delete assignments
 *       401:
 *         description: Unauthorized access
 */
router.delete('/courses/:id/assignments/:assignmentId',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.deleteAssignment);

module.exports = router;