const db = require('../db');

// Add a new course
exports.addCourse = (req, res) => {
    const { course_name, course_description, duration } = req.body;

    if (!course_name || !duration) {
        return res.status(400).json({ success: false, message: 'Course name and duration are required' });
    }

    const query = 'INSERT INTO Courses (course_name, course_description, duration) VALUES (?, ?, ?)';

    db.query(query, [course_name, course_description, duration], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        res.status(201).json({
            success: true,
            message: 'Course added successfully',
            data: { id: result.insertId, course_name, course_description, duration },
        });
    });
};

// Get all courses
exports.getAllCourses = (req, res) => {
    const query = 'SELECT * FROM Courses';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        res.status(200).json({
            success: true,
            data: results,
        });
    });
};

// Get a course by ID
exports.getCourseById = (req, res) => {
    const courseId = req.params.id;

    const query = 'SELECT * FROM Courses WHERE course_id = ?';

    db.query(query, [courseId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({
            success: true,
            data: results[0],
        });
    });
};

// Update a course by ID
exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const { course_name, course_description, duration } = req.body;

    if (!course_name && !duration) {
        return res.status(400).json({ success: false, message: 'At least one field (course name or duration) must be provided' });
    }

    const updateFields = [];
    const updateValues = [];

    if (course_name) {
        updateFields.push('course_name = ?');
        updateValues.push(course_name);
    }
    if (course_description) {
        updateFields.push('course_description = ?');
        updateValues.push(course_description);
    }
    if (duration) {
        updateFields.push('duration = ?');
        updateValues.push(duration);
    }

    const query = `UPDATE Courses SET ${updateFields.join(', ')} WHERE course_id = ?`;
    updateValues.push(courseId);

    db.query(query, updateValues, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: { course_id: courseId, course_name, course_description, duration },
        });
    });
};

// Delete a course by ID
exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;

    const query = 'DELETE FROM Courses WHERE course_id = ?';

    db.query(query, [courseId], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
        });
    });
};
