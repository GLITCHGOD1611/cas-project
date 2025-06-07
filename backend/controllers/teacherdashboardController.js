const db = require('../db');  // Assuming db is your MySQL connection instance

exports.getTeacherStatistics = (req, res) => {
    const teacherId = req.params.teacher_id;  // Fetch teacherId from the request parameters

    const query = `
        SELECT 
            (SELECT COUNT(DISTINCT s.student_id) 
             FROM students s
             JOIN courses c ON s.course_id = c.course_id
             JOIN teachers t ON c.teacher_id = t.teacher_id
             WHERE t.teacher_id = ?) AS total_students,

            (SELECT COUNT(*) 
             FROM assignments a
             WHERE a.teacher_id = ?) AS total_assignments,

            (SELECT COUNT(*) 
             FROM attendance att
             JOIN courses c ON att.subject_id = c.course_id
             JOIN teachers t ON c.teacher_id = t.teacher_id
             WHERE t.teacher_id = ?) AS total_attendance,

            (SELECT COUNT(*) 
             FROM exams e
             JOIN courses c ON e.subject_id = c.course_id
             JOIN teachers t ON c.teacher_id = t.teacher_id
             WHERE t.teacher_id = ? 
             AND e.exam_date > NOW()) AS total_upcoming_exams;
    `;
    
    db.query(query, [teacherId, teacherId, teacherId, teacherId], (err, results) => {
        if (err) {
            console.error('Error fetching teacher statistics:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
        }
        
        const stats = results[0];  // Fetch the first result from the query

        res.status(200).json({
            success: true,
            data: {
                total_students: stats.total_students,
                total_assignments: stats.total_assignments,
                total_attendance: stats.total_attendance,
                total_upcoming_exams: stats.total_upcoming_exams,
            },
        });
    });
};
