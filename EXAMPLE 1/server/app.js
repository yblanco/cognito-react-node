const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const constants = require('./settings/constants.setting');

const routes = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  req.success = false;
  req.data = undefined;
  req.constants = constants;
  next();
});

app.use(routes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const { success, constants } = req;
  let { data } = req;
  data = {
    message: err.message,
    error: constants.environment.debug === false ? err.toString() : err.stack,
  };
  res.status(err.status || 500);
  res.json({ success, data });
});


module.exports = app;
