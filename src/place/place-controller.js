const placeService = require('./place-service');
const responseFormat = require('../errors/responseFormat');

const placeController = {
  // 특정 장소 GET
  async getPlace(req, res, next) {
    try {
      const { placeId } = req.params;
      const userId = req.user?.userId || undefined;
      const place = await placeService.getPlace(placeId, userId);
      res.json(responseFormat.buildResponse(place));
    } catch (error) {
      next(error);
    }
  },
  // 장소 필터링 GET
  async getPlaces(req, res, next) {
    try {
      const {
        center,
        radius,
        pageNumber,
        pageSize,
        category,
        veganOption,
        search,
      } = req.query;
      let query = {};
      if (search) {
        query.search = search;
      }
      let places;
      if (Object.keys(query).length === 0) {
        places = await placeService.getPlaces(
          center,
          radius,
          pageNumber,
          pageSize,
          category,
          veganOption,
        );
      } else {
        places = await placeService.getPlacesByKeyword(
          query.search,
          pageNumber,
          pageSize,
        );
      }
      res.json(responseFormat.buildResponse(places));
    } catch (error) {
      next(error);
    }
  },
  // 새로운 장소 등록 POST
  async postPlace(req, res, next) {
    try {
      const {
        name,
        category,
        veganOption,
        tel,
        address,
        addressLotNumber,
        addressDetail,
        location,
        openTimes,
        snsUrl,
      } = req.body;
      const newPlace = await placeService.createPlace({
        name,
        category,
        veganOption,
        tel,
        address,
        addressLotNumber,
        addressDetail,
        location,
        openTimes,
        snsUrl,
      });
      res.json(responseFormat.buildResponse(newPlace));
    } catch (error) {
      next(error);
    }
  },
  // 장소 수정 PUT
  async putPlace(req, res, next) {
    try {
      const { placeId } = req.params;
      const {
        name,
        category,
        veganOption,
        tel,
        address,
        addressLotNumber,
        addressDetail,
        location,
        openTimes,
        snsUrl,
      } = req.body;
      const updatedPlace = await placeService.updatePlace(placeId, {
        name,
        category,
        veganOption,
        tel,
        address,
        addressLotNumber,
        addressDetail,
        location,
        openTimes,
        snsUrl,
      });
      res.json(responseFormat.buildResponse(updatedPlace));
    } catch (error) {
      next(error);
    }
  },
  // 장소 삭제 DELETE
  async deletePlace(req, res, next) {
    try {
      const { placeId } = req.params;
      const deletedplace = await placeService.deletePlace(placeId);
      res.json(responseFormat.buildResponse(deletedplace));
    } catch (error) {
      next(error);
    }
  },
  // 장소 삭제 여부 PATCH
  async patchDeletedAt(req, res, next) {
    try {
      const { placeId } = req.params;
      const updatedPlace = await placeService.updateDeletedAt(placeId);
      res.json(responseFormat.buildResponse(updatedPlace));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = placeController;
