"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Student = /** @class */ (function () {
    function Student(name, age, scores) {
        this.name = name;
        this.age = age;
        this.scores = scores;
    }
    Student.prototype.toString = function () {
        return "Name: ".concat(this.name, "\nAge: ").concat(this.age, "\nScores: ").concat(this.scores);
    };
    return Student;
}());
var StudentManager = /** @class */ (function () {
    function StudentManager() {
        this.students = [];
    }
    StudentManager.prototype.addStudent = function (student) {
        this.students.push(student);
    };
    StudentManager.prototype.getStudents = function () {
        return this.students;
    };
    StudentManager.prototype.totalStudents = function () {
        return this.students.length;
    };
    return StudentManager;
}());
var studentObject0 = new Student("M. Asad Ullah", 21, [2, 4, 5]);
var studentObject1 = new Student("Amna", 22, [2, 4, 5]);
var studentManagerObject0 = new StudentManager();
studentManagerObject0.addStudent(studentObject0);
studentManagerObject0.addStudent(studentObject1);
console.log(studentManagerObject0.getStudents());
