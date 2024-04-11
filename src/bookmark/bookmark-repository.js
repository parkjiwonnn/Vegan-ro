// repositories/bookmarkRepository.js
const Bookmark = require('./bookmark-schema');

const bookmarkRepository = {

// 북마크 전체 조회 (유저)
async getBookmarksByUserId(userId, pageNumber, pageSize) {
    const bookmarks = await Bookmark.find({ user_id: userId })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .populate({
      path: 'place_id', 
      populate: {
        path: 'category_img', 
        model: 'Image' 
      }
    });
  return bookmarks;
},



// 북마크 추가 (유저) 
async createBookmark({user_id,place_id}) {
    const newbookmark = new Bookmark({
        user_id,
        place_id,
    });
    await newbookmark.save();
    return newbookmark.toObject();
},
// 북마크 추가시 중복 불가 
async getBookmarkByUserIdAndPlaceId({ user_id, place_id }) {
    const bookmark = await Bookmark.findOne({ user_id, place_id });
    return bookmark;
},
 // 북마크 삭제 (유저)
 async deleteBookmark(id) {
    const deletedBookmark = await Bookmark.findOneAndDelete(id).lean();
    return deletedBookmark;
},

// 북마크 많은 순으로 정렬(장소)
 async getMostBookmarkedPlaces() {
    const mostBookmarkedPlaces = await Bookmark.aggregate([
        {
            $group: {
                _id: '$place_id',
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
        {
            $lookup: {
                from: 'places', // 조인하려는 컬렉션 이름. Mongoose는 모델 이름을 소문자로 만들고 복수형으로 만듭니다.
                localField: '_id', // 현재 파이프라인에서 조인에 사용할 필드
                foreignField: '_id', // from에서 지정한 컬렉션에서 매칭될 필드
                as: 'place_info' // 결과를 담을 필드 이름
            }
        }
    ]);


    return mostBookmarkedPlaces;

}
}


module.exports = bookmarkRepository;
