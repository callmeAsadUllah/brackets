# MongoDB CRUDL

---

## User Data

```json
{
  "username": "m.asadullah",
  "email": "m.asadullah@aeiou.io",
  "firstName": "Muhammad",
  "lastName": "Asad Ullah",
  "fullName": "Muhammad Asad Ullah",
  "role": "ADMIN",
  "tags": ["DEVELOPER", "FULL-STACK", "OPEN-SOURCE"],
  "profession": "Computer Scientist"
}
```

### `insertOne()`

command to insert data: `db.users.insertOne(userData)`.

---

## Users Data

```json
[
  {
    "username": "jdoe",
    "email": "jdoe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "role": "USER",
    "tags": ["DEVELOPER", "MANAGER", "MENTOR"],
    "profession": "Software Engineer"
  },
  {
    "username": "msmith",
    "email": "msmith@example.com",
    "firstName": "Mary",
    "lastName": "Smith",
    "fullName": "Mary Smith",
    "role": "USER",
    "tags": ["DESIGNER", "UX", "CREATIVE"],
    "profession": "UX Designer"
  },
  {
    "username": "bgreen",
    "email": "bgreen@example.com",
    "firstName": "Benjamin",
    "lastName": "Green",
    "fullName": "Benjamin Green",
    "role": "USER",
    "tags": ["DEVELOPER", "FULL-STACK", "OPEN-SOURCE"],
    "profession": "Software Developer"
  },
  {
    "username": "kturner",
    "email": "kturner@example.com",
    "firstName": "Katherine",
    "lastName": "Turner",
    "fullName": "Katherine Turner",
    "role": "USER",
    "tags": ["PROJECT MANAGER", "SCRUM MASTER", "LEADERSHIP"],
    "profession": "Project Manager"
  },
  {
    "username": "mclark",
    "email": "mclark@example.com",
    "firstName": "Michael",
    "lastName": "Clark",
    "fullName": "Michael Clark",
    "role": "USER",
    "tags": ["DEVELOPER", "BACKEND", "CLOUD"],
    "profession": "Backend Developer"
  },
  {
    "username": "jmartin",
    "email": "jmartin@example.com",
    "firstName": "Jessica",
    "lastName": "Martin",
    "fullName": "Jessica Martin",
    "role": "USER",
    "tags": ["DATA SCIENTIST", "AI", "MACHINE LEARNING"],
    "profession": "Data Scientist"
  },
  {
    "username": "alewis",
    "email": "alewis@example.com",
    "firstName": "Alex",
    "lastName": "Lewis",
    "fullName": "Alex Lewis",
    "role": "USER",
    "tags": ["DEVELOPER", "FRONTEND", "JAVASCRIPT"],
    "profession": "Frontend Developer"
  },
  {
    "username": "jwilson",
    "email": "jwilson@example.com",
    "firstName": "James",
    "lastName": "Wilson",
    "fullName": "James Wilson",
    "role": "USER",
    "tags": ["DESIGNER", "GRAPHIC DESIGNER", "BRANDING"],
    "profession": "Graphic Designer"
  },
  {
    "username": "lharris",
    "email": "lharris@example.com",
    "firstName": "Lily",
    "lastName": "Harris",
    "fullName": "Lily Harris",
    "role": "USER",
    "tags": ["DESIGNER", "PRODUCT DESIGN", "VISUAL"],
    "profession": "Product Designer"
  },
  {
    "username": "tallen",
    "email": "tallen@example.com",
    "firstName": "Thomas",
    "lastName": "Allen",
    "fullName": "Thomas Allen",
    "role": "USER",
    "tags": ["DEVELOPER", "SECURITY", "NETWORKING"],
    "profession": "Security Engineer"
  }
]
```

### `insertMany()`

command to insert data: `db.users.insertMany(usersData)`.

---

### `findOne()` without filter

command to select the first document from the collection `db.users.findOne()`.

#### Output (without filtering)

```bash
'{"username": "m.asadullah", "email": "m.asadullah@aeiou.io", "firstName": "Muhammad", "lastName": "Asad Ullah", "fullName": "Muhammad Asad Ullah", "role": "ADMIN", "tags": ["DEVELOPER", "FULL-STACK", "OPEN-SOURCE"], "profession": "Computer Scientist"}'
```

---

### `findOne()` with filter

command to select the first document from the collection by id `db.users.findOne({ _id: userId })`.

#### Output (with one filter)

```bash
'{_id: '67370410ac6575b7f4c1c18c', "username": "m.asadullah", "email": "m.asadullah@aeiou.io", "firstName": "Muhammad", "lastName": "Asad Ullah", "fullName": "Muhammad Asad Ullah", "role": "ADMIN", "tags": ["DEVELOPER", "FULL-STACK", "OPEN-SOURCE"], "profession": "Computer Scientist"}'
```

---

### `findOne()` with filters

command to select the first document from the collection by id with specified fields `db.users.findOne({ _id: userId }, { username: "m.asadullah" })`.

#### Output (with many filters)

```bash
'{_id: userId, "username": "m.asadullah"}'
```

---

### `find()` without filter

command to select all the documents from the collection `db.books.find()`.

---

### `find()` with filter

command to select the specified document from the collection `db.books.find({ _id: userId })`.

---

### `find()` with filters

## command to select all the documents with the specified fields from the collection `db.books.find({ _id: userId }, { username: "m.asadullah" })`

---

## Aggregation

---

### Syntax `db.collection.aggregate([{ $match:...},{$group:...}, ..., {$sort:...}])`

---

### Functions

- $min - to find minimum value
- $max - to find maximum value
- $sum - to find the sum value
- $count - to count the number of values
- $match - to match the value against the properties or attributes
- $sort - to sort the properties or attributes
- $agg - to aggregate the properties or attributes
- $avg - to calculate the average the properties or attributes
- $project - to select which field to show
- $lt - to find the less than values
- $gt - to find the greater than value or values
- $group - to group the properties or attributes

so much more...

---

### Sorting `{ attribute: 1}` for ascending and `{ attribute: -1 }` for descending.

---

## Example

command to select the users with `role: "ADMIN"` and `tags: "DEVELOPER"` through aggregation `db.users.aggregate([{ $match: { role: "USER", tags: "DEVELOPER" }}])`.

---

### Example - Counter

command to select count of uses's documents from the collection `db.users.aggregate([{$group: { _id: '$profession', professionCount: { $count: {} }}}])`.

### Output

```json
[
  { "_id": "Project Manager", "professionCount": 1 },
  { "_id": "UX Designer", "professionCount": 1 },
  { "_id": "Software Developer", "professionCount": 1 },
  { "_id": "Software Engineer", "professionCount": 1 },
  { "_id": "Backend Developer", "professionCount": 1 },
  { "_id": "Frontend Developer", "professionCount": 1 },
  { "_id": "Graphic Designer", "professionCount": 1 },
  { "_id": "Product Designer", "professionCount": 1 },
  { "_id": "Security Engineer", "professionCount": 1 },
  { "_id": "Data Scientist", "professionCount": 1 },
  { "_id": "Computer Scientist", "professionCount": 1 }
]
```
