const User = require('../models/user');
const Message = require('../models/message');

// Ici on utilise le controller User pour le profil qui est relié à sa route GET
exports.getProfile = (request, response) => {
    let userName = request.params.username
    User.find(userName, function(err, user) {
        Message.one(userName, function(messages) {
            response.render('profile', {
                message: messages,
                username: userName,
                me: request.user.username,
                picture: user[0].picture,
                firstName: user[0].first_name,
                lastName: user[0].last_name,
                city: user[0].city,
                title: 'Profile'
            })
        })
    })

}

// Ici on utilise le controller User pour le SIGNUP qui est relié à sa route POST
exports.postSignup = (request, response) => {
    User.create(
        request.body.first_name,
        request.body.last_name,
        request.body.birthday,
        request.body.city,
        request.body.email,
        request.body.telephone,
        request.body.username,
        request.body.password,
        request.body.picture,
        function() {

            response.redirect('/')
        })
}