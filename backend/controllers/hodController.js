const db = require('../db');

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = `
        SELECT h.hod_id, t.email, t.password
        FROM HODs h
        JOIN Teachers t ON h.teacher_id = t.teacher_id
        WHERE t.email = ? AND t.password = ?
    `;

    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        if (results.length > 0) {
            res.status(200).json({
                success: true,
                message: 'HOD login successful',
                user: results[0],
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
};

// Get all HODs with teacher and course (department) details
exports.getAllHODs = (req, res) => {
    const query = `
        SELECT 
            h.hod_id,
            t.teacher_id,
            t.name AS teacher_name,
            t.email,
            c.course_name AS department
        FROM HODs h
        JOIN Teachers t ON h.teacher_id = t.teacher_id
        JOIN Courses c ON t.course_id = c.course_id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching HODs:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch HODs' });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// Add a new HOD
exports.addHOD = (req, res) => {
    const { teacher_id } = req.body;

    if (!teacher_id) {
        return res.status(400).json({ success: false, message: 'Teacher ID is required' });
    }

    const query = `INSERT INTO HODs (teacher_id) VALUES (?)`;

    db.query(query, [teacher_id], (err, result) => {
        if (err) {
            console.error('Error adding HOD:', err);
            return res.status(500).json({ success: false, message: 'Failed to add HOD' });
        }
        res.status(201).json({ success: true, message: 'HOD added successfully', hod_id: result.insertId });
    });
};

// Delete an HOD by ID
exports.deleteHOD = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM HODs WHERE hod_id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting HOD:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete HOD' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'HOD not found' });
        }

        res.status(200).json({ success: true, message: 'HOD deleted successfully' });
    });
};