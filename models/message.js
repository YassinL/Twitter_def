let connection = require('../config/db')

class Message {

    static create(id_user, content, cb) {
        connection.query('INSERT INTO messages SET id_user = ?, content = ?, created_at = ? ', [id_user, content, new Date()], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static all(cb) {
        connection.query('SELECT * FROM messages LEFT JOIN user ON messages.id_user = user.id_user ORDER BY created_at DESC', (err, rows) => {
            if (err) throw err
            cb(rows)
        })
    }

    // SELECT * FROM messages ORDER BY created_at DESC

    // static one(cb) {
    //     connection.query('SELECT * FROM messages LEFT JOIN user ON messages.id_user = user.id_user ORDER BY created_at DESC')
    // }

}

module.exports = Message