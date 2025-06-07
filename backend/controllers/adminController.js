const db = require('../db');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Admins WHERE email = ? AND password = ?';

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
            res.status(401).json({ success: false, message: 'Invalid emaillll or password' });
        }
    });
};

// Get all admins
exports.getAllAdmins = (req, res) => {
    const query = 'SELECT * FROM Admins';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        res.status(200).json({
            success: true,
            data: results,
        });
    });
};



// Add a new admin
exports.addAdmin = (req, res) => {
    const { name, email, password, contact_number } = req.body;

    if (!name || !email || !password || !contact_number) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const query = 'INSERT INTO Admins (name, email, password, contact_number) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, password, contact_number], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }
        res.status(201).json({
            success: true,
            message: 'Admin added successfully',
            data: { id: result.insertId, name, email, contact_number },
        });
    });
};

// Get admin by ID
/*
exports.getAdminById = (req, res) => {
    const adminId = req.params.id; // Get the ID from the request parameters

    const query = 'SELECT * FROM Admins WHERE id = ?';

    db.query(query, [adminId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({
            success: true,
            data: results[0], // Return the first result since ID is unique
        });
    });
};
*/

// Update an admin by ID
exports.updateAdmin = (req, res) => {
    const adminId = req.params.id; // Get the admin_id from the request parameters
    const { name, email, password } = req.body; // Get new data from the request body

    if (!name && !email && !password) {
        return res.status(400).json({ success: false, message: 'No fields to update' });
    }

    // Prepare query string and values to update only the provided fields
    const updateFields = [];
    const updateValues = [];

    if (name) {
        updateFields.push('name = ?');
        updateValues.push(name);
    }
    if (email) {
        updateFields.push('email = ?');
        updateValues.push(email);
    }
    if (password) {
        updateFields.push('password = ?');
        updateValues.push(password);
    }

    // Append the admin_id to the query for the WHERE clause
    const query = `UPDATE Admins SET ${updateFields.join(', ')} WHERE admin_id = ?`;
    updateValues.push(adminId);

    db.query(query, updateValues, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Admin updated successfully',
            data: { id: adminId, name, email },
        });
    });
};

// Delete an admin by ID
exports.deleteAdmin = (req, res) => {
    const adminId = req.params.id; // Use the correct parameter name
    const query = 'DELETE FROM Admins WHERE admin_id = ?'; // Update to use `admin_id`

    db.query(query, [adminId], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Admin deleted successfully',
        });
    });
};

