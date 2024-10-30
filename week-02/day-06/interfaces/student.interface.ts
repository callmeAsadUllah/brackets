export type Score = "english" & "mathematics" & "computer science";

export interface IScoreDetail {
  subject: Score;
  grade: number;
}

export interface IStudent {
  studentId: string;
  name: string;
  age: number;
  scores: IScoreDetail[];
}
