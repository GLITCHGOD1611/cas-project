const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Add a new course
router.post('/add', courseController.addCourse);

// Get all courses
router.get('/list', courseController.getAllCourses);

// Get a course by ID
router.get('/get/:id', courseController.getCourseById);

// Update a course by ID
router.put('/update/:id', courseController.updateCourse);

// Delete a course by ID
router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;
