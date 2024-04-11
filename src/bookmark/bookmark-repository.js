const Bookmark = require('./bookmark-schema');

class BookmarkRepository {

  // 북마크 전체 조회 (유저)
  async getBookmarksByUserId(userId, pageNumber, pageSize) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  // 북마크 추가 (유저)
  async createBookmark({ user_id, place_id }) {
    try {
      const newbookmark = await Bookmark.create({
        user_id,
        place_id,
      });
      await newbookmark.save();
      return newbookmark.toObject();
    } catch (error) {
      throw new Error(error); // 에러 처리
    }
  }

  // 북마크 추가시 중복 불가
  async getBookmarkByUserIdAndPlaceId({ user_id, place_id }) {
    try {
      const bookmark = await Bookmark.findOne({ user_id, place_id });
      return bookmark;
    } catch (error) {
      throw new Error(error);
    }
  }

  // 북마크 삭제 (유저)
  async deleteBookmark(id) {
    try {
      const deletedBookmark = await Bookmark.findOneAndDelete({ _id: id });
      return deletedBookmark;
    } catch (error) {
      throw new Error(error);
    }
  }

  // 북마크 많은 순으로 정렬(장소)
  async getMostBookmarkedPlaces() {
    try {
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
            from: 'places',
            localField: '_id',
            foreignField: '_id',
            as: 'place_info'
          }
        }
      ]);

      return mostBookmarkedPlaces;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new BookmarkRepository();
