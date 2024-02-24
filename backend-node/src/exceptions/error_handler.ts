import { Response, Request } from "express";
import { CustomError } from "./custom_error";
import HttpStatusCode from "../utils/HttpStatusCode";

export class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof CustomError) {
      return true;
    }
    return false;
  }

  private handleTrustedError(error: CustomError, response: Response): void {
    response.status(error.httpCode).json({ message: error.message });
  }

  private handleCriticalError(
    error: Error | CustomError,
    response?: Response
  ): void {
    if (response) {
      console.trace(error);
      response
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }

    console.log("Application encountered a critical error");
    // process.exit(1);
  }

  private async handleTrustedErrorWeb(
    request: Request,
    response: Response,
    error: CustomError,
    render: string
  ): Promise<void> {
    await request.flash("msg", error.message);
    return response.redirect(render);
  }

  private handleCriticalErrorWeb(
    request: Request,
    response: Response,
    error: Error | CustomError,
    render: string
  ): void {
    if (response) {
      console.trace(error);
      request.flash("msg", error.toString());
      return response.redirect(render);
    }

    console.log("Application encountered a critical error");
    // process.exit(1);
  }

  public handleError(
    error: Error | CustomError | any,
    response?: Response
  ): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as CustomError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  public handleErrorWeb(
    request: Request,
    response: Response,
    error: Error | CustomError | any,
    render: string
  ): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedErrorWeb(
        request,
        response,
        error as CustomError,
        render
      );
    } else {
      this.handleCriticalErrorWeb(request, response, error, render);
    }
  }
}
