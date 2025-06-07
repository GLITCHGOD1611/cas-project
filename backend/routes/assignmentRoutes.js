const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Get all assignments
router.get('/assignments', assignmentController.getAllAssignments);

// Add a new assignment
router.post('/assignments', assignmentController.addAssignment);

// Update an assignment by ID
router.put('/assignments/:id', assignmentController.updateAssignment);

// Delete an assignment by ID
router.delete('/assignments/:id', assignmentController.deleteAssignment);

module.exports = router;
