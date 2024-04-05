const express = require('express');
const placeController = require('../place/place-controller');

const placeRouter = express.Router();

// GET /places?center=x,y&radius=number&size=number&category=value&search=value
placeRouter.get('/places', placeController.getPlaces);

// GET /places/:placeId
placeRouter.get('/places/:placeId', placeController.getPlace);

// GET /admin/places
placeRouter.get(
  '/admin/places',
  // adminMiddleware
  placeController.getPlaces,
);

// POST /admin/places
placeRouter.post(
  '/admin/places',
  // adminMiddleware
  placeController.postPlace,
);

// PUT /admin/places/:placeId
placeRouter.put(
  '/admin/places',
  // adminMiddleware
  placeController.putPlace,
);

// DELETE /admin/places/:placeId
placeRouter.delete(
  '/admin/places/:placeId',
  // adminMiddleware
  placeController.deletePlace,
);
