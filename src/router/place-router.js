const express = require('express');
const placeController = require('../place/place-controller');
const userMiddleware = require('../middleware/user-middleware');

const placeRouter = express.Router();

// GET /places?center=x,y&radius=number&pageNumber=number&pageSize=number&category=value&vegan_option=true&search=value
placeRouter.get('/places', placeController.getPlaces);

// GET /places/:placeId
placeRouter.get('/places/:placeId', placeController.getPlace);

// GET /admin/places?pageSize=number&pageNumber=number
placeRouter.get(
  '/admin/places',
  userMiddleware.isAdmin,
  placeController.getPlaces,
);

// POST /admin/places
placeRouter.post(
  '/admin/places',
  userMiddleware.isAdmin,
  placeController.postPlace,
);

// PUT /admin/places/:placeId
placeRouter.put(
  '/admin/places/:placeId',
  userMiddleware.isAdmin,
  placeController.putPlace,
);

// DELETE /admin/places/:placeId
placeRouter.delete(
  '/admin/places/:placeId',
  userMiddleware.isAdmin,
  placeController.deletePlace,
);

module.exports = placeRouter;
