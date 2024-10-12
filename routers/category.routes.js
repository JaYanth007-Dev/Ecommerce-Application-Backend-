const categoryController = require("../contollers/category.controller");
const auth = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/addCategories",
    [auth.verifyToken, auth.isAdmin],
    categoryController.createNewCategory
  );

  app.get(
    "/ecomm/api/v1/showAllcategories",
    [auth.verifyToken],
    categoryController.showAllItems
  );
};
