"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

// console.log(config)

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(async (modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    // await db[modelName].sync({ alter: true });
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.query = async function () {
//   try {
//     return await db.Sequelize.prototype.query.apply(this, arguments);
//   } catch (err) {
//     if (err instanceof Sequelize.UniqueConstraintError) {
//       throw new Error("duplicate item");
//     } else if (err instanceof Sequelize.TimeoutError) {
//       // Do something
//     }
//     throw err;
//   }
// };

module.exports = db;
