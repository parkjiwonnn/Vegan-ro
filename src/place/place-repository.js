const Place = require('./place-schema');

const placeRepository = {
  // 새로운 장소 추가
  async createPlace({
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
  }) {
    const newPlace = new Place({
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
    await newPlace.save();
    return newPlace.toObject();
  },
  // id로 장소 찾기
  async findPlaceById(id) {
    const place = await Place.findById(id).lean();
    return place;
  },
  // 장소이름 또는 주소에 검색어를 포함하는 장소 모두 찾기
  async findPlacesByKeyword(query) {
    const places = await Place.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
      ],
    }).lean();
    return places;
  },
  // 조건을 만족하는 장소 모두 찾기
  async findPlaces(centerArray, radius, category) {
    let query = {};

    if (centerArray && radius) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: centerArray,
          },
          $maxDistance: radius,
        },
      };
    }

    if (category) {
      query.category = category;
    }

    let places;
    // 조건이 없다면 전체 데이터 가져오기
    if (Object.keys(query).length === 0) {
      places = await Place.find().exec();
    } else {
      places = await Place.find(query).exec();
    }
    return places;
  },
  // 특정 id를 가진 장소 내용 덮어씌우기
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
    const updatedPlace = await Place.findByIdAndUpdate(id, {
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
    }).lean();
    return updatedPlace;
  },
  // 특정 id를 가진 장소 삭제
  async deletePlace(id) {
    const deletedPlace = await Place.findByIdAndDelete(id).lean();
    return deletedPlace;
  },
};

module.exports = placeRepository;
