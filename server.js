require('dotenv').config()
const express = require('express');
const server = express();
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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
server.use(methodOverride('_method'));

// Créer les sessions dans une table, avec les cookie, et le temps de durée de session de 4h
let options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.database,
    //port : 8889
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

// ici on appelle les routes du dossier routes
server.use(router);

server.listen(8080);