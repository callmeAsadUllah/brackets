interface IUser {
  userID: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const users: IUser[] = [
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

const usersList = ({
  userID,
  username,
  firstName,
  lastName,
  email,
  password,
}: IUser) => {
  console.log(`
    User ID: ${userID}\n
    Username: ${username}\n
    First Name: ${firstName}\n
    Last Name: ${lastName}\n
    Email: ${email}\n
    Password: ${password}
    `);
};

usersList(users[0]);
usersList(users[1]);
usersList(users[2]);
usersList(users[3]);
