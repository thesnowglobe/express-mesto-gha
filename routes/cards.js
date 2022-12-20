const express = require('express');

const cardsRoutes = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardDataValidation, cardIdValidation } = require('../middlewares/validation');

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', cardDataValidation, createCard);
cardsRoutes.delete('/:cardId', cardIdValidation, deleteCard);
cardsRoutes.put('/:cardId/likes', cardIdValidation, likeCard);
cardsRoutes.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = { cardsRoutes };
