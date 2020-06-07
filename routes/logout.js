const express = require('express');
const logoutRouter = express.Router();

// LOGOUT
logoutRouter.get('/logout', (request, response) => {
    request.logout();
    request.session.destroy();
    response.redirect('/');
})

module.exports = logoutRouter;