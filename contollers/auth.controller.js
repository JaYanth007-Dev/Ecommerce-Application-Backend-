const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const code = require("../configs/auth");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const request_body = req.body;
  console.log("Req......", req.body);
  const user_object = {
    name: request_body.name,
    email: request_body.email,
    userId: request_body.userId,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8),
  };
  try {
    const details = await user_model.create(user_object);
    res.status(201).send(details);
  } catch (error) {
    console.log("Error while registring the user");
    res.status(500).send({
      message: "Error while registring the user",
    });
  }
};

exports.signin = async (req, res) => {
  const user = await user_model.findOne({ userId: req.body.userId });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password...",
    });
  }
  const token = jwt.sign({ userId: user.userId }, code.secret, {
    expiresIn: "1h",
  });
  res.status(200).send({
    userId: user.userId,
    userType: user.userType,
    accessToken: token,
  });
};

