const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Dashboard statistics endpoint
router.get('/dashboard/statistics', dashboardController.getStatistics);

module.exports = router;
