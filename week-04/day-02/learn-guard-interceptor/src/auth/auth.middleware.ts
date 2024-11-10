// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { StudentsService } from 'src/students/students.service';
//
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly studentsService: StudentsService) {}
//
//   async use(request: Request, response: Response, next: NextFunction) {
//     const studentId = request.headers['studentId'].toLocaleString();
//     const student = await this.studentsService.findOneByStudentId(studentId);
//     request.student = student;
//     next();
//   }
// }
