const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62fdeb6c9f2bf3f9e8588784',
  };

  next();
});
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.listen(PORT, () => {});
