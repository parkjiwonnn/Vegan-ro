const placeRepository = require('./place-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');
const imageRepository = require('../image/image-repository.js');

const placeService = {
  // 새로운 장소 등록
  async createPlace({
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
  }) {
    // category_img 이미지 컬렉션에서 가져오기
    const categoryImg = await imageRepository.getImageByName(category);
    // location GeoJSON 객체로 저장
    const newLocation = {
      type: 'Point',
      coordinates: location,
    };
    const newPlace = await placeRepository.createPlace({
      name,
      category,
      categoryImg,
      veganOption,
      tel,
      address,
      addressLotNumber,
      addressDetail,
      location: newLocation,
      openTimes,
      snsUrl,
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
  async getPlacesByKeyword(query, pageNumber, pageSize) {
    const places = await placeRepository.findPlacesByKeyword(
      query,
      pageNumber,
      pageSize,
    );
    return places;
  },
  // 조건을 만족하는 장소 모두 가져오기
  async getPlaces(center, radius, pageNumber, pageSize, category, veganOption) {
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
      veganOption,
    );
    return places;
  },
  // 특정 id를 가진 장소 내용 수정
  async updatePlace(
    id,
    {
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
    },
  ) {
    // id가 deleted_at이 null이고, 존재하는 id인지 확인
    const existingPlace = await placeRepository.findPlaceById(id);
    if (!existingPlace) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        400,
      );
    }
    // category_img 이미지 컬렉션에서 가져오기
    const categoryImg = await imageRepository.getImageByName(category);
    const updatedPlace = await placeRepository.updatePlace(id, {
      name,
      category,
      categoryImg,
      veganOption,
      tel,
      address,
      addressLotNumber,
      addressDetail,
      location,
      openTimes,
      snsUrl,
    });
    return { message: '정상적으로 수정되었습니다.', updatedPlace };
  },
  // 특정 id를 가진 장소 삭제
  async deletePlace(id) {
    // id가 deleted_at이 null이고, 존재하는 id인지 확인
    const existingPlace = await placeRepository.findPlaceById(id);
    if (!existingPlace) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        400,
      );
    }
    const deletedPlace = await placeRepository.deletePlace(id);
    return { message: '정상적으로 삭제되었습니다.', deletedPlace };
  },
  // 특정 id를 가진 장소 삭제 날짜 표시
  async updateDeletedAt(id) {
    const updatedPlace = await placeRepository.updateDeletedAt(id);
    if (updatedPlace === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 장소가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 삭제되었습니다.', updatedPlace };
  },
};

module.exports = placeService;
