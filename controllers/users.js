const User = require('../models/user');

const NotFound = 404;
const BadRequest = 400;
const InternalServerError = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(InternalServerError).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(NotFound)
          .send({ message: 'Ошибка: пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BadRequest)
          .send({ message: 'Получен пользователя с некорректным id' });
      } else {
        res.status(InternalServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BadRequest)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(InternalServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.editUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NotFound)
          .send({ message: 'Ошибка: пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BadRequest)
          .send({ message: 'Получен пользователя с некорректным id' });
      } else if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(InternalServerError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NotFound)
          .send({ message: 'Ошибка: пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BadRequest)
          .send({ message: 'Получен пользователя с некорректным id' });
      } else if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(InternalServerError).send({ message: 'Произошла ошибка' });
      }
    });
};
