const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//GET
router.get('/Logout', authController.logoutUser);

//POST 
router.post('/SignUp', authController.signUpUser);
router.post('/Login', authController.loginUser);

module.exports = router;
