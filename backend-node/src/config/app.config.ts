import express, { Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { container } from "tsyringe";
import Authentication from "../middlewares/authentication";
import session from "express-session";
import flash from "connect-flash";

function appConfig() {
  const app: Application = express();

  const authentication = container.resolve(Authentication);
  app.use(
    session({
      secret: "secretz",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 6000 },
    })
  );
  app.use(flash());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(authentication.checkForWebAuth("token"));
  app.use(express.static(path.resolve(__dirname, "../public")));

  app.set("view engine", "ejs");
  app.set("views", path.resolve("./src/views"));
  return app;
}

export default appConfig;
