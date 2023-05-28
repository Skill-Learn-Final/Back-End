// Load in the environment file
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
var cors = require("cors");

// import dependencies for sessions

const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

// import the different routes for Auth
const localAuth = require("./routes/localAuth");
const googleAuth = require("./routes/googleAuth");
const logout = require("./routes/logout");
const course = require("./routes/course");
const category = require("./routes/category");

// import file to setup db
const dbSetup = require("./db");
const passport = require("passport");
const { checkRole } = require("./middleware/authenticate");
dbSetup;

app.use(cors());

app.set("view-engine", "ejs");
app.use(express.json({ extended: false }));

// setup session
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./db" }),
  })
);
app.use(passport.authenticate("session"));

console.log("routes started: ");

// Handle Auth related routes
app.use("/local", localAuth);
app.use("/google", googleAuth);
app.use("/logout", logout);
app.use("/courses", course);
app.use("/categories", category);

console.log("routes registered: ");

app.get(["/", "/home"], checkRole("admin"), (req, res) => {
  res.send("This is the landing page");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
