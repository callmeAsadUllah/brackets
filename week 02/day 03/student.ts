import { IStudent } from "./student.interface";

class Student implements IStudent {
  public name: string;
  public age: number;
  public scores: number[];

  public constructor(name: string, age: number, scores: number[]) {
    this.name = name;
    this.age = age;
    this.scores = scores;
  }

  public toString(): string {
    return `Name: ${this.name}\nAge: ${this.age}\nScores: ${this.scores}`;
  }
}

class StudentManager {
  public students: Student[];
  public constructor() {
    this.students = [];
  }

  public addStudent(student: Student): void {
    this.students.push(student);
  }

  public getStudents(): Student[] {
    return this.students;
  }

  public totalStudents(): number {
    return this.students.length;
  }
}
const studentObject0 = new Student("M. Asad Ullah", 21, [2, 4, 5]);
const studentObject1 = new Student("Amna", 22, [2, 4, 5]);

const studentManagerObject0 = new StudentManager();

studentManagerObject0.addStudent(studentObject0);
studentManagerObject0.addStudent(studentObject1);

console.log(studentManagerObject0.getStudents());
