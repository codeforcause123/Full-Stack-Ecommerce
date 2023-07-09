import express from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();
// creating category
router.post(
  "/create-category",
  requiresSignIn,
  isAdmin,
  createCategoryController
);

// updating category
router.put(
  "/update-category/:id",
  requiresSignIn,
  isAdmin,
  updateCategoryController
);
// getting category
router.get("/get-category", getCategoryController);

//getting single category
router.get("/single-category/:slug", singleCategoryController);

// deleting category
router.delete(
  "/delete-category/:id",
  requiresSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
