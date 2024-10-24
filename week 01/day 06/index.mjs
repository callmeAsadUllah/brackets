import { stdin as input, stdout as output } from "node:process";
import fs from "node:fs/promises";
import readline from "node:readline/promises";

const students = [];
let totalStudents = 0;

const calculateAverageScore = (scores) => {
  const totalScore = calculateTotalScore(scores);
  const averageScore = (totalScore / scores.length).toFixed(2);
  return averageScore;
};

const calculateMaximumScore = (scores) => {
  const maxScore = Math.max(...scores);
  return maxScore;
};

const calculateMinimumScore = (scores) => {
  const minScore = Math.min(...scores);
  return minScore;
};

const calculateTotalScore = (scores) => {
  const totalScore = scores.reduce((a, b) => a + b, 0);
  return totalScore;
};

const createStudent = async () => {
  const scores = [];
  const rl = readline.createInterface({ input, output });
  const name = await rl.question("Enter student name: ");
  for (let i = 0; i < 3; i++) {
    scores = await rl.question("Enter student score: ");
    scores.push(parseInt(scores));
  }

  rl.close();
  return { name, scores };
};

function writeStudents(students) {
  fs.writeFile(
    "d:/brackets/week 01/day 06/students.json",
    "utf-8",
    JSON.stringify(students, null, 2)
  );
}

const studentData = async () => {
  try {
    const data = await fs.readFile(
      "d:/brackets/week 01/day 06/students.json",
      "utf-8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to fetch student data:", error);
    return [];
  }
};

function addStudentsToArray(fetchedStudents) {
  fetchedStudents.forEach((student) => {
    students.push(student);
    totalStudents++;
  });
}

const displayStudentData = () => {
  const formattedData = students.map((student) => {
    const totalScore = calculateTotalScore(student.scores);
    const averageScore = calculateAverageScore(student.scores);
    const maximumScore = calculateMaximumScore(student.scores);
    const minimumScore = calculateMinimumScore(student.scores);

    return {
      Name: student.name,
      Scores: student.scores.join(", "),
      TotalScores: totalScore,
      AverageScores: averageScore,
      MaximumScores: maximumScore,
      MinimumScores: minimumScore,
    };
  });
  const overallTotalScore = students.reduce(
    (total, student) => total + student.scores.reduce((a, b) => a + b, 0),
    0
  );
  const overallAverageScore = (overallTotalScore / students.length).toFixed(2);

  const overallMaxScore = Math.max(
    ...students.map((student) => student.scores.reduce((a, b) => a + b, 0))
  );
  const overallMinScore = Math.min(
    ...students.map((student) => student.scores.reduce((a, b) => a + b, 0))
  );

  console.log("Students Record Manager");

  console.log(formattedData);

  console.log(`Total number of students: ${totalStudents}`);

  console.log(`Overall Total Score of All Students: ${overallTotalScore}`);

  console.log(`Overall Average Score of All Students: ${overallAverageScore}`);

  console.log(`Overall Maximum Score of All Students: ${overallMaxScore}`);

  console.log(`Overall Minimum Score of All Students: ${overallMinScore}`);
};

const main = async () => {
  const students = await studentData();
  addStudentsToArray(students);
  displayStudentData();
};

main();
