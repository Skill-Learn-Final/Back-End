const db = require("../db")

// function setUser(req, res, next) {
//     const username = req.body.username;
//     if (username){
//         req.user = findUser(username)
//     }
//     console.log(req.user)
//     next()
// }

function getUserRole(userId) {
    return new Promise((resolve, reject) => {
        return db.get("SELECT username FROM users where id = ?", [userId], (err, row) => {
            if (err) {
                return reject(err)
            }
            return resolve(row.username)
        })
    })
    
}

module.exports = {getUserRole}