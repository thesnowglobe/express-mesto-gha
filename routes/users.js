const express = require('express');

const usersRoutes = express.Router();

const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', getUserById);
usersRoutes.patch('/me', updateUserData);
usersRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = { usersRoutes };
