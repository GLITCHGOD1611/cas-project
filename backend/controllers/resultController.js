const db = require('../db');

// Get all results
exports.getAllResults = (req, res) => {
    const query = `
      SELECT r.result_id, r.student_id, r.exam_id, r.marks_obtained, r.total_marks, r.grade, s.name AS student_name, e.exam_name
      FROM results r
      JOIN students s ON r.student_id = s.student_id
      JOIN exams e ON r.exam_id = e.exam_id
    `;
  
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching results:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch results' });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// Add a new result
exports.addResult = (req, res) => {
    const { student_id, exam_id, marks_obtained, total_marks, grade } = req.body;
  
    const query = `
      INSERT INTO results (student_id, exam_id, marks_obtained, total_marks, grade)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    db.query(query, [student_id, exam_id, marks_obtained, total_marks, grade], (err, result) => {
        if (err) {
            console.error('Error adding result:', err);
            return res.status(500).json({ success: false, message: 'Failed to add result' });
        }
        res.status(201).json({
            success: true,
            message: 'Result added successfully',
            result_id: result.insertId
        });
    });
};
  
// Update a result
exports.updateResult = (req, res) => {
    const { id } = req.params;
    const { marks_obtained, total_marks, grade } = req.body;
  
    const query = `
      UPDATE results
      SET marks_obtained = ?, total_marks = ?, grade = ?
      WHERE result_id = ?
    `;
  
    db.query(query, [marks_obtained, total_marks, grade, id], (err, result) => {
        if (err) {
            console.error('Error updating result:', err);
            return res.status(500).json({ success: false, message: 'Failed to update result' });
        }
  
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Result not found' });
        }
  
        res.status(200).json({ success: true, message: 'Result updated successfully' });
    });
};

// Delete a result
exports.deleteResult = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM results WHERE result_id = ?';
  
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting result:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete result' });
        }
  
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Result not found' });
        }
  
        res.status(200).json({ success: true, message: 'Result deleted successfully' });
    });
};
