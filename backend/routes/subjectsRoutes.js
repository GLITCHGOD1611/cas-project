const express = require('express');
const router = express.Router();
const subjectsController = require('../controllers/subjectsController');

router.get('/subjects', subjectsController.getAllSubjects);

// Add a new subject
router.post('/subjects/add', subjectsController.addSubject);

router.get(
    '/course/:courseId/semester/:semester',
    subjectsController.getSubjectsByCourseAndSemester
  );

// Update a subject by ID
router.put('/subjects/update/:id', subjectsController.updateSubject);

// Delete a subject by ID
router.delete('/subjects/delete/:id', subjectsController.deleteSubject);

module.exports = router;
