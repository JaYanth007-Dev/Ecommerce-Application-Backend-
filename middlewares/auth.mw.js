const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const sceretCode = require("../configs/auth");

const verifySignupBody = async (req, res, next) => {
  try {
    if (!req.body.name)
      return res.status(400).send({ message: "Name is required" });
    if (!req.body.email)
      return res.status(400).send({ message: "Email is required" });
    if (!req.body.userId)
      return res.status(400).send({ message: "User Id is required" });
    if (!req.body.userType)
      return res.status(400).send({ message: "UserType is required" });
    if (!req.body.password)
      return res.status(400).send({ message: "Password is required" });

    const user = await user_model.findOne({ userId: req.body.userId });
    if (user)
      return res
        .status(400)
        .send({ message: "User with user Id already exist" });

    next();
  } catch (e) {
    console.log("Error while validating req object", e);
    res.status(500).send({
      message: "Error while validating the req body",
    });
  }
};

const verifySigninBody = (req, res, next) => {
  try {
    if (!req.body.userId) {
      return res.status(400).send({ message: "User Id is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "Password required" });
    }
    next();
  } catch (e) {
    console.log("Error while validating signin req object");
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided. Unauthorized" });
  }

  jwt.verify(token, sceretCode.secret, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Failed to authenticate token.Unauthorized" });
    }
    const user = await user_model.findOne({ userId: decoded.userId });
    if (!user) {
      return res.status(400).send({
        message: "Unauthorized..The User for this token doesn't exist",
      });
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.userType === "ADMIN") {
    next();
  } else {
    res.status(403).send({
      message: "Unauthorized.Only admin can access to add categories....",
    });
  }
};

module.exports = {
  verifySignupBody: verifySignupBody,
  verifySigninBody: verifySigninBody,
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
