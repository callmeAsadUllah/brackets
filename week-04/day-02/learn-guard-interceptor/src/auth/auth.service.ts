import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async authView(): Promise<object> {
    return { message: 'Auth View' };
  }

  //   async validateStudent(email: string, password: string): Promise<any> {
  //     const student = await this.studentsService.findOneByStudentEmail(email);
  //     if (student && (await bcrypt.compare(password, student.password))) {
  //       const { password, ...result } = student;
  //       return result;
  //     }
  //     return null;
  //   }
  //
  //   async register(registerAuthDto: RegisterAuthDto): Promise<Student> {
  //     const studentEmail = await this.studentsService.findOneByStudentEmail(
  //       registerAuthDto.email,
  //     );
  //     if (studentEmail) {
  //       throw new Error('Email already exists');
  //     }
  //
  //     const studentUsername = await this.studentsService.findOneByStudentUsername(
  //       registerAuthDto.username,
  //     );
  //     if (studentUsername) {
  //       throw new Error('Username already taken');
  //     }
  //
  //     const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);
  //     const student = await this.studentsService.createStudent({
  //       ...registerAuthDto,
  //       password: hashedPassword,
  //     });
  //     return student;
  //   }
  //
  //   async login(loginAuthDto: LoginAuthDto): Promise<any> {
  //     const studentEmail = await this.studentsService.findOneByStudentEmail(
  //       loginAuthDto.email,
  //     );
  //     if (studentEmail) {
  //       throw new Error('Email already exists');
  //     }
  //
  //     const student = await this.validateStudent(
  //       loginAuthDto.email,
  //       loginAuthDto.password,
  //     );
  //
  //     const token = await this.jwtService.generateToken(student);
  //     return { access_token: token };
  //   }
}
