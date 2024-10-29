import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { promises as fs } from "node:fs";
import { IScoreDetail, IStudent, Score } from "../interfaces/student.interface";

const rl = createInterface({ input, output });

class StudentManager {
  public students: IStudent[] = [];
  public async listStudents(): Promise<void> {
    const data = await fs.readFile("./../data/students.json", "utf-8");
    const students = JSON.parse(data);
    console.table(students);
  }
}

const main = async () => {
  const studentManager = new StudentManager();
  await studentManager.listStudents();
};

main();
