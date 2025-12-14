const express = require('express');
const authService = require('../services/auth.service');
const Register = require('../dto/auth/request/register');

class AuthController {
    async register(req, res) {
        const newUser = new Register(req.body);
        const createdUser = await authService.register(newUser);
        return res.status(201).json(createdUser);
    }
}



module.exports = new AuthController();