require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signUpValidation, signInValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use('*', notFoundRoute);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
