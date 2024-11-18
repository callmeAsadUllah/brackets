# Books Module - NestJS

The **Books Module** is a part of the NestJS application that provides CRUD operations for managing books in a MongoDB database. This module includes the schema definition, data transfer objects (DTOs), services, and controllers necessary for handling book data.

## Table of Contents

- [Overview](#overview)
- [Module Structure](#module-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [DTOs](#dtos)
- [Service Methods](#service-methods)

## Overview

This module is responsible for managing **Books**. It connects to MongoDB and provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on books. The `Book` schema includes basic fields such as `title`, `author`, `description`, and `publishedDate`.

## Module Structure

The module structure looks like this:

```
src/
  ├── books/
  │   ├── book.schema.ts        # Mongoose schema for the Book entity
  │   ├── books.controller.ts   # Controller handling book-related routes
  │   ├── books.service.ts      # Service containing the business logic
  │   ├── books.module.ts       # The module file
  │   └── dtos/
  │       └── book.dto.ts       # DTOs for validation and transformation
  ├── common/
  │   └── interfaces/
  │       └── response.interface.ts
```

### 1. **Book Schema**

The `Book` schema defines the structure of the book document in MongoDB.

### 2. **Controller**

The `BooksController` provides routes for creating, reading, updating, and deleting books.

### 3. **Service**

The `BooksService` contains the business logic for the books. It interacts with the MongoDB database via the Mongoose model.

### 4. **Module**

The `BooksModule` imports the Mongoose schema, declares the controller and service, and provides everything necessary for the books functionality.

## Usage

Once the application is running, you can interact with the **Books API** via the following endpoints.

## API Endpoints

### 1. **Get All Books**

- **URL:** `/books`
- **Method:** `GET`
- **Response:** List of all books

### 2. **Create a Book**

- **URL:** `/books`
- **Method:** `POST`
- **Body:** `CreateBookDTO` (title, author, description, publishedDate)
- **Response:** Created book object

### 3. **Get Book by ID**

- **URL:** `/books/:bookId`
- **Method:** `GET`
- **Response:** Book object with the specified ID

### 4. **Update a Book**

- **URL:** `/books/:bookId`
- **Method:** `PUT`
- **Body:** `UpdateBookDTO` (title, author, description, publishedDate)
- **Response:** Updated book object

### 5. **Partially Update a Book**

- **URL:** `/books/:bookId`
- **Method:** `PATCH`
- **Body:** `UpdateBookPartialDTO` (title, description, author, etc.)
- **Response:** Partially updated book object

### 6. **Delete a Book**

- **URL:** `/books/:bookId`
- **Method:** `DELETE`
- **Response:** `null` with success message

## DTOs

- **CreateBookDTO**: Used to create a new book (requires title, author, and published date).
- **UpdateBookDTO**: Used for full updates (requires title, author, description, and published date).
- **UpdateBookPartialDTO**: Used for partial updates (allows updating a subset of the fields).
