import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();
//  routing
// register || POST_REQUEST
router.post("/register", registerController);

//LOGIN || POST_REQUEST
router.post("/login", loginController);

//test routes protected routes
router.get("/test", requiresSignIn, isAdmin, testController);

router.get("/user-auth", requiresSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
