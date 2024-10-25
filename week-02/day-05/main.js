var users = [
  {
    userID: 1,
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "securePassword123",
  },
  {
    userID: 2,
    username: "jane_smith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "anotherSecurePass456",
  },
  {
    userID: 3,
    username: "alice_wonderland",
    firstName: "Alice",
    lastName: "Wonderland",
    email: "alice@example.com",
    password: "alicePassword789",
  },
  {
    userID: 4,
    username: "bob_builder",
    firstName: "Bob",
    lastName: "Builder",
    email: "bob.builder@example.com",
    password: "builderPass321",
  },
];
var usersList = function (_a) {
  var userID = _a.userID,
    username = _a.username,
    firstName = _a.firstName,
    lastName = _a.lastName,
    email = _a.email,
    password = _a.password;
  console.log(
    "\n    User ID: "
      .concat(userID, "\n\n    Username: ")
      .concat(username, "\n\n    First Name: ")
      .concat(firstName, "\n\n    Last Name: ")
      .concat(lastName, "\n\n    Email: ")
      .concat(email, "\n\n    Password: ")
      .concat(password, "\n    ")
  );
};
usersList(users[0]);
usersList(users[1]);
usersList(users[2]);
usersList(users[3]);
