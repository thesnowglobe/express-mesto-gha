const express = require('express');

const usersRoutes = express.Router();

const {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { userDataValidation, userAvatarValidation, userIdValidation } = require('../middlewares/validation');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', userIdValidation, getUserById);
usersRoutes.patch('/me', userDataValidation, updateUserData);
usersRoutes.patch('/me/avatar', userAvatarValidation, updateUserAvatar);

module.exports = { usersRoutes };
