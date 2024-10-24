import { GradeLevel } from "./GradeLevel";

export class Student {
  public name: string;
  public age: number;
  public scores: number[];
  public gradeLevel: GradeLevel;

  public constructor(
    name: string,
    age: number,
    scores: number[],
    gradeLevel: GradeLevel
  ) {
    this.name = name;
    this.age = age;
    this.scores = scores;
    this.gradeLevel = gradeLevel;
  }

  public isPassed(passingScore: number = 60): boolean {
    const totalScore: number = this.scores.reduce((a, b) => a + b, 0);
    const averageScore: number = parseFloat(
      (totalScore / this.scores.length).toFixed(2)
    );
    if (averageScore >= passingScore) {
      return true;
    } else {
      return false;
    }
  }
  private status(): string {
    return this.isPassed() ? "Passed" : "Failed";
  }
  public toString(): string {
    return `\tName: ${this.name}\n\tAge: ${this.age}\n\tScores: ${
      this.scores
    }\n\tGrade Level: ${this.gradeLevel}\n\tStatus: ${this.status()}`;
  }
}

function filterStudents<T>(
  students: T[],
  criteria: (student: T) => boolean
): T[] {
  return students.filter(criteria);
}

const students: Student[] = [
  new Student("Alice", 18, [90, 85, 88], GradeLevel.Freshman),
  new Student("Bob", 19, [55, 20, 65], GradeLevel.Sophomore),
  new Student("Charlie", 20, [70, 15, 80], GradeLevel.Junior),
  new Student("Diana", 21, [40, 45, 50], GradeLevel.Senior),
  new Student("Eve", 22, [85, 40, 50], GradeLevel.Freshman),
  new Student("Frank", 23, [75, 80, 85], GradeLevel.Sophomore),
];

const passedStudents = filterStudents(students, (student) =>
  student.isPassed()
);
const failedStudents = filterStudents(
  students,
  (student) => !student.isPassed()
);

console.log("\n\n\n\nTotal Students");
students.forEach((student) => console.log(`${student.toString()}`));

console.log("\n\n\n\nPassed Students");
passedStudents.forEach((student) => console.log(`${student.toString()}`));

console.log("\n\n\n\nFailed Students");

failedStudents.forEach((student) => console.log(`${student.toString()}`));
