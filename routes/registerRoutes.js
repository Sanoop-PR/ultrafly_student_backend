const express = require('express');
const router = express.Router();
const register = require('../controller/registration_controller')

router.post('/user/registation',register.registerUser)

module.exports=router