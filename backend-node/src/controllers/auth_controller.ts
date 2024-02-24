import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import { inject, singleton } from "tsyringe";
import UserService from "../services/user_service";
import { ErrorHandler } from "../exceptions/error_handler";

@singleton()
export default class AuthController {
  constructor(
    @inject(UserService)
    private readonly _userServices: UserService
  ) {}
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const token = await this._userServices.loginLocal(email, password);
      if (token) {
        return res.cookie("token", token).redirect("/home");
      } else {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "Authentication failed, worong password" });
      }
    } catch (error) {
      res.locals.error = error;
      new ErrorHandler().handleErrorWeb(req, res, error, "/login");
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, gender, full_name } = req.body;

      const token = await this._userServices.signUpLocal(
        full_name,
        email,
        password,
        gender
      );
      return res.cookie("token", token).redirect("/home");
    } catch (error) {
      res.locals.error = error;
      new ErrorHandler().handleErrorWeb(req, res, error, "/signup");
    }
  };
}
