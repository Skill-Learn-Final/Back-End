var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

mkdirp.sync('./db');

var db = new sqlite3.Database('./db/skillLearn.db');

db.serialize(function() {
  // create the database schema for the todos app
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    email TEXT UNIQUE, \
    firstName TEXT , \
    lastName TEXT , \
    role TEXT , \
    hashed_password BLOB, \
    salt BLOB \
  )");
  
//   db.run("CREATE TABLE IF NOT EXISTS todos ( \
//     id INTEGER PRIMARY KEY, \
//     owner_id INTEGER NOT NULL, \
//     title TEXT NOT NULL, \
//     completed INTEGER \
//   )");
  
  // create an initial user (username: alice, password: letmein)
  var salt = crypto.randomBytes(16);
  db.run('INSERT OR IGNORE INTO users (username, email, firstName, lastName, role, hashed_password, salt) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    'alice123',
    'alice@smith.com',
    'alice',
    'smith',
    'admin',
    crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'),
    salt
  ]);
});

module.exports = db;