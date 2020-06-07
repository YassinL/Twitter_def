const express = require('express');
const homeRouter = express.Router();

const isAuth = require('../middleware/isAuth')
const messageController = require("../controllers/message");

// HOME AND TWEET
homeRouter.get('/home/:username', isAuth, messageController.getHome)
homeRouter.post('/home/:username', isAuth, messageController.postTweetHome)

module.exports = homeRouter;