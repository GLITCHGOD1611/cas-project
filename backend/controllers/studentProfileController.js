const db = require('../db');  // Assuming db.js handles your MySQL connection

// Get student profile by student_id
exports.getStudentProfile = (req, res) => {
  const studentId = req.params.student_id;  // student_id is passed as a parameter
  
  const query = 'SELECT name, email, enrollment_number, parent_contact FROM students WHERE student_id = ?';

  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error('Error fetching student profile:', err);
      return res.status(500).json({ success: false, message: 'Error fetching profile' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: result[0] });
  });
}
