const express = require('express');
const router = express.Router();
const teacherProfileController = require('../controllers/tpc');

// Get teacher statistics by teacher_id
router.get('/statistics/:teacher_id', teacherProfileController.getTeacherStatistics);

// Get teacher profile by teacher_id
router.get('/teacher/profile/:teacher_id', teacherProfileController.getTeacherProfile);

router.put('/teacher/:teacher_id', teacherProfileController.updateTeacherProfile);

module.exports = router;

