const express = require('express');
const { signup, login, logout } = require('../controllers/user');
const { createReminder , getReminder, deleteReminder } = require('../controllers/reminder');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/signup' , signup);
router.post('/login' , login);
router.post('/reminder' , isAuthenticated , createReminder);
router.get('/reminder' , isAuthenticated , getReminder);
router.delete('/reminder/:id' , isAuthenticated , deleteReminder);
router.get('/logout' , logout);

module.exports = router;