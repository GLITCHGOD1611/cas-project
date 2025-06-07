const db = require('../db');

// Get all assignments
// exports.getAllAssignments = (req, res) => {
//   const query = 'SELECT * FROM assignments';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching assignments:', err);
//       return res.status(500).json({ success: false, message: 'Failed to fetch assignments' });
//     }
//     res.status(200).json({ success: true, data: results });
//   });
// };

// In your backend, modify the query to include subject and teacher names

exports.getAllAssignments = (req, res) => {
    const query = `
      SELECT 
        a.assignment_id, 
        a.title, 
        a.description, 
        a.due_date, 
        s.subject_name, 
        t.name AS teacher_name
      FROM assignments a
      JOIN subjects s ON a.subject_id = s.subject_id
      JOIN teachers t ON a.teacher_id = t.teacher_id
    `;
  
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching assignments:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch assignments' });
        }
        res.status(200).json({ success: true, data: results });
    });
};


// Add a new assignment
exports.addAssignment = (req, res) => {
  const { title, description, subject_id, teacher_id, due_date } = req.body;

  if (!title || !description || !subject_id || !teacher_id || !due_date) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const query = `
    INSERT INTO assignments (title, description, subject_id, teacher_id, due_date)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [title, description, subject_id, teacher_id, due_date], (err, result) => {
    if (err) {
      console.error('Error adding assignment:', err);
      return res.status(500).json({ success: false, message: 'Failed to add assignment' });
    }

    res.status(201).json({
      success: true,
      message: 'Assignment added successfully',
      assignment_id: result.insertId,
    });
  });
};

// Update an assignment by ID
exports.updateAssignment = (req, res) => {
  const { id } = req.params;
  const { title, description, subject_id, teacher_id, due_date } = req.body;

  const query = `
    UPDATE assignments
    SET title = ?, description = ?, subject_id = ?, teacher_id = ?, due_date = ?
    WHERE assignment_id = ?
  `;
  db.query(query, [title, description, subject_id, teacher_id, due_date, id], (err, result) => {
    if (err) {
      console.error('Error updating assignment:', err);
      return res.status(500).json({ success: false, message: 'Failed to update assignment' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    res.status(200).json({ success: true, message: 'Assignment updated successfully' });
  });
};

// Delete an assignment by ID
exports.deleteAssignment = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM assignments WHERE assignment_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting assignment:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete assignment' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    res.status(200).json({ success: true, message: 'Assignment deleted successfully' });
  });
};
