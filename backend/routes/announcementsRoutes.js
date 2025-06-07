const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementsController');

// Routes for announcements
router.get('/', announcementsController.getAllAnnouncements);
router.post('/add', announcementsController.addAnnouncement);
router.delete('/delete/:id', announcementsController.deleteAnnouncement);

module.exports = router;
