import "reflect-metadata";
import { Application } from "express";
import appConfig from "./src/config/app.config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import staticRouter from "./src/routes/static";
import authRouter from "./src/routes/auth";
import blogRouter from "./src/routes/blog";

dotenv.config();
const port = process.env.PORT || 8000;
const app: Application = appConfig();

mongoose
  .connect(process.env.DATABASE_URL!)
  .then((e) => console.log("MongoDB Connected"))
  .catch((error) => {
    console.log("MonogDB connection error : ", error);
  });

app.use("/api", authRouter);
app.use("/", staticRouter);
app.use("/api", blogRouter);

app.get("/test", (req, res) => {
  return res.json("");
});

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
