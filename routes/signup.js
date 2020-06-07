const express = require('express');
const signupRouter = express.Router();

const User = require('../models/user');
const userController = require("../controllers/user");

// SIGNUP
signupRouter.get("/signup", (request, response) => {
    response.render("signup", { message: request.flash('info'), title: 'Signup' })
})

signupRouter.post("/signup", userController.postSignup)

module.exports = signupRouter;