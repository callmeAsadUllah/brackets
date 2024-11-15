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
