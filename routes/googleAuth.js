const express = require("express")
const router = express.Router()


router.post('/login', (req, res) => {
    // console.log(req.body)
    res.send("Hi Google")
})
router.post('/register', (req, res) => {
    
})

module.exports = router