"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
var GradeLevel_1 = require("./GradeLevel");
var Student = /** @class */ (function () {
    function Student(name, age, scores, gradeLevel) {
        this.name = name;
        this.age = age;
        this.scores = scores;
        this.gradeLevel = gradeLevel;
    }
    Student.prototype.isPassed = function (passingScore) {
        if (passingScore === void 0) { passingScore = 60; }
        var totalScore = this.scores.reduce(function (a, b) { return a + b; }, 0);
        var averageScore = parseFloat((totalScore / this.scores.length).toFixed(2));
        if (averageScore >= passingScore) {
            return true;
        }
        else {
            return false;
        }
    };
    Student.prototype.status = function () {
        return this.isPassed() ? "Passed" : "Failed";
    };
    Student.prototype.toString = function () {
        return "\tName: ".concat(this.name, "\n\tAge: ").concat(this.age, "\n\tScores: ").concat(this.scores, "\n\tGrade Level: ").concat(this.gradeLevel, "\n\tStatus: ").concat(this.status());
    };
    return Student;
}());
exports.Student = Student;
function filterStudents(students, criteria) {
    return students.filter(criteria);
}
var students = [
    new Student("Alice", 18, [90, 85, 88], GradeLevel_1.GradeLevel.Freshman),
    new Student("Bob", 19, [55, 20, 65], GradeLevel_1.GradeLevel.Sophomore),
    new Student("Charlie", 20, [70, 15, 80], GradeLevel_1.GradeLevel.Junior),
    new Student("Diana", 21, [40, 45, 50], GradeLevel_1.GradeLevel.Senior),
    new Student("Eve", 22, [85, 40, 50], GradeLevel_1.GradeLevel.Freshman),
    new Student("Frank", 23, [75, 80, 85], GradeLevel_1.GradeLevel.Sophomore),
];
var passedStudents = filterStudents(students, function (student) {
    return student.isPassed();
});
var failedStudents = filterStudents(students, function (student) { return !student.isPassed(); });
console.log("\n\n\n\nTotal Students");
students.forEach(function (student) { return console.log("".concat(student.toString())); });
console.log("\n\n\n\nPassed Students");
passedStudents.forEach(function (student) { return console.log("".concat(student.toString())); });
console.log("\n\n\n\nFailed Students");
failedStudents.forEach(function (student) { return console.log("".concat(student.toString())); });
