const express = require('express');
const reportedPlaceController = require('../report/report-controller');
const authMiddleware = require('../middleware/auth-middleware');

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
  reportedPlaceController.postReportedPlace,
);

// GET /reports/:reportedPlaceId
reportedPlaceRouter.get(
  '/reports/me/:reportedPlaceId',
  authMiddleware.isAuthenticated,
  reportedPlaceController.getReportedPlace,
);

// PUT /reports/:reportedPlaceId
reportedPlaceRouter.put(
  '/reports/:reportedPlaceId',
  authMiddleware.isAuthenticated,
  reportedPlaceController.putReportedPlace,
);

// DELETE /reports/:reportedPlaceId
reportedPlaceRouter.delete(
  '/reports/:reportedPlaceId',
  authMiddleware.isAuthenticated,
  reportedPlaceController.deleteReportedPlace,
);

module.exports = reportedPlaceRouter;
