const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

// Get all students
router.get('/', studentsController.getAllStudents);

// Get students by course and semester
router.get('/course/:courseId/semester/:semester', studentsController.getStudentsByCourseAndSemester);

// Add a new student
router.post('/add', studentsController.addStudent);

// Update a student by ID
router.put('/update/:id', studentsController.updateStudent);

// Delete a student by ID
router.delete('/delete/:id', studentsController.deleteStudent);

module.exports = router;
