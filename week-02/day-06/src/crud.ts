import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { promises as fs } from "node:fs";
import { IStudent } from "./../interfaces/student.interface";

const rl = createInterface({ input, output });

class CRUD {
  public async createStudent(student: IStudent): Promise<void> {}
  public async readStudent(id: string): Promise<IStudent | null> {
    return null;
  }
  public async updateStudent(id: string, student: IStudent): Promise<void> {}
  public async deleteStudent(id: string): Promise<void> {}
  public async getAllStudents(): Promise<IStudent[]> {
    const data = await fs.readFile(`./../data/students.json`, "utf-8");
    return JSON.parse(data);
  }
}

async function main() {
  const crudObject1 = new CRUD();
  const students = await crudObject1.getAllStudents();
  console.table(students);
}

main().catch(console.error);
