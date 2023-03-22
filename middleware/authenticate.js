function authUser(req, res, next){
    if (req.body.username == null){
        res.status(403)
        return res.send("You need to sign in")
    }

    next()
}

module.exports = authUser