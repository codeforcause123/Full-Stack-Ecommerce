import express from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductCountController,
  getProductFilterController,
  getProductPhotoController,
  getSingleProductController,
  productListController,
  searchProductsController,
  similarProductsController,
  updateProductController,
} from "../controllers/productController.js";

import formidable from "express-formidable";
const router = express.Router();
//routes
router.post(
  "/create-product",
  requiresSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requiresSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//get products
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get product photo
router.get("/product-photo/:pid", getProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filter", getProductFilterController);

//product count
router.get("/product-count", getProductCountController);

//product per page
router.get("/product-list/:page", productListController);

//search products
router.get("/search/:keyword", searchProductsController);

//similar products
router.get("/related-product/:pid/:cid", similarProductsController);

export default router;
