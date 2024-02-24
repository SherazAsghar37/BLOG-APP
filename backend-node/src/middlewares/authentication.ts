import { NextFunction } from "express";
import { singleton } from "tsyringe";
import { Request, Response } from "express";
import JWT_Utils from "../utils/JWT_Utils";
import { User } from "../@types/user";

@singleton()
export default class Authentication {
  public checkForWebAuth = (cookie: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies[cookie];
      if (!token) {
        return next();
      }
      try {
        const jwt = new JWT_Utils();
        const user: User = jwt.verifyToken(token) as User;
        res.locals.user = user;
      } catch (error) {}
      return next();
    };
  };
}
