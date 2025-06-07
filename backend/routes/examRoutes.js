const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Get all exams
router.get('/exams', examController.getAllExams);

// Add a new exam
router.post('/exams', examController.addExam);

// Update an exam by ID
router.put('/exams/:exam_id', examController.updateExam);

// Delete an exam by ID
router.delete('/exams/:exam_id', examController.deleteExam);

module.exports = router;
