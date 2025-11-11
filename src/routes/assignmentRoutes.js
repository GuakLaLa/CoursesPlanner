const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const assignmentController = require('../controllers/assignmentController');

//POST & PUT - only INSTRUCTOR can create and update assignments
router.post('/courses/:courseId/assignments',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.createAssignment);

router.get('/courses/:courseId/assignments',
    authMiddleware,
    assignmentController.getAssignment);

router.put('/courses/:courseId/assignments/:assignmentId',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.updateAssignment);

router.delete('/courses/:courseId/assignments/:assignmentId',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.deleteAssignment);

module.exports = router;