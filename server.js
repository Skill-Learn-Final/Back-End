const express = require('express')
const app = express()

// import the different routes
const localAuth = require('./auth/localAuth')
const googleAuth = require('./auth/googleAuth')

// import file to setup db
const dbSetup = require('./db')
dbSetup

app.set('view-engine', 'ejs')
app.use(express.json({extended: false}))



app.use('/local', localAuth)
app.use('/google', googleAuth)

app.listen(3000)