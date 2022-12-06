const express = require('express');

const usersRoutes = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateUserData);
usersRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = { usersRoutes };
