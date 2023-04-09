const db = require("../db")


function getUserRole(userId) {
    return new Promise((resolve, reject) => {
        return db.get("SELECT role FROM users where id = ?", [userId], (err, row) => {
            if (err) {
                return reject(err)
            }
            return resolve(row.role)
        })
    })
    
}

module.exports = {getUserRole}