require('dotenv').config()
const express = require('express');
const server = express();
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const passport = require("./config/passport")();
const router = require("./routes");

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Moteur de template, utilisation d'Handlebars et lié les fichiers static (CSS)
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');
server.use('/public', express.static('public'))

// Middleware, lancement du Body Parser pour récupérer et gérer les requêtes des formulaires
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// Créer les sessions dans une table, avec les cookie, et le temps de durée de session de 4h
let options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.database
};

var sessionStore = new MySQLStore(options);

server.use(session({
    secret: 'secret',
    cookie: { maxAge: 14400000 },
    resave: false,
    store: sessionStore,
    saveUninitialized: false
}))

// Utilissation du connect-flash pour les messages d'erreur à l'authentification
server.use(flash());
// Utilisation de passport pour l'authentification
server.use(passport.initialize());
server.use(passport.session());

// // ROUTES
// // LOGIN
// server.get("/", (request, response) => {
//     response.render("login", { error: request.flash('error'), title: 'Twitter' });
// });

// // , failureFlash: 'Invalid username or password.'
// server.post('/',
//     passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
//     function(request, response) {
//         response.redirect('/home/' + request.user.username);
//     });


// // SIGNUP
// server.get("/signup", (request, response) => {
//     response.render("signup", { message: request.flash('info'), title: 'Signup' })
// })

// server.post("/signup", (request, response) => {
//     User.create(
//         request.body.first_name,
//         request.body.last_name,
//         request.body.birthday,
//         request.body.city,
//         request.body.email,
//         request.body.telephone,
//         request.body.username,
//         request.body.password,
//         request.body.picture,
//         function() {

//             response.redirect('/')
//         })
// })

// // HOME AND TWEET
// server.get('/home/:username', isAuth, (request, response) => {
//     Message.all(function(messages) {
//         response.render('home', {
//             message: messages,
//             username: request.user.username,
//             picture: request.user.picture,
//             title: 'Home'
//         })
//     })
// })

// server.post('/home/:username', (request, response) => {
//     if (request.body.message === undefined || request.body.message === '') {
//         response.redirect('/home/' + request.user.username)
//     } else {
//         Message.create(request.user.id_user, request.body.message, function() {
//             response.redirect('/home/' + request.user.username)
//         })
//     }
// })


// // profile username
// server.get('/profile/:username', isAuth, (request, response) => {
//     let userName = request.params.username
//     User.find(userName, function(err, user) {
//         Message.one(userName, function(messages) {
//             console.log('cest le :', user)
//             response.render('profile', {
//                 message: messages,
//                 username: userName,
//                 me: request.user.username,
//                 picture: user[0].picture,
//                 firstName: user[0].first_name,
//                 lastName: user[0].last_name,
//                 city: user[0].city,
//                 title: 'Profile'
//             })
//         })
//     })

// })

// // LOGOUT
// server.get('/logout', (request, response) => {
//     request.logout();
//     request.session.destroy();
//     response.redirect('/');
// })

// ici on appelle les routes du dossier routes
server.use(router);

server.listen(8080);