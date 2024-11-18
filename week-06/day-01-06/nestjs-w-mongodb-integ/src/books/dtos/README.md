# Book DTOs - NestJS

This folder contains the **Data Transfer Objects (DTOs)** for the `Book` entity, which are used to validate and transform the data coming from requests when interacting with the `Books` API.

## Table of Contents

- [Overview](#overview)
- [DTOs](#dtos)
  - [CreateBookDTO](#createbookdto)
  - [UpdateBookDTO](#updatebookdto)
  - [UpdateBookPartialDTO](#updatebookpartialdto)
- [Usage](#usage)

## Overview

DTOs are used in NestJS to define how data is transferred over the network, typically between the client and the server. They are essential for request validation and transformation, ensuring that the data passed to your application is in the correct format.

In this module, the following DTOs are defined for the **Book** entity:

1. **CreateBookDTO**: Used for creating a new book.
2. **UpdateBookDTO**: Used for updating an existing book (with required fields).
3. **UpdateBookPartialDTO**: Used for partially updating a book (allowing some fields to remain unchanged).

These DTOs are used with decorators from the `class-validator` package to enforce validation rules like required fields, types, and optional fields.

## DTOs

### 1. **CreateBookDTO**

This DTO is used when creating a new book. It validates the following fields:

- **title**: The title of the book, required and must be a string.
- **description**: An optional description of the book, must be a string if provided.
- **author**: The author of the book, required and must be a string.
- **publishedDate**: The date the book was published, required and must be a valid date.

### 2. **UpdateBookDTO**

This DTO is used for updating a book with **all fields being optional**. The following fields can be updated:

- **title**: The title of the book, optional and must be a string.
- **description**: An optional description of the book, must be a string if provided.
- **author**: The author of the book, optional and must be a string.
- **publishedDate**: The date the book was published, optional and must be a valid date.

### 3. **UpdateBookPartialDTO**

This DTO is used for partially updating a book. It allows updating only some fields without requiring all fields to be provided. The following fields can be updated:

- **title**: Optional string, used for the book's title.
- **description**: Optional string, used for the book's description.
- **author**: Optional string, used for the book's author.
- **publishedDate**: Optional date, used for the book's publication date.

## Usage

These DTOs are used in the **BooksController** to validate the data that is sent in requests. They ensure that the request data adheres to the required structure and rules before it is processed.

In this example:

- **CreateBookDTO** is used in the `@Post()` route to validate the data when creating a book.
- **UpdateBookDTO** and **UpdateBookPartialDTO** are used in the `@Put()` and `@Patch()` routes to handle full and partial updates, respectively.
