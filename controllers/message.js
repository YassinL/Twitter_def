const Message = require('../models/message');

// ici on a le controller message pour GET HOME qui permet de récupérer la view de HOME
exports.getHome = (request, response) => {
    Message.all(function(messages) {
        response.render('home', {
            message: messages,
            username: request.user.username,
            picture: request.user.picture,
            title: 'Home'
        })
    })
}

// ici on a le controller message pour HOME POST qui permet de gerer l'intégration des messages tweetés dans ma base de données 
exports.postTweetHome = (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        response.redirect('/home/' + request.user.username)
    } else {
        Message.create(request.user.id_user, request.body.message, function() {
            response.redirect('/home/' + request.user.username)
        })
    }
}