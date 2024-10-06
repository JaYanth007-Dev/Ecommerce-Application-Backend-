const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const server_Port = require("./configs/server_port");
const db_info = require("./configs/database_info");
const user_model = require("./models/user.model");
const app = express();
app.use(express.json());

app.listen(server_Port.PORT, () => {
  console.log(`Server is running on port ${server_Port.PORT}`);
});

mongoose.connect(db_info.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error connecting to database");
});
db.once("open", () => {
  console.log("Connected to database");
  init();
});

async function init() {
  try {
    const user = await user_model.findOne({ userType: "admin" });
    if (user) {
      console.log("Admin user already exists");
      return;
    }
  } catch (error) {
    console.log("Error while reading a user", error);
  }

  const userDetails = {
    name: "admin",
    userId: "admin007",
    email: "admin@galaxe.com",
    userType: "ADMIN",
    password: bcrypt.hashSync("admin@007", 8),
  };

  try {
    const userInfo = await user_model.create(userDetails);
    console.log("Admin created sucessfully");
  } catch (error) {
    console.log("Error creating admin",error);
  }
}

require("./routers/auth.routes")(app);
require("./routers/category.routes")(app)
