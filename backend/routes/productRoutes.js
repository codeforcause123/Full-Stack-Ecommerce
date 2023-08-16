import express from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";

import formidable from "express-formidable"
const router = express.Router();

router.post(
  "/create-product",
  requiresSignIn,
  isAdmin,
  formidable(),
  createProductController
);

export default router;
