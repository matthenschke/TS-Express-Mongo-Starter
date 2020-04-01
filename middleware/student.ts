import mongoose from "mongoose";

import { StudentSchema } from "../models/student";
import { Request, Response } from "express";

const StudentModel = mongoose.model("Student", StudentSchema);
export class StudentMiddleware {
  public addStudent(req: Request, res: Response) {
    let newStudent = new StudentModel(req.body);
    newStudent.save((err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public getStudents(req: Request, res: Response) {
    StudentModel.find({}, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public getStudentByID(req: Request, res: Response) {
    StudentModel.findById(req.params.id, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }

  public updateStudent(req: Request, res: Response) {
    StudentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          res.send(err);
        }
        res.send(data);
      }
    );
  }

  public deleteStudent(req: Request, res: Response) {
    StudentModel.findOneAndDelete({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json({ msg: "successfully deleted student" });
    });
  }

  public generateDummyData(req: Request, res: Response) {
    const data = [
      {
        firstName: "Matthew",
        lastName: "Henschke",
        school: "College of Staten Island",
        startDate: new Date("2016-08-26T08:00:00")
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        school: "St Johns",
        startDate: new Date("2018-08-26T08:00:00")
      },
      {
        firstName: "Joe",
        lastName: "Schmo",
        school: "College of Staten Island",
        startDate: new Date("2016-08-26T08:30:00")
      },
      {
        firstName: "John",
        lastName: "Doe",
        school: "Wagner College",
        startDate: new Date("2016-08-26T13:01:50")
      }
    ];
    StudentModel.insertMany(data, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json({ msg: "successfully inserted new documents" });
    });
  }
}
