"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs/promises");
var path = require("path");
var readline = require("readline");
var StudentManager = /** @class */ (function () {
    function StudentManager() {
        var _this = this;
        // filpath to store data
        this.filePath = path.join(__dirname, "../data/students.json");
        // creating readline interface to get user inputs
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // method to get user inputs
        this.askQuestion = function (question) {
            return new Promise(function (resolve) {
                _this.rl.question(question, resolve);
            });
        };
    }
    StudentManager.prototype.showMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, choice, _a, studentId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = "\n    Please choose an option:\n    1. Create Student\n    2. List Students\n    3. Update Student\n    4. Delete Student\n    5. Exit\n    ";
                        _b.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 18];
                        console.log(options);
                        return [4 /*yield*/, this.askQuestion("Enter your choice: ")];
                    case 2:
                        choice = _b.sent();
                        _a = choice;
                        switch (_a) {
                            case "1": return [3 /*break*/, 3];
                            case "2": return [3 /*break*/, 5];
                            case "3": return [3 /*break*/, 7];
                            case "4": return [3 /*break*/, 9];
                            case "5": return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 16];
                    case 3: return [4 /*yield*/, this.createStudent()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 5: return [4 /*yield*/, this.listStudents()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 7: return [4 /*yield*/, this.updateStudent()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 9: return [4 /*yield*/, this.askQuestion("Enter the student ID to delete: ")];
                    case 10:
                        studentId = _b.sent();
                        _b.label = 11;
                    case 11:
                        _b.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, this.deleteStudent(studentId)];
                    case 12:
                        _b.sent();
                        console.log("Student with ID ".concat(studentId, " deleted successfully."));
                        return [3 /*break*/, 14];
                    case 13:
                        error_1 = _b.sent();
                        console.error("Error deleting student: ".concat(error_1));
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        console.log("Exiting...");
                        this.rl.close();
                        return [2 /*return*/];
                    case 16:
                        console.log("Invalid choice, please try again.");
                        _b.label = 17;
                    case 17: return [3 /*break*/, 1];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    StudentManager.prototype.generateId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var randomNumber, hexLength, id;
            return __generator(this, function (_a) {
                randomNumber = Math.floor(Math.random() * 256);
                hexLength = randomNumber.toString(16).padStart(2, "0");
                id = "0x".concat(hexLength, "-54");
                return [2 /*return*/, id];
            });
        });
    };
    StudentManager.prototype.updateStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studentId_1, data, students, studentIndex, studentToUpdate, name_1, newName, ageStr, newAge, updatedScores, _i, _a, scoreDetail, gradeStr, newGrade, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.askQuestion("Enter the student ID to update (0x00(number)-54): ")];
                    case 1:
                        studentId_1 = _b.sent();
                        return [4 /*yield*/, fs.readFile(this.filePath, "utf-8")];
                    case 2:
                        data = _b.sent();
                        students = JSON.parse(data);
                        studentIndex = students.findIndex(function (student) { return student.studentId === studentId_1; });
                        if (studentIndex === -1) {
                            console.log("Student not found!");
                            return [2 /*return*/, null];
                        }
                        studentToUpdate = students[studentIndex];
                        return [4 /*yield*/, this.askQuestion("Enter new name (current: ".concat(studentToUpdate.name, "): "))];
                    case 3:
                        name_1 = _b.sent();
                        newName = name_1.trim() !== "" ? name_1 : studentToUpdate.name;
                        return [4 /*yield*/, this.askQuestion("Enter new age (current: ".concat(studentToUpdate.age, "): "))];
                    case 4:
                        ageStr = _b.sent();
                        newAge = ageStr.trim() !== "" ? parseInt(ageStr, 10) : studentToUpdate.age;
                        updatedScores = [];
                        _i = 0, _a = studentToUpdate.scores;
                        _b.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        scoreDetail = _a[_i];
                        return [4 /*yield*/, this.askQuestion("Enter new grade for ".concat(scoreDetail.subject, " (current: ").concat(scoreDetail.grade, "): "))];
                    case 6:
                        gradeStr = _b.sent();
                        newGrade = gradeStr.trim() !== "" ? parseInt(gradeStr, 10) : scoreDetail.grade;
                        updatedScores.push({ subject: scoreDetail.subject, grade: newGrade });
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        students[studentIndex] = __assign(__assign({}, studentToUpdate), { name: newName, age: newAge, scores: updatedScores });
                        return [4 /*yield*/, fs.writeFile(this.filePath, JSON.stringify(students, null, 2))];
                    case 9:
                        _b.sent();
                        console.log("Student updated:", students[studentIndex]);
                        return [2 /*return*/, students[studentIndex]];
                    case 10:
                        error_2 = _b.sent();
                        console.error("Error updating student:", error_2);
                        return [2 /*return*/, null];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    StudentManager.prototype.deleteStudent = function (studentId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, students, index, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fs.readFile(this.filePath, "utf-8")];
                    case 1:
                        data = _a.sent();
                        students = JSON.parse(data);
                        index = students.findIndex(function (student) { return student.studentId === studentId; });
                        if (index === -1) {
                            throw new Error("Student not found");
                        }
                        students.splice(index, 1);
                        return [4 /*yield*/, fs.writeFile(this.filePath, JSON.stringify(students, null, 2))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error deleting student:", error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StudentManager.prototype.createStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studentId, name_2, ageStr, age, scores, _i, _a, subject, grade, gradeStr, newStudent, students, data, error_4, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 15, , 16]);
                        return [4 /*yield*/, this.generateId()];
                    case 1:
                        studentId = _b.sent();
                        return [4 /*yield*/, this.askQuestion("Enter student name: ")];
                    case 2:
                        name_2 = _b.sent();
                        return [4 /*yield*/, this.askQuestion("Enter student age: ")];
                    case 3:
                        ageStr = _b.sent();
                        age = parseInt(ageStr, 10);
                        scores = [];
                        _i = 0, _a = [
                            "english",
                            "mathematics",
                            "computer science",
                        ];
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        subject = _a[_i];
                        grade = void 0;
                        _b.label = 5;
                    case 5:
                        if (!true) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.askQuestion("Enter grade for ".concat(subject, ": "))];
                    case 6:
                        gradeStr = _b.sent();
                        grade = parseInt(gradeStr, 10);
                        if (grade >= 0 && grade <= 100) {
                            return [3 /*break*/, 7];
                        }
                        else {
                            console.log("Grade for ".concat(subject, " must be between 0 and 100. Please try again."));
                        }
                        return [3 /*break*/, 5];
                    case 7:
                        scores.push({ subject: subject, grade: grade });
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 4];
                    case 9:
                        newStudent = { studentId: studentId, name: name_2, age: age, scores: scores };
                        students = [];
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, fs.readFile(this.filePath, "utf-8")];
                    case 11:
                        data = _b.sent();
                        students = JSON.parse(data);
                        return [3 /*break*/, 13];
                    case 12:
                        error_4 = _b.sent();
                        console.log("Students file does not exist, creating a new one...");
                        return [3 /*break*/, 13];
                    case 13:
                        students.push(newStudent);
                        return [4 /*yield*/, fs.writeFile(this.filePath, JSON.stringify(students, null, 2))];
                    case 14:
                        _b.sent();
                        console.log("Student added:", newStudent);
                        return [2 /*return*/, newStudent];
                    case 15:
                        error_5 = _b.sent();
                        console.error("Error creating student:", error_5);
                        throw error_5;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    StudentManager.prototype.listStudents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, students, error_6, initialStudents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, fs.access(this.filePath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.readFile(this.filePath, "utf-8")];
                    case 2:
                        data = _a.sent();
                        students = JSON.parse(data);
                        console.table(students);
                        return [3 /*break*/, 5];
                    case 3:
                        error_6 = _a.sent();
                        console.log("File does not exist, creating file and adding a student...");
                        initialStudents = [];
                        return [4 /*yield*/, fs.writeFile(this.filePath, JSON.stringify(initialStudents, null, 2))];
                    case 4:
                        _a.sent();
                        console.table(initialStudents);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return StudentManager;
}());
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var studentManager;
    return __generator(this, function (_a) {
        studentManager = new StudentManager();
        studentManager.showMenu();
        return [2 /*return*/];
    });
}); };
main();
