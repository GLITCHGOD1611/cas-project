const db = require('../db');

// Get teacher statistics by teacher_id
exports.getTeacherStatistics = (req, res) => {
  const teacherId = req.params.teacher_id;
  
  const query = 'SELECT * FROM teacher_statistics WHERE teacher_id = ?';
  db.query(query, [teacherId], (err, result) => {
    if (err) {
      console.error('Error fetching teacher statistics:', err);
      return res.status(500).json({ success: false, message: 'Error fetching statistics' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Teacher statistics not found' });
    }

    res.status(200).json({ success: true, data: result[0] });
  });
};

// Get teacher profile by teacher_id
exports.getTeacherProfile = (req, res) => {
  const teacherId = req.params.teacher_id;
  
  const query = 'SELECT name, email, qualification, experience_years FROM teachers WHERE teacher_id = ?';
  db.query(query, [teacherId], (err, result) => {
    if (err) {
      console.error('Error fetching teacher profile:', err);
      return res.status(500).json({ success: false, message: 'Error fetching profile' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.status(200).json({ success: true, data: result[0] });
  });
};




// 🔹 Update Teacher Profile
exports.updateTeacherProfile = (req, res) => {
  const teacherId = req.params.teacher_id;
  const { name, email, qualification, experience_years } = req.body;

  const query = `
    UPDATE teachers 
    SET name = ?, email = ?, qualification = ?, experience_years = ? 
    WHERE teacher_id = ?`;

  db.query(query, [name, email, qualification, experience_years, teacherId], (err, result) => {
    if (err) {
      console.error('Error updating teacher profile:', err);
      return res.status(500).json({ success: false, message: 'Error updating profile' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  });
};

