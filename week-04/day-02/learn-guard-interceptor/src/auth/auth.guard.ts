// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import { Observable } from 'rxjs';
// import { Role } from 'src/roles/role.enum';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const student = request.student;
//
//     if (student && student.role === Role.ADMIN) {
//       return true;
//     }
//
//     return false;
//   }
//   //     const request = context.switchToHttp().getRequest();
//   //     const token = request.headers['authorization']?.split(' ')[1];
//   //     if (!token) {
//   //       throw new Error('JWT token is missing');
//   //     }
//   //
//   //     try {
//   //       const payload = this.jwtService.verifyToken(token);
//   //       request.student = payload;
//   //       return true;
//   //     } catch (error) {
//   //       throw new Error('Invalid or expired JWT token');
//   //     }
// }
