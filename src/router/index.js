const placeRouter = require('./place-router');

const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/', placeRouter);

module.exports = apiRouter;
