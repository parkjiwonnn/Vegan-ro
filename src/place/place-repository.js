const { Place } = require('./place-schema');

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
  // _id로 장소 찾기
  async findPlaceById(id) {
    const place = await Place.findById(id).lean();
    return place;
  },
  // 장소 이름 또는 주소로 장소 찾기
  async findPlaceByNameOrAddress(query) {
    const place = await Place.findOne({
      $or: [{ name: query }, { address: query }],
    }).lean();
    return place;
  },
  // 반경 내에 있는 장소 모두 찾기
  async findPlacesNearby(center, radius, category) {
    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: center,
          },
          $maxDistance: radius,
        },
      },
    };

    if (category) {
      query.category = category;
    }

    const places = await Place.find(query).exec();
    return places;
  },
  // 모든 장소 반환하기
  async getAllPlaces() {
    const allPlaces = await Place.find();
    return allPlaces;
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
