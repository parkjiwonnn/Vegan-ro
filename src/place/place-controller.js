const placeService = require('./place-service');
const responseFormat = require('../errors/responseFormat');

const placeController = {
  // 특정 장소 GET
  async getPlace(req, res, next) {
    try {
      const { placeId } = req.params;
      // req.body에 현재위치 받아오기
      const place = await placeService.getPlace(placeId);
      res.json(responseFormat.buildResponse(place));
    } catch (error) {
      next(error);
    }
  },
  // 장소 필터링 GET
  async getPlaces(req, res, next) {
    try {
      const { center, radius, category, vegan_option, search } = req.query;
      let places;
      if (search) {
        places = await placeService.getPlacesByKeyword(search);
      } else {
        places = await placeService.getPlaces(
          center,
          radius,
          category,
          vegan_option,
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
      // reported_place의 데이터 가져와서 등록하기
      const {
        name,
        category,
        category_img,
        vegan_option,
        tel,
        address,
        address_detail,
        location,
        open_times,
        sns_url,
      } = req.body;
      const newPlace = await placeService.createPlace({
        name,
        category,
        category_img,
        vegan_option,
        tel,
        address,
        address_detail,
        location,
        open_times,
        sns_url,
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
        category_img,
        vegan_option,
        tel,
        address,
        address_detail,
        location,
        open_times,
        sns_url,
      } = req.body;
      const updatedPlace = await placeService.updatePlace(placeId, {
        name,
        category,
        category_img,
        vegan_option,
        tel,
        address,
        address_detail,
        location,
        open_times,
        sns_url,
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
};

module.exports = placeController;
