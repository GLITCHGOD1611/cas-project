const db = require('../db');

// Get all students
exports.getAllStudents = (req, res) => {
    const query = `
        SELECT s.*, c.course_name 
        FROM students s
        JOIN courses c ON s.course_id = c.course_id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch students' });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// Get students by course ID
exports.getStudentsByCourseAndSemester = (req, res) => {
    const { courseId, semester } = req.params;
  
    const query = `
      SELECT * 
      FROM students 
      WHERE course_id = ? AND semester = ?
    `;
  
    db.query(query, [courseId, semester], (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
  
      res.status(200).json({ success: true, data: results });
    });
  };
  

// Add a new student
exports.addStudent = (req, res) => {
    const { name, email, password, enrollment_number, course_id, semester, parent_contact } = req.body;
  
    if (!name || !email || !course_id || !semester) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }
  
    const query = `
      INSERT INTO students (name, email, password, enrollment_number, course_id, semester, parent_contact, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
  
    db.query(query, [name, email, password, enrollment_number, course_id, semester, parent_contact], (err, result) => {
      if (err) {
        console.error('Error adding student:', err);
        return res.status(500).json({ success: false, message: 'Failed to add student' });
      }
  
      res.status(201).json({ success: true, message: 'Student added successfully', student_id: result.insertId });
    });
  };
  

// Update a student by ID
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, password, enrollment_number, course_id, semester, parent_contact } = req.body;
  
    if (!id) {
      return res.status(400).json({ success: false, message: 'Student ID is required' });
    }
  
    const query = `
      UPDATE students 
      SET name = ?, email = ?, password = ?, enrollment_number = ?, course_id = ?, semester = ?, parent_contact = ?, updated_at = NOW()
      WHERE student_id = ?
    `;
  
    db.query(query, [name, email, password, enrollment_number, course_id, semester, parent_contact, id], (err, result) => {
      if (err) {
        console.error('Error updating student:', err);
        return res.status(500).json({ success: false, message: 'Failed to update student' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
  
      res.status(200).json({ success: true, message: 'Student updated successfully' });
    });
  };
  

// Delete a student by ID
exports.deleteStudent = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM students WHERE student_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete student' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    });
};
