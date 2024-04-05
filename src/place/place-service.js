const placeRepository = require('./place-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');

const placeService = {
  // 새로운 장소 등록
  async createPlace({
    name,
    category,
    vegan_option,
    tel,
    address,
    address_detail,
    location,
    open_times,
    sns_url,
  }) {
    // category_img 이미지 컬렉션에서 가져오기
    const newPlace = await placeRepository.createPlace({
      name,
      category,
      // category_img,
      vegan_option,
      tel,
      address,
      address_detail,
      location,
      open_times,
      sns_url,
    });
    if (newPlace === null) {
      throw new AppError(
        commonErrors.objectCreationError,
        '장소 등록에 실패하였습니다.',
        400,
      );
    }
    return { message: '정상적으로 등록되었습니다.', newPlace };
  },
  // 특정 id를 가진 장소 가져오기
  async getPlace(id) {
    const place = await placeRepository.findPlaceById(id);
    if (place === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        404,
      );
    }
    // 현재 위치와의 거리 계산 결과 같이 반환하기
    // 현재 위치 : controller에서 req.body 가져오기
    return place;
  },
  // 검색어를 만족하는 장소 모두 가져오기
  async getPlacesByKeyword(query) {
    const places = await placeRepository.findPlacesByKeyword(query);
    if (places.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 검색어를 만족하는 장소가 존재하지 않습니다',
        404,
      );
    }
    // 현재 위치와의 각 장소 별로 거리 계산 결과 같이 반환하기
    // 현재 위치 : controller에서 center값 가져오기
    return places;
  },
  // 조건을 만족하는 장소 모두 가져오기
  async getPlaces(center, radius, category) {
    const centerArray = center.split(',').map(Number);
    const places = await placeRepository.findPlaces(
      centerArray,
      radius,
      category,
    );
    if (places.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 조건을 만족하는 장소가 존재하지 않습니다',
        404,
      );
    }
    // 현재 위치와의 각 장소 별로 거리 계산 결과 같이 반환하기
    // 현재 위치 : controller에서 가져온 center 사용
    return places;
  },
  // 특정 id를 가진 장소 내용 수정
  async updatePlace(
    id,
    {
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
    },
  ) {
    const updatedPlace = await placeRepository.updatePlace(id, {
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
    if (updatedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        404,
      );
    }
    return { message: '정상적으로 수정되었습니다.', updatedPlace };
  },
  // 특정 id를 가진 장소 삭제
  async deletePlace(id) {
    const deletedPlace = await placeRepository.deletePlace(id);
    if (deletedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        404,
      );
    }
    return { message: '정상적으로 삭제되었습니다.', deletedPlace };
  },
};

module.exports = placeService;
