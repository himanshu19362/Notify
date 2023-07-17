const express = require('express');
const { sendReminder } = require('../controllers/email');
const router = express.Router();

router.post('/email' , sendReminder);

module.exports = router;