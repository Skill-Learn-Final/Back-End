// Load in the environment file
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

// import dependencies for sessions

// const session = require("express-session");
// const SQLiteStore = require("connect-sqlite3")(session);

// import the different routes for Auth
const localAuth = require("./routes/localAuth");
const googleAuth = require("./routes/googleAuth");
// const logout = require("./routes/logout");
const course = require("./routes/course");
const category = require("./routes/category");
const userRouter = require("./routes/user");

// import file to setup db
// const dbSetup = require("./db");
// const passport = require("passport");
// dbSetup;

// Import some middleware
const { checkRole } = require("./middleware/authenticate");

// app.use(cors());

app.set("view-engine", "ejs");
app.use(express.json({ extended: false }));

// Setup CORS

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// setup cookie parser
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes

console.log("routes started: ");

app.use(express.static("public"));

// Handle Auth related routes
app.use("/api/local", localAuth);
app.use("/google", googleAuth);
// app.use("/logout", logout);
app.use("/api/courses", course);
app.use("/api/categories", category);
app.use("/api/users", userRouter);

console.log("routes registered: ");
// app.use("/logout", logout);

app.get(["/", "/home"], (req, res) => {
  res.send("This is the landing page");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
