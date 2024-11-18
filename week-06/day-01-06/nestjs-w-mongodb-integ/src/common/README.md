# Common Folder

The `common` folder contains shared utilities and abstractions used across the application. These utilities are meant to be reusable, modular, and maintainable. It includes Guards, DTOs (Data Transfer Objects), Interfaces, and Filters that help structure the application more efficiently.

## Folder Structure

The folder structure of the `common` directory looks like this:

```
common/
  ├── guards/              # Custom guards for authorization, validation, etc.
  ├── interfaces/          # Shared interfaces for type definitions
  ├── filters/             # Global error filters and exception handling
```

### 1. Guards

The `guards` folder contains all the guard classes that are used to handle authorization, role-based access control (RBAC), or request validation logic. Guards in NestJS are used to intercept incoming requests and decide whether they should be handled by the route handler or not.

### 2. Interfaces

The `interfaces` folder contains TypeScript interface definitions used to enforce types and ensure consistency across the application. These interfaces are especially useful for defining the structure of request payloads, responses, and other data types.

### 3. Filters

The `filters` folder is used to define custom exception filters that allow you to manage errors globally in your NestJS application. Filters are powerful tools for handling exceptions and sending structured error responses.

## Usage

- **Guards**: Import guards into your modules to protect specific routes or resources.
- **Interfaces**: Use interfaces to define the expected structure of objects passed around in the application.
- **Filters**: Apply exception filters globally or on a per-controller basis to handle errors and customize error responses.

## Benefits of Organizing Code into `common/`

1. **Modularity**: Keeps your application clean and maintainable by centralizing common logic like guards, filters, and validation.
2. **Reusability**: Reusable classes that can be imported into multiple modules or services, reducing code duplication.
3. **Consistency**: Ensures that shared functionality (like validation, error handling, and security) is consistent across the application.
