const ReportedPlace = require('./report-schema');

const reportedPlaceRepository = {
  // 새로운 장소 제보
  async createReportedPlace({
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
    userId,
  }) {
    const newReportedPlace = new ReportedPlace({
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
      user_id: userId,
    });
    await newReportedPlace.save();
    return newReportedPlace.toObject();
  },
  // id로 제보된 장소 찾기
  async findReportedPlaceById(id) {
    return await ReportedPlace.findById(id).populate('category_img').lean();
  },
  // 조건을 만족하는 제보된 장소 모두 찾기
  async findReportedPlaces(pageNumber, pageSize, userId) {
    let query = {};

    if (userId) {
      query.user_id = userId;
    }

    let reportedPlaces;
    // 조건이 없다면 전체 데이터 가져오기
    if (Object.keys(query).length === 0) {
      reportedPlaces = await ReportedPlace.find()
        .sort({ createdAt: -1 })
        .populate(['category_img', 'user_id'])
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
    } else {
      reportedPlaces = await ReportedPlace.find(query)
        .sort({ createdAt: -1 })
        .populate('category_img')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
    }

    // 조건에 맞는 데이터의 총 개수(페이지네이션X)
    const totalCount = await ReportedPlace.countDocuments(query);

    return { reportedPlaces, totalCount };
  },
  // 특정 id를 가진 제보 장소 내용 덮어씌우기
  async updateReportedPlace(
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
      userId,
    },
  ) {
    const updatedReportedPlace = await ReportedPlace.findByIdAndUpdate(
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
        user_id: userId,
      },
      { new: true },
    )
      .populate(['category_img', 'user_id'])
      .lean();
    return updatedReportedPlace;
  },
  // 특정 id를 가진 제보 장소 삭제
  async deleteReportedPlace(id) {
    const deletedReportedPlace = await ReportedPlace.findByIdAndDelete(id)
      .populate(['category_img', 'user_id'])
      .lean();
    return deletedReportedPlace;
  },
};

module.exports = reportedPlaceRepository;
