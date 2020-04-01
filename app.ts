import express, { Application } from "express";
import bodyparser from "body-parser";

import mongoose from "mongoose";
import StudentController from "./controllers/student";

export class App {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.initializeMiddleware();
    this.initializeControllers();
    this.mongoSetup();
    this.listen();
  }

  private initializeMiddleware(): void {
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: false }));
  }

  private initializeControllers(): void {
    this.app.use("/student", StudentController);
  }

  private mongoSetup(): void {
    mongoose
      .connect("connection_string", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("connected");
      })
      .catch(err => console.log(err));
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on Port: ${this.port}`);
    });
  }
}

new App();
