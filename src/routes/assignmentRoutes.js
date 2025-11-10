const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const assignmentController = require('../controllers/assignmentController');

//POST & PUT - only INSTRUCTOR can create and update assignments
router.post('/courses/:courseId/assignments',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.createAssignment);

router.put('/courses/:courseId/assignments/:assignmentId',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    assignmentController.updateAssignment);

module.exports = router;


