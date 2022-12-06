const Card = require('../models/card');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500,
  ERROR_400_MESSAGE,
  ERROR_404_MESSAGE,
  ERROR_500_MESSAGE,
} = require('../constants/errorCodes');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_500).send({ message: ERROR_500_MESSAGE }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: ERROR_400_MESSAGE });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error();
      error.statusCode = ERROR_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
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

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error();
      error.statusCode = ERROR_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
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

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error();
      error.statusCode = ERROR_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
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
