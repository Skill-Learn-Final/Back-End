// Load in the environment file
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
// const jwt = require("jsonwebtoken");

// import dependencies for sessions

// const session = require("express-session");
// const SQLiteStore = require("connect-sqlite3")(session);

// import the different routes for Auth
const localAuth = require("./routes/localAuth");
const googleAuth = require("./routes/googleAuth");
const logout = require("./routes/logout");

// import file to setup db
// const dbSetup = require("./db");
// const passport = require("passport");
// dbSetup;

// Import some middleware
const { checkRole } = require("./middleware/authenticate");

app.set("view-engine", "ejs");
app.use(express.json({ extended: false }));

// setup session
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new SQLiteStore({ db: "sessions.db", dir: "./db" }),
//   })
// );
// app.use(passport.authenticate("session"));

// Setup CORS

app.use(cors());

// Routes

// Handle Auth related routes
app.use("/api/local", localAuth);
app.use("/google", googleAuth);
app.use("/logout", logout);

app.get(["/", "/home"], checkRole("admin"), (req, res) => {
  res.send("This is the landing page");
});

app.listen(5000);
