// teacherProfileRoute.js
const express = require('express');
const router = express.Router();
const teacherdashboardController = require('../controllers/teacherdashboardController');  // Assuming the correct path to controller

// Route to get teacher statistics by teacher_id
router.get('/statistics/:teacher_id', teacherdashboardController.getTeacherStatistics);

module.exports = router;
