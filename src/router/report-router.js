const express = require('express');
const reportedPlaceController = require('../report/report-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validateReportedPlace = require('../middleware/validation-middleware');

const reportedPlaceRouter = express.Router();

// GET /reports/me?pageNumber=number&pageSize=number
reportedPlaceRouter.get(
  '/reports/me',
  authMiddleware.isAuthenticated,
  reportedPlaceController.getReportedPlacesByUser,
);

// GET /admin/reports
reportedPlaceRouter.get(
  '/admin/reports',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  reportedPlaceController.getReportedPlaces,
);

// POST /reports
reportedPlaceRouter.post(
  '/reports',
  authMiddleware.isAuthenticated,
  validateReportedPlace.validateReportedPlace,
  reportedPlaceController.postReportedPlace,
);

// GET /reports/:reportedPlaceId
reportedPlaceRouter.get(
  '/reports/:reportedPlaceId',
  authMiddleware.isAuthenticated,
  reportedPlaceController.getReportedPlace,
);

// PUT /reports/:reportedPlaceId
reportedPlaceRouter.put(
  '/reports/:reportedPlaceId',
  authMiddleware.isAuthenticated,
  validateReportedPlace.validateReportedPlace,
  reportedPlaceController.putReportedPlace,
);

// DELETE /reports/:reportedPlaceId
reportedPlaceRouter.delete(
  '/reports/:reportedPlaceId',
  authMiddleware.isAuthenticated,
  reportedPlaceController.deleteReportedPlace,
);

module.exports = reportedPlaceRouter;
