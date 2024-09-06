const express = require('express');
const path = require('path');
const auth_Controller = require('../controller/auth');

const router = express.Router();

// Post Data Api endpoint
router.post('/user/login', auth_Controller.authUser_login);
// get data api endPoint
router.post('/user/register', auth_Controller.registerUser);
router.post('/user/logout', auth_Controller.logoutUser);
router.put('/user/edit/:id', auth_Controller.updateUser);
router.delete('/user/delete/:id', auth_Controller.deleteUser);
router.get('/user/userData', auth_Controller.getAllUsers);
router.get('/user/userData/:id', auth_Controller.getUserById);
module.exports = router;
