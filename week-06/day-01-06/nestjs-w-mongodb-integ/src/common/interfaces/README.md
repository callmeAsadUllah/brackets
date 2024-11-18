# Book Interfaces - NestJS

This folder contains the **TypeScript interfaces** for the `Book` entity and the API response structure. Interfaces are used to define the shape of data exchanged between the client and the server. In this module, we have two primary interfaces: `IBook` and `IResponse`.

## Table of Contents

- [Overview](#overview)
- [Interfaces](#interfaces)
  - [IBook](#ibook)
  - [IResponse](#iresponse)
- [Usage](#usage)

## Overview

Interfaces in TypeScript define the structure and types of objects in the system. These interfaces help ensure the consistency and integrity of data throughout the application. In this module, we define:

1. **IBook**: Represents the shape of a book entity.
2. **IResponse**: Standardizes the format of API responses, ensuring that every response from the server includes a `message` and `data`.

## Interfaces

### 1. **IBook Interface**

The `IBook` interface defines the structure of a book object. This interface is used to describe the shape of the book entity, which is shared between the client and the server.

#### Fields:

- **title**: The title of the book (required).
- **description**: An optional description for the book. If provided, it should be a string.
- **author**: The author of the book (required).
- **publishedDate**: The publication date of the book, represented as a `Date` object (required).

### 2. **IResponse Interface**

The `IResponse` interface is used to standardize the format of API responses across the application. It helps ensure that each response includes a `message` (a string) and the `data` (which can be a single object or an array of objects).

#### Fields:

- **message**: A string that provides the status or description of the operation (e.g., `"Book fetched successfully"`, `"Book created successfully"`).
- **data**: The actual response data. This can either be a single object (e.g., a single book) or an array of objects (e.g., a list of books). The type of data is generic (`T`), so it can be used flexibly for various types of responses.

## Usage

These interfaces are used in the service layer to define the structure of data returned by the server and ensure that the controller sends the correct response format.

### Example Usage in the BooksService

In the `BooksService`, the `IResponse` interface is used to wrap the response data returned to the client, ensuring consistency in the format of the response.

### Example Usage in the BooksController

The `BooksController` uses the `IResponse` interface to ensure that the response from each route is consistently formatted with a `message` and `data`.
