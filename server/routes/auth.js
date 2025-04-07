const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
// POST: Register a new user
router.post('/register', controller.registerUser);

// POST: Login user
router.post('/login', controller.loginUser);

// POST: Logout user
router.post('/logout', controller.logoutUser);

// GET: Get current logged-in user's info
router.get('/me', controller.getCurrentUser);

// PATCH: Update user password
router.patch('/updatePassword/:userId', controller.updatePassword);

// PATCH: Update user role
router.patch('/updateRole/:userId', controller.updateUserRole);

module.exports = router;
