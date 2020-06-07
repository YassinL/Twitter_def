const express = require('express');
const profileRouter = express.Router();

const isAuth = require('../middleware/isAuth')

const userController = require("../controllers/user");

// profile username
profileRouter.get('/profile/:username', isAuth, userController.getProfile)

module.exports = profileRouter;