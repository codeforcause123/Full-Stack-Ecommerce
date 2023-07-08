import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();
//  routing
// register || POST_REQUEST
router.post("/register", registerController);

//LOGIN || POST_REQUEST
router.post("/login", loginController);

// Forgot password || post_request

router.post("/forgot-password", forgotPasswordController);
//test routes protected routes
router.get("/test", requiresSignIn, isAdmin, testController);

// Protected user routes
router.get("/user-auth", requiresSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected admin routes
router.get("/admin-auth", requiresSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
