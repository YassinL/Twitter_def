const connection = require('../config/db')
const bcrypt = require('bcrypt');
let saltRounds = 10;

class User {

    static create(first_name, last_name, birthday, city, email, telephone, username, password, picture, cb) {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            connection.query('INSERT INTO user SET first_name = ?, last_name = ?, birthday = ?, city = ?, email = ?, telephone = ?, username = ?, password = ?, picture = ?', [first_name, last_name, birthday, city, email, telephone, username, hash, picture], (err, result) => {
                if (err) throw err
                cb(result)
            })
        });

    }

    static find(username, cb) {
        connection.query("SELECT * FROM user WHERE username = ?", [username], (err, user) => {
            if (err) throw err
            cb(err, user);
        })
    }
}
module.exports = User;