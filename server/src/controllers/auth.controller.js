const express = require("express");
const authService = require("../services/auth.service");
const Register = require("../dto/auth/request/register.request.dto");
const Login = require("../dto/auth/request/login.request.dto");
const AuthResponse = require("../dto/auth/response/auth.response.dto");

class AuthController {
  async register(req, res) {
    const newUser = new Register(req.body);
    const result = await authService.register(newUser);
    return res.status(201).json(result);
  }

  async login(req, res) {
    const login = new Login(req.body);
    const {user, accessToken, refreshToken } = await authService.login(login);
    const authResponse = new AuthResponse({ accessToken, refreshToken });
    return res.status(200).json({ user, ...authResponse });
  }
}

module.exports = new AuthController();
