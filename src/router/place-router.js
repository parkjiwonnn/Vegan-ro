const express = require('express');
const placeController = require('../place/place-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validationMiddleware = require('../middleware/validation-middleware');

const placeRouter = express.Router();

// GET /places?center=x,y&radius=number&pageNumber=number&pageSize=number&category=value&vegan_option=true&search=value
placeRouter.get('/places', placeController.getPlaces);

// GET /places/:placeId
placeRouter.get('/places/:placeId', placeController.getPlace);

// GET /admin/places?pageSize=number&pageNumber=number
placeRouter.get(
  '/admin/places',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  placeController.getPlaces,
);

// POST /admin/places
placeRouter.post(
  '/admin/places',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  validationMiddleware.validateRequest,
  placeController.postPlace,
);

// PUT /admin/places/:placeId
placeRouter.put(
  '/admin/places/:placeId',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  validationMiddleware.validateRequest,
  placeController.putPlace,
);

// DELETE /admin/places/:placeId
placeRouter.delete(
  '/admin/places/:placeId',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  placeController.deletePlace,
);

// PATCH /admin/places/:placeId
placeRouter.patch(
  '/admin/places/:placeId',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  placeController.patchDeletedAt,
);

module.exports = placeRouter;
