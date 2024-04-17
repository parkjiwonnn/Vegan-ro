const bookmarkService = require('./bookmark-service');
const responseFormat = require('../errors/responseFormat');

const bookmarkController = {
  // 북마크 전체 조회 (유저)
  async getBookmarksByUserId(req, res, next) {
    try {
      const { pageNumber, pageSize } = req.query;
      const bookmarks = await bookmarkService.getBookmarksByUserId(
        req.user.userId,
        pageNumber,
        pageSize,
      );
      res.json(responseFormat.buildResponse(bookmarks));
    } catch (error) {
      next(error);
    }
  },

  // 북마크 추가 (유저)
  async postBookmark(req, res, next) {
    try {
      const { placeId } = req.body;
      const newBookmark = await bookmarkService.createBookmark({
        placeId,
        userId: req.user.userId,
      });
      res.json(responseFormat.buildResponse(newBookmark));
    } catch (error) {
      next(error);
    }
  },

  // 북마크 삭제 (유저)
  async deleteBookmark(req, res, next) {
    try {
      const { bookmarkId } = req.params;
      const deletedBookmark = await bookmarkService.deleteBookmark(bookmarkId);
      res.json(responseFormat.buildResponse(deletedBookmark));
    } catch (error) {
      next(error);
    }
  },

  // 북마크 많은 순으로 정렬(장소)
  async getMostBookmarkedPlaces(req, res, next) {
    try {
      const mostBookmarkedPlaces =
        await bookmarkService.getMostBookmarkedPlaces();
      res.json(responseFormat.buildResponse(mostBookmarkedPlaces));
    } catch (error) {
      next(error);
    }
  },

  // 북마크 확인
  async getBookmark(req, res, next) {
    try {
      const { placeId } = req.query;
      const userId = req.user.userId;
      const { bookmarkId, isBookmarked } = await bookmarkService.getBookmark(
        userId,
        placeId,
      );
      res.json(responseFormat.buildResponse({ bookmarkId, isBookmarked }));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bookmarkController;
