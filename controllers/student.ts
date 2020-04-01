import { StudentMiddleware } from "../middleware/student";
import { Router } from "express";

const studentMiddleWare = new StudentMiddleware();

class StudentController {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.addRoutes();
  }

  private addRoutes() {
    this.router.get("/", studentMiddleWare.getStudents);
    this.router.get("/:id", studentMiddleWare.getStudentByID);
    this.router.post("/", studentMiddleWare.addStudent);
    this.router.put("/:id", studentMiddleWare.updateStudent);
    this.router.delete("/:id", studentMiddleWare.deleteStudent);
    this.router.post("/dummy", studentMiddleWare.generateDummyData);
  }
}

export default new StudentController().router;
