let connection = require('../config/db')

class User {

    static create(first_name, last_name, birthday, city, email, telephone, username, password, cb) {
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, birthday = ?, city = ?, email = ?, telephone = ?, username = ?, password = ?', [first_name, last_name, birthday, city, email, telephone, username, password], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static find(username, cb) {
        console.log(username)
        connection.query("SELECT * FROM user WHERE username = ?", [username], (err, user) => {
            if (err) throw err
            cb(err, user);
        })
    }
}
module.exports = User;