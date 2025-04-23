const express = require("express");
const {
  addcategory,
  getcategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categorycontroller");

const router = express.Router();

router
  .post("/categoryadd", addcategory) // in thunderclient
  .get("/", getcategory)
  .get("/:id", getCategoryById)
  .put("/updateCategory/:id", updateCategory)
  .delete("/deleteCategory/:id", deleteCategory);

module.exports = router;

// /category, categoryRoute
// post: /addcategory
// get: /getcategory
// update: /updatecategory
// each has its own controller, easy to debug and maintain

// /product, productRoute
