const { getUserRole } = require("./getUserRole");
const jwt = require("jsonwebtoken");
const db = require("../database/models");
const { DataTypes } = require("sequelize");
const User = require("../database/models/user")(db.sequelize, DataTypes);

function authenticate(role) {
  return async (req, res, next) => {
    const possibleUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (possibleUser) {
      const secret = process.env.JWT_SECRET + possibleUser.passwordHash;
      try {
        const data = jwt.verify(req.cookies.access_token, secret);
        if (data.role !== role) {
          return res.status(401).send("Forbidden");
        }
        req.user = possibleUser;
        req.role = data.role;
        return next();
      } catch (err) {
        return res.status(401).send(err);
        // console.log(err.JsonWebTokenError);
      }
    } else {
      return res.status(403).send("Forbidden");
    }
  };
}

// function checkRole(role) {
//   return async (req, res, next) => {
//     const userRole = await getUserRole(req.body.id);
//     console.log(userRole)
//     if (userRole !== role) {
//       res.status(401);
//       return res.send("Not Authorized");
//     }
//     next();
//   };
// }

module.exports = { authenticate };
