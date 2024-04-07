const reportedPlaceService = require('./report-service');
const responseFormat = require('../errors/responseFormat');

const reportedPlaceController = {
  // id로 특정 제보 장소 GET
  async getReportedPlace(req, res, next) {
    try {
      const { reportedPlaceId } = req.params;
      const reportedPlace =
        await reportedPlaceService.getReportedPlace(reportedPlaceId);
      res.json(responseFormat.buildResponse(reportedPlace));
    } catch (error) {
      next(error);
    }
  },
  // 제보 장소 전체, 유저 필터링 GET
  async getReportedPlaces(req, res, next) {
    try {
      // const user_email = res.locals.token.email;
      const reportedPlaces =
        await reportedPlaceService.getReportedPlaces(user_email);
      res.json(responseFormat.buildResponse(reportedPlaces));
    } catch (error) {
      next(error);
    }
  },
  // 새로운 장소 제보 POST
  async postReportedPlace(req, res, next) {
    try {
      const {
        name,
        category,
        vegan_option,
        tel,
        address,
        address_detail,
        location,
        open_times,
        sns_url,
      } = req.body;
      // const user_email = res.locals.token.email;
      const newReportedPlace = await reportedPlaceService.createReportedPlace({
        name,
        category,
        vegan_option,
        tel,
        address,
        address_detail,
        location,
        open_times,
        sns_url,
        user_email,
      });
      res.json(responseFormat.buildResponse(newReportedPlace));
    } catch (error) {
      next(error);
    }
  },
  // 제보 장소 수정 PUT
  async putReportedPlace(req, res, next) {
    try {
      const { reportedPlaceId } = req.params;
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
      // const user_email = res.locals.token.email;
      const updatedReportedPlace =
        await reportedPlaceService.updateReportedPlace(reportedPlaceId, {
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
          user_email,
        });
      res.json(responseFormat.buildResponse(updatedReportedPlace));
    } catch (error) {
      next(error);
    }
  },
  // 제보 장소 삭제 DELETE
  async deleteReportedPlace(req, res, next) {
    try {
      const { reportedPlaceId } = req.params;
      const deletedReportedPlace =
        await reportedPlaceService.deleteReportedPlace(reportedPlaceId);
      res.json(responseFormat.buildResponse(deletedReportedPlace));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reportedPlaceController;
