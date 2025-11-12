const express = require('express');
const requireRole = require('../middleware/roles');
const router = express.Router({ mergeParams: true });
const { addModule, getModules, deleteModule } = require( '../controllers/moduleController');

router.get("/:id/modules", getModules);

router.post("/:id/modules", 
    requireRole('INSTRUCTOR'), 
    addModule);

// DELETE module
router.delete("/:id/modules/:moduleId", 
    requireRole('INSTRUCTOR'), 
    deleteModule);

module.exports = router;