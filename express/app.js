const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const index = require('../routes');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;
module.exports.handler = serverless(app);