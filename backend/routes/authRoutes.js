const express = require('express');
const { authRegister, authLogin } = require('../controllers/authControllers');
const router = express.Router();

router.route('/register').post(authRegister)
router.route('/login').post(authLogin)

module.exports = router;