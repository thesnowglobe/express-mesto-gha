const express = require('express');
const mongoose = require('mongoose');
const { ERROR_404, ERROR_404_MESSAGE } = require('./constants/errorCodes');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '638f37ae1b3a3e696c84f05d',
  };

  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use((req, res) => {
  res.status(ERROR_404).send({ message: ERROR_404_MESSAGE });
});

app.listen(PORT);
