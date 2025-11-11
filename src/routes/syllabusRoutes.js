const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const syllabusController = require('../controllers/syllabusController');

//POST 
router.post('/courses/:id/syllabus/versions',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    syllabusController.createSyllabusVersion
);

//GET
router.get('/courses/:id/syllabus/current',
    authMiddleware,
    syllabusController.getCurrentSyllabusVersion
);

router.get('/courses/:id/syllabus/versions',
    authMiddleware,
    syllabusController.getAllSyllabusVersions
);

//PUT
router.put('/courses/:id/syllabus/versions',
    authMiddleware,
    requireRole('INSTRUCTOR'),
    syllabusController.updateSyllabusVersion
);

module.exports = router;


