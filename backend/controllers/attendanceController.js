const db = require('../db');

// exports.getStudents = (req, res) => {
//   const query = 'SELECT * FROM students';
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// };

// Controller function for fetching courses
exports.getCourses = (req, res) => {
    const query = 'SELECT * FROM courses'; // Assuming there's a `courses` table
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results); // Return the list of courses
    });
  };
  

  // Controller function for fetching distinct semesters
exports.getSemesters = (req, res) => {
    const query = `
      SELECT DISTINCT semester FROM students
      UNION
      SELECT DISTINCT semester FROM subjects;
    `;
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results); // Return the list of distinct semesters
    });
  };
  

exports.getStudents = (req, res) => {
    const { course_id, semester } = req.query; // Get course_id and semester from the query parameters
    
    // Ensure course_id and semester are provided
    if (!course_id || !semester) {
      return res.status(400).json({ error: 'course_id and semester are required' });
    }
    
    const query = 'SELECT * FROM students WHERE course_id = ? AND semester = ?';
    db.query(query, [course_id, semester], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, data: results });
    });
  };
  
exports.getSubjects = (req, res) => {
  const query = 'SELECT * FROM subjects';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.addAttendance = (req, res) => {
  const { student_id, subject_id, date, status } = req.body;
  const query = 'INSERT INTO attendance (student_id, subject_id, date, status) VALUES (?, ?, ?, ?)';
  db.query(query, [student_id, subject_id, date, status], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Attendance added successfully!' });
  });
};

exports.viewAttendance = (req, res) => {
  const { subject_id, date } = req.body;
  const query = `
    SELECT a.attendance_id, s.name AS student_name, a.date, a.status
    FROM attendance a
    JOIN students s ON a.student_id = s.student_id
    WHERE a.subject_id = ? AND a.date = ?
  `;
  db.query(query, [subject_id, date], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateAttendance = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE attendance SET status = ? WHERE attendance_id = ?';
  db.query(query, [status, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Attendance updated successfully!' });
  });
};

exports.deleteAttendance = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM attendance WHERE attendance_id = ?'; // Fixed query string
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Attendance deleted successfully!' });
  });
};