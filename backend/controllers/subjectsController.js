const db = require('../db');
   console.log("Fetching all subjects");
// Get all subjects with course and teacher details
exports.getAllSubjects = (req, res) => {
    const query = `
        SELECT 
            s.subject_id, 
            s.subject_name, 
            c.course_name, 
            t.name AS teacher_name, 
            s.semester
        FROM Subjects s
        JOIN Courses c ON s.course_id = c.course_id
        JOIN Teachers t ON s.teacher_id = t.teacher_id
    `;

    db.query(query, (err, results) => {
    
        if (err) {
            console.error('Error fetching subjects:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch subjects' });
        }
        res.status(200).json({ success: true, data: results });
    });
   
};

exports.getSubjectsByCourseAndSemester = (req, res) => {
  const { courseId, semester } = req.params;

  const query = `
    SELECT * 
    FROM subjects 
    WHERE course_id = ? AND semester = ?
  `;

  db.query(query, [courseId, semester], (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    res.status(200).json({ success: true, data: results });
  });
};

// Add a new subject

exports.addSubject = (req, res) => {
    const { subject_name, course_id, teacher_id, semester } = req.body;

    if (!subject_name || !course_id || !teacher_id || !semester) {
        return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const query = `
        INSERT INTO Subjects (subject_name, course_id, teacher_id, semester) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [subject_name, course_id, teacher_id, semester], (err, result) => {
        if (err) {
            console.error('Error adding subject:', err);
            return res.status(500).json({ success: false, message: 'Failed to add subject' });
        }

        res.status(201).json({ success: true, message: 'Subject added successfully', subject_id: result.insertId });
    });
};

// Update a subject by ID
exports.updateSubject = (req, res) => {
    const { id } = req.params;
    const { subject_name, course_id, teacher_id, semester } = req.body;
  
    if (!id) {
      return res.status(400).json({ success: false, message: 'Subject ID is required' });
    }
  
    const query = `
        UPDATE Subjects 
        SET subject_name = ?, course_id = ?, teacher_id = ?, semester = ?
        WHERE subject_id = ?
    `;
  
    db.query(query, [subject_name, course_id, teacher_id, semester, id], (err, result) => {
      if (err) {
        console.error('Error updating subject:', err);
        return res.status(500).json({ success: false, message: 'Failed to update subject' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Subject not found' });
      }
  
      res.status(200).json({ success: true, message: 'Subject updated successfully' });
    });
  };
  

// Delete a subject by ID
exports.deleteSubject = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Subjects WHERE subject_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting subject:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete subject' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }

        res.status(200).json({ success: true, message: 'Subject deleted successfully' });
    });
};
