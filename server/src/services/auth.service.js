const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class AuthService {
  async login(login) {
    try {
    } catch (error) {
      throw new Error("Error logging in: " + error.message);
    }
  }

  async register(register) {
    try {
      if (!register.password || register.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (
        !register.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email)
      ) {
        throw new Error("Invalid email format");
      }

      if (!register.email) {
        throw new Error("Email is required");
      }
      const existingUser = await User.findOne({ email: register.email });
      if (existingUser) {
        throw new Error("Email already exists");
      }
      const newUser = new User({
        ...register,
        password: await bcrypt.hash(register.password, 10),
      });
      return await newUser.save();
    } catch (error) {
      throw new Error("Error registering: " + error.message);
    }
  }
}

module.exports = new AuthService();
