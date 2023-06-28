import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
//router object
const router = express.Router();
//  routing
// register || POST_REQUEST
router.post("/register", registerController);

//LOGIN || POST_REQUEST
router.post("/login", loginController);
export default router;
