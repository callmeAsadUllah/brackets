import * as fs from "fs/promises";
import * as path from "path";
import * as readline from "readline";

import { IScoreDetail, IStudent, Score } from "../interfaces/student.interface";

class StudentManager {
  // filpath to store data
  filePath = path.join(__dirname, "../data/students.json");
  // creating readline interface to get user inputs
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // method to get user inputs
  askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  };
  public async showMenu(): Promise<void> {
    const options = `
    Please choose an option:
    1. Create Student
    2. List Students
    3. Update Student
    4. Delete Student
    5. Exit
    `;

    while (true) {
      console.log(options);
      const choice = await this.askQuestion("Enter your choice: ");

      switch (choice) {
        case "1":
          await this.createStudent();
          break;
        case "2":
          await this.listStudents();
          break;
        case "3":
          await this.updateStudent();
          break;
        case "4":
          const studentId = await this.askQuestion(
            "Enter the student ID to delete (0x00(number)-54): "
          );
          try {
            await this.deleteStudent(studentId);
            console.log(`Student with ID ${studentId} deleted successfully.`);
          } catch (error) {
            console.error(`Error deleting student: ${error as Error}`);
          }
          break;
        case "5":
          console.log("Exiting...");
          this.rl.close();
          return;
        default:
          console.log("Invalid choice, please try again.");
      }
    }
  }

  public async generateId(): Promise<string> {
    const randomNumber = Math.floor(Math.random() * 256);
    const hexLength = randomNumber.toString(16).padStart(2, "0");
    const id = `0x${hexLength}-54`;
    return id;
  }

  public async updateStudent(): Promise<IStudent | null> {
    try {
      const studentId = await this.askQuestion(
        "Enter the student ID to update (0x00(number)-54): "
      );

      const data = await fs.readFile(this.filePath, "utf-8");
      const students: IStudent[] = JSON.parse(data);
      const studentIndex = students.findIndex(
        (student) => student.studentId === studentId
      );

      if (studentIndex === -1) {
        console.log("Student not found!");
        return null;
      }

      const studentToUpdate = students[studentIndex];

      const name = await this.askQuestion(
        `Enter new name (current: ${studentToUpdate.name}): `
      );
      const newName = name.trim() !== "" ? name : studentToUpdate.name;
      const ageStr = await this.askQuestion(
        `Enter new age (current: ${studentToUpdate.age}): `
      );
      const newAge =
        ageStr.trim() !== "" ? parseInt(ageStr, 10) : studentToUpdate.age;

      const updatedScores: IScoreDetail[] = [];
      for (const scoreDetail of studentToUpdate.scores) {
        const gradeStr = await this.askQuestion(
          `Enter new grade for ${scoreDetail.subject} (current: ${scoreDetail.grade}): `
        );
        const newGrade =
          gradeStr.trim() !== "" ? parseInt(gradeStr, 10) : scoreDetail.grade;
        updatedScores.push({ subject: scoreDetail.subject, grade: newGrade });
      }

      students[studentIndex] = {
        ...studentToUpdate,
        name: newName,
        age: newAge,
        scores: updatedScores,
      };

      await fs.writeFile(this.filePath, JSON.stringify(students, null, 2));
      console.log("Student updated:", students[studentIndex]);
      return students[studentIndex];
    } catch (error) {
      console.error("Error updating student:", error);
      return null;
    }
  }

  public async deleteStudent(studentId: string): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const students: IStudent[] = JSON.parse(data);

      const index = students.findIndex(
        (student) => student.studentId === studentId
      );

      if (index === -1) {
        throw new Error("Student not found");
      }

      students.splice(index, 1);

      await fs.writeFile(this.filePath, JSON.stringify(students, null, 2));
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  }

  public async createStudent(): Promise<IStudent> {
    try {
      const studentId = await this.generateId();
      const name = await this.askQuestion("Enter student name: ");
      const ageStr = await this.askQuestion("Enter student age: ");
      const age = parseInt(ageStr, 10);

      const scores: IScoreDetail[] = [];
      for (const subject of [
        "english",
        "mathematics",
        "computer science",
      ] as Score[]) {
        let grade: number;
        while (true) {
          const gradeStr = await this.askQuestion(
            `Enter grade for ${subject}: `
          );
          grade = parseInt(gradeStr, 10);

          if (grade >= 0 && grade <= 100) {
            break;
          } else {
            console.log(
              `Grade for ${subject} must be between 0 and 100. Please try again.`
            );
          }
        }
        scores.push({ subject, grade });
      }

      const newStudent: IStudent = { studentId, name, age, scores };

      let students: IStudent[] = [];
      try {
        const data = await fs.readFile(this.filePath, "utf-8");
        students = JSON.parse(data);
      } catch (error) {
        console.log("Students file does not exist, creating a new one...");
      }

      students.push(newStudent);

      await fs.writeFile(this.filePath, JSON.stringify(students, null, 2));
      console.log("Student added:", newStudent);
      return newStudent;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  }

  public async listStudents(): Promise<void> {
    try {
      await fs.access(this.filePath);
      const data = await fs.readFile(this.filePath, "utf-8");
      const students = JSON.parse(data);
      console.table(students);
    } catch (error) {
      console.log("File does not exist, creating file and adding a student...");
      const initialStudents: IStudent[] = [];
      await fs.writeFile(
        this.filePath,
        JSON.stringify(initialStudents, null, 2)
      );
      console.table(initialStudents);
    }
  }
}

const main = async () => {
  const studentManager = new StudentManager();
  studentManager.showMenu();
};

main();
