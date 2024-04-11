const Place = require('./place-schema');

const placeRepository = {
  // 새로운 장소 추가
  async createPlace({
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
  }) {
    const newPlace = new Place({
      name,
      category,
      category_img: categoryImg,
      vegan_option: veganOption,
      tel,
      address,
      address_lot_number: addressLotNumber,
      address_detail: addressDetail,
      location,
      open_times: openTimes,
      sns_url: snsUrl,
    });
    await newPlace.save();
    return newPlace.toObject();
  },
  // id로 장소 찾기
  async findPlaceById(id) {
    // deleted_at이 null인 데이터만 가져오기
    return await Place.findOne({ _id: id, deleted_at: { $eq: null } })
      .populate('category_img')
      .lean();
  },
  // 장소이름 또는 주소에 검색어를 포함하는 장소 모두 찾기
  async findPlacesByKeyword(query, pageNumber, pageSize) {
    return await Place.find({
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { address: { $regex: query, $options: 'i' } },
            { address_lot_number: { $regex: query, $options: 'i' } },
            { address_detail: { $regex: query, $options: 'i' } },
          ],
        },
        { deleted_at: { $eq: null } }, // deleted_at이 null인 데이터만 포함
      ],
    })
      .populate('category_img')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();
  },
  // 조건을 만족하는 장소 모두 찾기
  async findPlaces(
    center,
    radius,
    pageNumber,
    pageSize,
    category,
    veganOption,
  ) {
    let query = { deleted_at: null }; // deleted_at이 null인 데이터만 포함

    if (center && radius) {
      const centerArray = center.split(',').map(Number);
      const radiusInMeters = radius * 1000; // 킬로미터를 미터로 변환
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: centerArray,
          },
          $maxDistance: radiusInMeters,
        },
      };
    }

    if (category) {
      query.category = category;
    }

    if (veganOption) {
      query.vegan_option = veganOption;
    }

    let places = await Place.find(query)
      .populate('category_img')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return places;
  },
  // 특정 id를 가진 장소 내용 덮어씌우기
  async updatePlace(
    id,
    {
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
    },
  ) {
    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      {
        name,
        category,
        category_img: categoryImg,
        vegan_option: veganOption,
        tel,
        address,
        address_lot_number: addressLotNumber,
        address_detail: addressDetail,
        location,
        open_times: openTimes,
        sns_url: snsUrl,
      },
      { new: true },
    )
      .populate('category_img')
      .lean();
    return updatedPlace;
  },
  // 특정 id를 가진 장소 삭제
  async deletePlace(id) {
    const deletedPlace = await Place.findByIdAndDelete(id)
      .populate('category_img')
      .lean();
    return deletedPlace;
  },
  // 특정 id를 가진 장소 삭제 표시
  async updateDeletedAt(id) {
    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true },
    );
    return updatedPlace;
  },
};

module.exports = placeRepository;
