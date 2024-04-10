const placeRepository = require('./place-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');
const imageRepository = require('../image/image-repository.js');

const placeService = {
  // 새로운 장소 등록
  async createPlace({
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
  }) {
    // category_img 이미지 컬렉션에서 가져오기
    const category_img = await imageRepository.getImageByName(category);
    // location GeoJSON 객체로 저장
    const newLocation = {
      type: 'Point',
      coordinates: location,
    };
    const newPlace = await placeRepository.createPlace({
      name,
      category,
      category_img,
      vegan_option,
      tel,
      address,
      address_lot_number,
      address_detail,
      location: newLocation,
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
        400,
      );
    }
    return place;
  },
  // 검색어를 만족하는 장소 모두 가져오기
  async getPlacesByKeyword(query) {
    const places = await placeRepository.findPlacesByKeyword(query);
    return places;
  },
  // 조건을 만족하는 장소 모두 가져오기
  async getPlaces(
    center,
    radius,
    pageNumber,
    pageSize,
    category,
    vegan_option,
  ) {
    if ((center && !radius) || (!center && radius)) {
      throw new AppError(
        commonErrors.invalidRequestError,
        '거리 검색을 위해서는 center와 radius 모두 필요합니다',
        400,
      );
    }

    const places = await placeRepository.findPlaces(
      center,
      radius,
      pageNumber,
      pageSize,
      category,
      vegan_option,
    );
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
      address_lot_number,
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
      address_lot_number,
      address_detail,
      location,
      open_times,
      sns_url,
    });
    if (updatedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        400,
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
        400,
      );
    }
    return { message: '정상적으로 삭제되었습니다.', deletedPlace };
  },
};

module.exports = placeService;
