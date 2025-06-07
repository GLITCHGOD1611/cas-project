const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/students', attendanceController.getStudents);
router.get('/subjects', attendanceController.getSubjects);
router.post('/attendance', attendanceController.addAttendance);
router.post('/attendance/view', attendanceController.viewAttendance);
router.put('/attendance/:id', attendanceController.updateAttendance);
router.delete('/attendance/:id', attendanceController.deleteAttendance);
router.get('/api/courses', attendanceController.getCourses);

// Route for fetching semesters
router.get('/api/semesters', attendanceController.getSemesters);
module.exports = router;