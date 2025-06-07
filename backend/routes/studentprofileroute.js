const express = require('express');
const router = express.Router();
const studentProfileController = require('../controllers/studentProfileController');

// Get student profile by student_id
router.get('/student/profile/:student_id', studentProfileController.getStudentProfile);

module.exports = router;
