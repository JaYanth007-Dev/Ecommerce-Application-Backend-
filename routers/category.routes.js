const categoryController = require("../contollers/category.controller");
const auth = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [auth.verifyToken, auth.isAdmin],
    categoryController.createNewCategory
  );

 
};
