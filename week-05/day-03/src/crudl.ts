import User from "./user.schema";
import { IUser } from "./user.interface";

export const findUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

export const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const findUserById = async (userId: string): Promise<IUser> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};

export const findUserByIdAndUpdate = async (
  userId: string,
  userData: Partial<IUser>
): Promise<IUser> => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};

export const findUserByIdAnDelete = async (userId: string): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};

export const findUsersByProfession = async (
  profession: string
): Promise<IUser[]> => {
  try {
    const users = await User.find({ profession: profession });
    if (!users) throw new Error("User not found");
    return users;
  } catch (error) {
    throw new Error(`Error fetching user by profession: ${error}`);
  }
};

export const measureQueryWithIndexes = async () => {
  const startTime = Date.now();
  const result = await User.find({ profession: "Software Engineer" }).explain(
    "executionStats"
  );
  const endTime = Date.now();

  console.log(
    "Query Execution Time (With Indexes):",
    endTime - startTime,
    "ms"
  );
  console.log("Query Plan:", result);
};
