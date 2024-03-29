import { NextFunction } from "express";
import { singleton } from "tsyringe";
import { ZodError, z } from "zod";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Request, Response } from "express";

@singleton()
export default class Validation {
  public userSignUpValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userSchema = z.object({
      full_name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      gender: z.string(),
    });
    try {
      const user = req.body;
      userSchema.parse(user);
      return next();
    } catch (error) {
      if (error instanceof ZodError) return zodErrorHandler(error, res);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "some thing went wrong" });
    }
  };
  public userLoginValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    try {
      const user = req.body;
      userSchema.parse(user);
      return next();
    } catch (error) {
      if (error instanceof ZodError) return zodErrorHandler(error, res);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "some thing went wrong" });
    }
  };
  public blogValidator = (req: Request, res: Response, next: NextFunction) => {
    const MAX_FILE_SIZE = 50000000;
    const ACCEPTED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    const blogSchema = z.object({
      title: z.string(),
      content: z.string(),
      cover_url: z
        .any()
        .refine((files) => {
          console.log(`your file size is  : ${files?.size}`);
          return files?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine((files) => {
          console.log(`your file type is  : ${files?.mimetype}`);
          return ACCEPTED_IMAGE_TYPES.includes(files?.mimetype);
        }, `Only .jpg, .jpeg, .png and .webp formats are supported`),
    });
    try {
      const blog = req.body;
      blogSchema.parse({
        title: blog.title,
        content: blog.content,
        cover_url: req.file,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) return zodErrorHandler(error, res);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "some thing went wrong" });
    }
  };
}

function zodErrorHandler(error: ZodError, res: Response): Response {
  const response = error.errors.map((err) => {
    return {
      field: err.path.join("."),
      message:
        err.message === "Request"
          ? `Field ${err.path.join(".")} is required`
          : err.message,
    };
  });
  return res.status(HttpStatusCode.FORBIDDEN).json({
    message: "validation failed",
    error: response,
  });
}
