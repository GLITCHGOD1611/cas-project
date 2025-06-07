const db = require('../db');

// Get all exams
exports.getAllExams = (req, res) => {
  const query = `SELECT e.exam_id, e.exam_name, e.exam_date, e.duration, s.subject_name 
                 FROM exams e
                 JOIN subjects s ON e.subject_id = s.subject_id`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching exams:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch exams' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

// Add a new exam
exports.addExam = (req, res) => {
  const { subject_id, exam_name, exam_date, duration } = req.body;

  if (!subject_id || !exam_name || !exam_date || !duration) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const query = `INSERT INTO exams (subject_id, exam_name, exam_date, duration)
                 VALUES (?, ?, ?, ?)`;

  db.query(query, [subject_id, exam_name, exam_date, duration], (err, result) => {
    if (err) {
      console.error('Error adding exam:', err);
      return res.status(500).json({ success: false, message: 'Failed to add exam' });
    }
    res.status(201).json({
      success: true,
      message: 'Exam added successfully',
      exam_id: result.insertId,
    });
  });
};

// Update an exam by ID
exports.updateExam = (req, res) => {
  const { exam_id } = req.params;
  const { subject_id, exam_name, exam_date, duration } = req.body;

  const query = `UPDATE exams 
                 SET subject_id = ?, exam_name = ?, exam_date = ?, duration = ? 
                 WHERE exam_id = ?`;

  db.query(query, [subject_id, exam_name, exam_date, duration, exam_id], (err, result) => {
    if (err) {
      console.error('Error updating exam:', err);
      return res.status(500).json({ success: false, message: 'Failed to update exam' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, message: 'Exam updated successfully' });
  });
};

// Delete an exam by ID
exports.deleteExam = (req, res) => {
  const { exam_id } = req.params;

  const query = 'DELETE FROM exams WHERE exam_id = ?';

  db.query(query, [exam_id], (err, result) => {
    if (err) {
      console.error('Error deleting exam:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete exam' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, message: 'Exam deleted successfully' });
  });
};
