let express = require('express');
let server = express();
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser')

let Handlebars = require("handlebars");
let MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


// Moteur de template
server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');

// Momenthandlebars
// MomentHandler.registerHelpers(exphbs);

// Middleware
server.use('/public', express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// Routes
server.get("/", (request, response) => {
    response.render("login");
});

server.get("/signup", (request, response) => {
    response.render("signup")
})

server.get('/home', (request, response) => {
    let Message = require('./models/message')
    Message.all(function(messages) {
        response.render('home', { message: messages })
    })
})

server.post('/home', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        console.log("Problem !")
        response.redirect('/home')
    } else {
        let Message = require('./models/message')
        Message.create(request.body.message, function() {
            response.redirect('/home')
        })
    }
})

server.listen(8080);