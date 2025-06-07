const express = require('express');
const router = express.Router();
const hodController = require('../controllers/hodController');

router.post('/login', hodController.login);

router.get('/hods', hodController.getAllHODs);
router.post('/hods/add', hodController.addHOD);
router.delete('/hods/delete/:id', hodController.deleteHOD);

module.exports = router;
