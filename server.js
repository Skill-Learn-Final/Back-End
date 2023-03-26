// Load in the environment file
require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')

// import dependencies for sessions

const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session);

// import the different routes for Auth
const localAuth = require('./auth/localAuth')
const googleAuth = require('./auth/googleAuth')
const logout = require('./auth/logout')

// import file to setup db
const dbSetup = require('./db');
const passport = require('passport');
const { checkRole } = require('./middleware/authenticate')
dbSetup

app.set('view-engine', 'ejs')
app.use(express.json({extended: false}))

// setup session
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({db: 'sessions.db', dir: './db'})
}));
app.use(passport.authenticate('session'))


// Handle Auth related routes
app.use('/local', localAuth)
app.use('/google', googleAuth)
app.use('/logout', logout)

app.get(['/', '/home'], checkRole("bob") , (req, res) => {
    res.send("This is the landing page");
})

app.listen(3000)