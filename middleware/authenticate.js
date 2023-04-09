const { getUserRole } = require("./getUserRole");

function authUser(req, res, next) {
  if (req.body.username == null) {
    res.status(403);
    return res.send("You need to sign in");
  }

  next();
}

function checkRole(role) {
  return async (req, res, next) => {
    const userRole = await getUserRole(req.body.id);
    console.log(userRole)
    if (userRole !== role) {
      res.status(401);
      return res.send("Not Authorized");
    }
    next();
  };
}

module.exports = { authUser, checkRole };
