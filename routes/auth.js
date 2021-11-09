const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require('../controllers/auth');

router.route('/login').post(login);

module.exports = router;