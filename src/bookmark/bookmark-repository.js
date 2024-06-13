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
            model: 'Image',
          },
        });

      const totalCount = await Bookmark.countDocuments({ user_id: userId });
      return { bookmarks, totalCount };
    } catch (error) {
      throw new Error(error);
    }
  }

  // 북마크 추가 (유저)
  async createBookmark({ userId, placeId }) {
    try {
      const newbookmark = await Bookmark.create({
        user_id: userId,
        place_id: placeId,
      });
      await newbookmark.save();
      return newbookmark.toObject();
    } catch (error) {
      throw new Error(error); // 에러 처리
    }
  }

  // 북마크 추가시 중복 불가
  async getBookmarkByUserIdAndPlaceId({ userId, placeId }) {
    try {
      const bookmark = await Bookmark.findOne({
        user_id: userId,
        place_id: placeId,
      });
      if (bookmark === null) {
        return bookmark;
      }
      return bookmark._id.toString();
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
            as: 'place_info',
          },
        },
      ]);

      return mostBookmarkedPlaces;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new BookmarkRepository();
