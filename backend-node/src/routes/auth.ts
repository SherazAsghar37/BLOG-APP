import express from "express";
import { container } from "tsyringe";
import Validation from "../middlewares/validation";
import AuthController from "../controllers/auth_controller";
const authRouter = express.Router();
const validation = container.resolve(Validation);
const authController = container.resolve(AuthController);
authRouter
  .route("/signup")
  .post(validation.userSignUpValidator, authController.signUp);
authRouter
  .route("/login")
  .post(validation.userLoginValidator, authController.login);
export default authRouter;
