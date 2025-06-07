const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/admins', adminController.getAllAdmins);
router.post('/admins', adminController.addAdmin);
//router.get('/admins/:id', adminController.getAdminById);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);




module.exports = router;
