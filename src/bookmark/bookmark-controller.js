const bookmarkService = require('./bookmark-service');
const errors = require('../errors/responseFormat');

const bookmarkController = {
// 북마크 전체 조회 (유저)
async getBookmarksByUserId(req, res, next) {
    try {
      const user_id = req.user.id;
      const bookmarks = await bookmarkService.getBookmarksByUserId(user_id);
      res.json(errors.buildResponse(bookmarks));
    } catch (error) {
      next(error);
    }
  },

// 북마크 추가 (유저)
  async postBookmark(req, res, next) {
    try {
     const { user_id,place_id } = req.body;
      const newBookmark = await bookmarkService.createBookmark({user_id,place_id});
      res.json(errors.buildResponse(newBookmark));
    } catch (error) {
      next(error);
    }
  },

 // 북마크 삭제 (유저)
  async deleteBookmark(req, res, next) {
    try {
      const { bookmarkId } = req.params;
      const deletedBookmark = await bookmarkService.deleteBookmark(bookmarkId);
      res.json(errors.buildResponse(deletedBookmark));
    } catch (error) {
      next(error);
    }
  },

// 북마크 많은 순으로 정렬(장소)
  async getMostBookmarkedPlaces(req, res, next) {
    try {
        const mostBookmarkedPlaces = await bookmarkService.getMostBookmarkedPlaces();
      res.json(errors.buildResponse(mostBookmarkedPlaces));
    } catch (error) {
      next(error);
    }
  },
};

  
module.exports = bookmarkController;