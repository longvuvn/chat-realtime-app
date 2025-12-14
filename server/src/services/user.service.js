const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserService {
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return await User.findById(userId);
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async createUser(userData) {
    try {
      if (!userData.password || userData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (
        !userData.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
      ) {
        throw new Error("Invalid email format");
      }

      if (!userData.email) {
        throw new Error("Email is required");
      }
      const newUser = new User({
        ...userData,
        password: await bcrypt.hash(userData.password, 10),
      });
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async updateUser(userId, userUpdateData) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const updateUser = await User.findByIdAndUpdate(userId, userUpdateData);
      updateUser.status = userUpdateData.status || updateUser.status;
      return updateUser;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

module.exports = new UserService();
