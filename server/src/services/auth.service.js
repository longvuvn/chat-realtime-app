const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWTUtil = require("../util/jwt.util");
const UserResponse = require("../dto/user/response/user.response.dto");

class AuthService {
  async login(login) {
    try {
      const identifier = login.email ?? login.userName;
      const user = await User.findOne({
        $or: [{ email: identifier }, { userName: identifier }],
      }).select("+password");
      if (!user) {
        throw new Error("User not found");
      }
      if (!login.password || !user || !user.password) {
        throw new Error("Password or stored hash missing");
      }

      const isPasswordValid = await bcrypt.compare(login.password,user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      
      const accessToken = JWTUtil.generateAccessToken({ userId: user._id });
      const refreshToken = JWTUtil.generateRefreshToken({ userId: user._id });

      const userSafe = new UserResponse(user);
      delete userSafe.password;

      return { user: userSafe, accessToken, refreshToken };
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
