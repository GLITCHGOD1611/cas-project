const db = require('../db');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Students WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        
        if (results.length > 0) {
            const user = results[0];  // Assuming results[0] contains the student data

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: { 
                    student_id: user.student_id,  // Add the student_id in the response
                    name: user.name,  // You can include other fields if necessary
                    email: user.email,
                    enrollment_number: user.enrollment_number,
                    parent_contact: user.parent_contact,
                },
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
};
