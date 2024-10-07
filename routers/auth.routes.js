const authController = require("../contollers/auth.controller");
const authMW = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/auth/signup",
    [authMW.verifySignupBody],
    authController.signup
    );
    
    app.post(
        "/ecomm/api/v1/auth/login",
        [authMW.verifySigninBody],
        authController.signin
  )
  
  app.get("/ecomm/api/v1/auth/showUsers",
    [authMW.verifyToken, authMW.isAdmin],
    authController.showAllUsers
  )
};

