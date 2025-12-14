const express = require("express");
const userService = require("../services/user.service");
const UserData = require("../dto/user/request/user.request.dto");
const UserUpdateData = require("../dto/user/request/user.update.dto");

class UserController {
  async getAll(req, res) {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  }

  async getById(req, res) {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    return res.status(200).json(user);
  }

  async create(req, res) {
    const userData = new UserData(req.body);
    const newUser = await userService.createUser(userData);
    return res.status(201).json(newUser);
  }

  async update(req, res){
    const userId = req.params.id;
    const userUpdateData = new UserUpdateData(req.body);
    const updateUser = await userService.updateUser(userId, userUpdateData);
    return res.status(200).json(updateUser);
  }

  async delete(req, res) {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);
    return res.status(200).json(deletedUser);
  }
}

module.exports = new UserController();
