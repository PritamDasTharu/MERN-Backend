const express = require("express");
const {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategoryId,
} = require("../controller/productcontroller");

const router = express.Router();

router.post("/productadd", addProduct);
router.get("/productget", getProduct);
router.get("/productgetbyid/:id", getProductById);
router.put("/productupdatebyid/:id", updateProduct);
router.delete("/productdeletebyid/:id", deleteProduct);
router.get("/productgetbycategoryid/:id", getProductByCategoryId);

module.exports = router;
