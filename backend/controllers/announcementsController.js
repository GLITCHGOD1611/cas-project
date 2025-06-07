const db = require('../db');

// Get all announcements
exports.getAllAnnouncements = (req, res) => {
    const query = `SELECT * FROM Announcements ORDER BY created_at DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching announcements:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch announcements' });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// Add a new announcement
exports.addAnnouncement = (req, res) => {
    const { title, description, created_by } = req.body;

    if (!title || !description || !created_by) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = `INSERT INTO announcements (title, description, created_by) VALUES (?, ?, ?)`;

    db.query(query, [title, description, created_by], (err, result) => {
        if (err) {
            console.error('Error adding announcement:', err);
            return res.status(500).json({ success: false, message: 'Failed to add announcement' });
        }

        res.status(201).json({ success: true, message: 'Announcement added successfully' });
    });
};


// Delete an announcement
exports.deleteAnnouncement = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Announcements WHERE announcement_id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting announcement:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete announcement' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        res.status(200).json({ success: true, message: 'Announcement deleted successfully' });
    });
};
