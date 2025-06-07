const db = require('../db');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Teachers WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        if (results.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: results[0],
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
};




// Get all teachers
exports.getAllTeachers = (req, res) => {
    const query = `
      SELECT 
        t.teacher_id, 
        t.name, 
        t.email, 
        t.qualification, 
        t.experience_years, 
        t.course_id,
        c.course_name -- Assuming courses table has 'course_name' column
      FROM teachers t
      LEFT JOIN courses c ON t.course_id = c.course_id
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching teachers:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch teachers' });
      }
      res.status(200).json({ success: true, data: results });
    });
  };
  
  // Add a new teacher
  exports.addTeacher = (req, res) => {
    const { name, email, password, course_id, qualification, experience_years } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }
  
    const query = `
      INSERT INTO teachers (name, email, password, qualification, experience_years, course_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [name, email, password, qualification, experience_years, course_id], (err, result) => {
      if (err) {
        console.error('Error adding teacher:', err);
        return res.status(500).json({ success: false, message: 'Failed to add teacher' });
      }
  
      res.status(201).json({
        success: true,
        message: 'Teacher added successfully',
        teacher_id: result.insertId,
      });
    });
  };
  
  // Update a teacher by ID
  exports.updateTeacher = (req, res) => {
    const { id } = req.params;
    const { name, email, password, course_id, qualification, experience_years } = req.body;
  
    if (!id) {
      return res.status(400).json({ success: false, message: 'Teacher ID is required' });
    }
  
    let query = `
      UPDATE teachers
      SET name = ?, email = ?, qualification = ?, experience_years = ?, course_id = ?
    `;
    let updateFields = [name, email, qualification, experience_years, course_id];
  
    // Add password to the query if it's provided
    if (password) {
      query += ", password = ?";
      updateFields.push(password);
    }
  
    query += " WHERE teacher_id = ?";
  
    db.query(query, [...updateFields, id], (err, result) => {
      if (err) {
        console.error('Error updating teacher:', err);
        return res.status(500).json({ success: false, message: 'Failed to update teacher' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
  
      res.status(200).json({ success: true, message: 'Teacher updated successfully' });
    });
  };
  
  
  
  // Delete a teacher by ID
  exports.deleteTeacher = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM teachers WHERE teacher_id = ?';
  
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting teacher:', err);
        return res.status(500).json({ success: false, message: 'Failed to delete teacher' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
  
      res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
    });
  };
  
// --------------------------------------------------------------------------------------- profilw cha code



// Get Teacher Profile


// Fetch teacher's profile data by teacher_id
// controller.js


// // Get Teacher Profile
// const getTeacherProfile = (req, res) => {
//   const teacherId = req.params.teacher_id;
  
//   db.query('SELECT * FROM teachers WHERE teacher_id = ?', [teacherId], (err, result) => {
//     if (err) {
//       console.error('Error fetching profile:', err);
//       return res.status(500).send('Error fetching profile');
//     }
//     res.json(result[0]);
//   });
// };

// // Update Teacher Profile
// const updateTeacherProfile = (req, res) => {
//   const teacherId = req.params.teacher_id;
//   const { name, email, password, qualification, experience_years, course_id } = req.body;
  
//   db.query(
//     'UPDATE teachers SET name = ?, email = ?, password = ?, qualification = ?, experience_years = ?, course_id = ? WHERE teacher_id = ?',
//     [name, email, password, qualification, experience_years, course_id, teacherId],
//     (err, result) => {
//       if (err) {
//         console.error('Error updating profile:', err);
//         return res.status(500).send('Error updating profile');
//       }
//       res.send('Profile updated successfully');
//     }
//   );
// };

// module.exports = { getTeacherProfile, updateTeacherProfile };
