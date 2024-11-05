# NestJS Application with Students Module, Logger Middleware, and SQLite Database

This NestJS application demonstrates how to manage student records with CRUD operations, logging middleware for HTTP requests, and SQLite as the database using TypeORM.

## Overview

The application includes:

- **Student Management (CRUD)**: Create, Read, Update, and Delete student records using TypeORM with an SQLite database.
- **Logger Middleware**: Custom middleware to log incoming HTTP requests' method and path.
- **Configuration Management**: Centralized configuration using `@nestjs/config`.
- **TypeORM with SQLite**: Integrated TypeORM to interact with an SQLite database.

# Students Module for NestJS

The `StudentsModule` provides the functionality for managing students, including creating, reading, updating, and deleting student records. It uses **TypeORM** to interact with a database and **NestJS** for modular architecture and service-based logic.

## Overview

This module contains:

- **Student Entity**: Defines the structure of student records.
- **Student Service**: Provides business logic to manage students.
- **Student Controller**: Exposes HTTP endpoints for interacting with student data.

## File Structure

The `StudentsModule` consists of the following components:

- **students.controller.ts**: Handles incoming HTTP requests related to students (e.g., creating, updating, fetching students).
- **students.service.ts**: Contains the business logic for managing students, such as adding, retrieving, updating, and deleting students.
- **student.entity.ts**: Defines the `Student` entity class, which maps to the students table in the database.

# Student CRUDL with NestJS and TypeORM (UUID-based Entity)

This project demonstrates how to implement **Student CRUDL (Create, Read, Update, Delete, List)** functionality using **NestJS** and **TypeORM** with an **SQLite** or **PostgreSQL** database. The `Student` entity uses a UUID as the primary key and includes additional fields such as `username`, `first_name`, `last_name`, `email`, `created_at`, and `updated_at`.

## Entity Structure

The `Student` entity has the following fields:

- **`studentId`**: The unique identifier for the student (UUID).
- **`username`**: The unique username for the student.
- **`firstName`**: The student's first name (optional).
- **`lastName`**: The student's last name (optional).
- **`email`**: The student's email address (unique).
- **`createdAt`**: The timestamp when the student was created.
- **`updatedAt`**: The timestamp when the student was last updated (optional).

```typescript
@Entity({ name: 'students' })
export class Student implements IStudent {
  @PrimaryGeneratedColumn('uuid', { name: 'student_id' })
  studentId: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;
}
```

Here’s the `README.md` for the **Student CRUDL** functionality based on the provided `Student` entity with additional details on the new fields:

````markdown
# Student CRUDL with NestJS and TypeORM (UUID-based Entity)

This project demonstrates how to implement **Student CRUDL (Create, Read, Update, Delete, List)** functionality using **NestJS** and **TypeORM** with an **SQLite** or **PostgreSQL** database. The `Student` entity uses a UUID as the primary key and includes additional fields such as `username`, `first_name`, `last_name`, `email`, `created_at`, and `updated_at`.

## Entity Structure

The `Student` entity has the following fields:

- **`studentId`**: The unique identifier for the student (UUID).
- **`username`**: The unique username for the student.
- **`firstName`**: The student's first name (optional).
- **`lastName`**: The student's last name (optional).
- **`email`**: The student's email address (unique).
- **`createdAt`**: The timestamp when the student was created.
- **`updatedAt`**: The timestamp when the student was last updated (optional).

```typescript
@Entity({ name: 'students' })
export class Student implements IStudent {
  @PrimaryGeneratedColumn('uuid', { name: 'student_id' })
  studentId: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date;
}
```

## Endpoints

### 1. Create a Student

- **POST** `/students`
- **Request Body**:

  ```json
  {
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
  ```

- **Response**:
  ```json
  {
    "studentId": "uuid-1234-5678",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": null
  }
  ```

### 2. Get All Students

- **GET** `/students`
- **Response**:
  ```json
  [
    {
      "studentId": "uuid-1234-5678",
      "username": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": null
    },
    {
      "studentId": "uuid-5678-1234",
      "username": "jane_smith",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "createdAt": "2024-01-02T00:00:00Z",
      "updatedAt": "2024-01-03T00:00:00Z"
    }
  ]
  ```

### 3. Get a Single Student by ID

- **GET** `/students/:studentId`
- Example: `/students/uuid-1234-5678`

- **Response**:
  ```json
  {
    "studentId": "uuid-1234-5678",
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": null
  }
  ```

### 4. Update a Student

- **PUT** `/students/:studentId`
- **Request Body**:

  ```json
  {
    "username": "john_doe_updated",
    "firstName": "Johnathan",
    "lastName": "Doe",
    "email": "johnathan.doe@example.com"
  }
  ```

- **Response**:
  ```json
  {
    "studentId": "uuid-1234-5678",
    "username": "john_doe_updated",
    "firstName": "Johnathan",
    "lastName": "Doe",
    "email": "johnathan.doe@example.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-04T00:00:00Z"
  }
  ```

### 5. Delete a Student

- **DELETE** `/students/:studentId`
- Example: `/students/uuid-1234-5678`

- **Response**:
  - Status: `200 OK` if successfully deleted.

## Logger Middleware for NestJS

This is a simple **Logger Middleware** for a NestJS application. It logs each incoming HTTP request's method and path to the console.

### Overview

The `LoggerMiddleware` class intercepts all incoming requests and logs the HTTP method and request URL. This middleware can be useful for debugging, tracking, or monitoring requests during development.

### Key Features:

- Logs the HTTP **method** (e.g., GET, POST, PUT, DELETE).
- Logs the **request path** (e.g., `/students`, `/students/:studentId`).
- Executes asynchronously and passes control to the next middleware in the chain.

### Key Points in the README:

1. **Modules**: Explains the role of `AppModule`, `StudentsModule`, and the middleware.
2. **Configuration**: Details the usage of `ConfigModule` and TypeORM for SQLite configuration.
3. **Logging**: Describes the functionality of the custom logger middleware and how it works.
4. **Endpoints**: Lists the CRUD operations for the `Student` resource.
5. **Environment Setup**: Describes how to configure the database path using environment variables.

```

```

```

```
````
