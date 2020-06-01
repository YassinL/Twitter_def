let connection = require('../config/db')

class User {

    static create(first_name, last_name, birthday, city, email, telephone, user_name, password, cb) {
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, birthday = ?, city = ?, email = ?, telephone = ?, user_name = ?, password = ?', [first_name, last_name, birthday, city, email, telephone, user_name, password], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
}

module.exports = User;