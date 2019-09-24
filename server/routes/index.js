const express = require('express');
const { routingDir } = require('../libs/commons.lib');

module.exports = routingDir(express.Router(), __dirname);
