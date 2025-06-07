const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Result Routes
router.get('/results', resultController.getAllResults);
router.post('/results', resultController.addResult);
router.put('/results/:id', resultController.updateResult);
router.delete('/results/:id', resultController.deleteResult);

module.exports = router;
