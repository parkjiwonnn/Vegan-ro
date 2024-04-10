const reportedPlaceRepository = require('./report-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');

const reportedPlaceService = {
  // 새로운 장소 등록
  async createReportedPlace({
    name,
    category,
    vegan_option,
    tel,
    address,
    address_lot_number,
    address_detail,
    location,
    open_times,
    sns_url,
    user_id,
  }) {
    // category_img 이미지 컬렉션에서 가져오기
    const category_img = await imageRepository.getImageByName(category);
    const newReportedPlace = await reportedPlaceRepository.createReportedPlace({
      name,
      category,
      category_img,
      vegan_option,
      tel,
      address,
      address_lot_number,
      address_detail,
      location,
      open_times,
      sns_url,
      user_id,
    });
    if (newReportedPlace === null) {
      throw new AppError(
        commonErrors.objectCreationError,
        '제보 장소 등록에 실패하였습니다.',
        400,
      );
    }
    return { message: '정상적으로 등록되었습니다.', newReportedPlace };
  },
  // 특정 id를 가진 장소 가져오기
  async getReportedPlace(id) {
    const reportedPlace =
      await reportedPlaceRepository.findReportedPlaceById(id);
    if (reportedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 제보가 없습니다.',
        400,
      );
    }
    return reportedPlace;
  },
  // 조건을 만족하는 장소 모두 가져오기
  async getReportedPlaces(pageNumber, pageSize, user_id) {
    const reportedPlaces = await reportedPlaceRepository.findReportedPlaces(
      pageNumber,
      pageSize,
      user_id,
    );
    return reportedPlaces;
  },
  // 특정 id를 가진 장소 내용 수정
  async updateReportedPlace(
    id,
    {
      name,
      category,
      vegan_option,
      tel,
      address,
      address_lot_number,
      address_detail,
      location,
      open_times,
      sns_url,
      user_id,
    },
  ) {
    // category_img 이미지 컬렉션에서 가져오기
    const category_img = await imageRepository.getImageByName(category);
    const updatedReportedPlace =
      await reportedPlaceRepository.updateReportedPlace(id, {
        name,
        category,
        category_img,
        vegan_option,
        tel,
        address,
        address_lot_number,
        address_detail,
        location,
        open_times,
        sns_url,
        user_id,
      });
    if (updatedReportedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 제보가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 수정되었습니다.', updatedReportedPlace };
  },
  // 특정 id를 가진 장소 삭제
  async deleteReportedPlace(id) {
    const deletedReportedPlace =
      await reportedPlaceRepository.deleteReportedPlace(id);
    if (deletedReportedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 제보가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 삭제되었습니다.', deletedReportedPlace };
  },
};

module.exports = reportedPlaceService;
