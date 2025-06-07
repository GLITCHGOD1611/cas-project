const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Teacher Routes
router.post('/teachers/login', teacherController.login);

router.get('/teachers', teacherController.getAllTeachers);

// Add a new teacher
router.post('/teachers/add', teacherController.addTeacher);

// Update a teacher by ID
router.put('/teachers/update/:id', teacherController.updateTeacher);

// Delete a teacher by ID
router.delete('/teachers/delete/:id', teacherController.deleteTeacher);

// -----------------------------------------------------------------------

// Get teacher profile by ID

module.exports = router;
