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
  // 제보 장소 전체 GET
  async getReportedPlaces(req, res, next) {
    try {
      const { pageNumber, pageSize } = req.query;
      const reportedPlaces = await reportedPlaceService.getReportedPlaces(
        pageNumber,
        pageSize,
      );
      res.json(responseFormat.buildResponse(reportedPlaces));
    } catch (error) {
      next(error);
    }
  },
  // 유저의 제보 장소 모두 가져오기 GET
  async getReportedPlacesByUser(req, res, next) {
    try {
      const { pageNumber, pageSize } = req.query;
      const userId = req.user.userId;
      const reportedPlaces = await reportedPlaceService.getReportedPlaces(
        pageNumber,
        pageSize,
        userId,
      );
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
        veganOption,
        tel,
        address,
        addressLotNumber,
        addressDetail,
        location,
        openTimes,
        snsUrl,
      } = req.body;
      const userId = req.user.userId;
      const newReportedPlace = await reportedPlaceService.createReportedPlace({
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
        userId,
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
        veganOption,
        tel,
        address,
        addressLotNumber,
        addressDetail,
        location,
        openTimes,
        snsUrl,
      } = req.body;
      const userId = req.user.userId;
      const updatedReportedPlace =
        await reportedPlaceService.updateReportedPlace(reportedPlaceId, {
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
          userId,
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
