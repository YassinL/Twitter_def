let connection = require('../config/db')

class FindUser {

    static find(user_name, cb) {
        console.log(user_name)
        connection.query('SELECT * FROM user WHERE ?', { user_name: user_name }, (err, user) => {
            if (err) throw err
            cb(user)
        })
    }
}

module.exports = FindUser;