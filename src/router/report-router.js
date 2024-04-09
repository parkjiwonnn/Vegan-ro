const express = require('express');
const reportedPlaceController = require('../report/report-controller');
const userMiddleware = require('../middleware/user-middleware');

const reportedPlaceRouter = express.Router();

// GET /reports/me?pageNumber=number&pageSize=number
reportedPlaceRouter.get(
  '/reports/me',
  userMiddleware.isAuthenticated,
  reportedPlaceController.getReportedPlacesByUser,
);

// GET /admin/reports
reportedPlaceRouter.get(
  '/admin/reports',
  // adminMiddleware
  reportedPlaceController.getReportedPlaces,
);

// POST /reports
reportedPlaceRouter.post(
  '/reports',
  userMiddleware.isAuthenticated,
  reportedPlaceController.postReportedPlace,
);

// GET /reports/:reportedPlaceId
reportedPlaceRouter.get(
  '/reports/me/:reportedPlaceId',
  userMiddleware.isAuthenticated,
  reportedPlaceController.getReportedPlace,
);

// PUT /reports/:reportedPlaceId
reportedPlaceRouter.put(
  '/reports/:reportedPlaceId',
  userMiddleware.isAuthenticated,
  reportedPlaceController.putReportedPlace,
);

// DELETE /reports/:reportedPlaceId
reportedPlaceRouter.delete(
  '/reports/:reportedPlaceId',
  userMiddleware.isAuthenticated,
  reportedPlaceController.deleteReportedPlace,
);

module.exports = reportedPlaceRouter;
