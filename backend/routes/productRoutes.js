import express from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
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
router.delete("/product/:pid",deleteProductController);
export default router;
