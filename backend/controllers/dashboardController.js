const db = require('../db');

// Get dashboard statistics
exports.getStatistics = (req, res) => {
    const queries = {
        totalStudents: `SELECT COUNT(*) AS total FROM students`,
        totalTeachers: `SELECT COUNT(*) AS total FROM teachers`,
        totalCourses: `SELECT COUNT(*) AS total FROM courses`,
        totalHODs: `SELECT COUNT(*) AS total FROM hods`,
    };

    Promise.all(
        Object.values(queries).map((query) => {
            return new Promise((resolve, reject) => {
                db.query(query, (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0].total);
                });
            });
        })
    )
        .then(([students, teachers, courses, hods]) => {
            res.status(200).json({
                success: true,
                data: { students, teachers, courses, hods },
            });
        })
        .catch((err) => {
            console.error('Error fetching dashboard statistics:', err);
            res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
        });
};
