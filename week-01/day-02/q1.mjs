const studentNamesAndScores = [
  { name: "sakib", score: 5 },
  { name: "sameer", score: 14 },
  { name: "sam", score: 10 },
  { name: "amin", score: 16 },
  { name: "waseem", score: 75 },
  { name: "sakib", score: 45 },
  { name: "sakib", score: 99 },
  { name: "sakib", score: 65 },
  { name: "Amna", score: 54 },
  { name: "Asad Ullah", score: 35 },
];

const averageScore =
  studentNamesAndScores
    .map((student) => student.score)
    .reduce((a, b) => a + b, 0) / studentNamesAndScores.length;

console.log(averageScore.toFixed(2));
