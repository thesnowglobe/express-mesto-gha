const User = require('../models/user');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500,
  ERROR_400_MESSAGE,
  ERROR_404_MESSAGE,
  ERROR_500_MESSAGE,
} = require('../constants/errorCodes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_500).send({ message: ERROR_500_MESSAGE }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error();
      error.statusCode = ERROR_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({ message: ERROR_400_MESSAGE });
      } else if (err.statusCode === ERROR_404) {
        res.status(err.statusCode).send({ message: ERROR_404_MESSAGE });
      } else {
        res.status(ERROR_500).send({ message: ERROR_500_MESSAGE });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: ERROR_400_MESSAGE });
      } else {
        res.status(ERROR_500).send({ message: ERROR_500_MESSAGE });
      }
    });
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error();
      error.statusCode = ERROR_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: ERROR_400_MESSAGE });
      } else if (err.statusCode === ERROR_404) {
        res.status(err.statusCode).send({ message: ERROR_404_MESSAGE });
      } else {
        res.status(ERROR_500).send({ message: ERROR_500_MESSAGE });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error();
      error.statusCode = ERROR_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: ERROR_400_MESSAGE });
      } else if (err.statusCode === ERROR_404) {
        res.status(err.statusCode).send({ message: ERROR_404_MESSAGE });
      } else {
        res.status(ERROR_500).send({ message: ERROR_500_MESSAGE });
      }
    });
};
