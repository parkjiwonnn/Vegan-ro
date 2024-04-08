const express = require('express');
const reportedPlaceController = require('../report/report-controller');

const reportedPlaceRouter = express.Router();

// GET /reports/:reportedPlaceId
reportedPlaceRouter.get('/reports', reportedPlaceController.getReportedPlace);

// GET /reports/me
reportedPlaceRouter.get(
  '/reports',
  reportedPlaceController.getReportedPlacesByUser,
);

// GET /admin/reports
reportedPlaceRouter.get(
  '/admin/reports',
  // adminMiddleware
  reportedPlaceController.getReportedPlaces,
);

// POST /reports
reportedPlaceRouter.post('/reports', reportedPlaceController.postReportedPlace);

// PUT /reports/:reportedPlaceId
reportedPlaceRouter.put(
  '/reports/:reportedPlaceId',
  reportedPlaceController.putReportedPlace,
);

// DELETE /reports/:reportedPlaceId
reportedPlaceRouter.delete(
  '/reports/:reportedPlaceId',
  reportedPlaceController.deleteReportedPlace,
);

module.exports = reportedPlaceRouter;
