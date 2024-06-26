const express = require('express');
const placeRouter = require('./place-router');
const imageRouter = require('./image-router');
const bookmarkRouter = require('./bookmark-router');
const userRouter = require('./user-router');
const viewRouter = require('./view-router');
const reportedPlaceRouter = require('./report-router');
const reviewRouter = require('./review-router');

const apiRouter = express.Router();

apiRouter.use('/', placeRouter);
apiRouter.use('/', imageRouter);
apiRouter.use('/', bookmarkRouter);
apiRouter.use('/', userRouter);
apiRouter.use('/', viewRouter);
apiRouter.use('/', reportedPlaceRouter);
apiRouter.use('/', reviewRouter);

module.exports = apiRouter;
