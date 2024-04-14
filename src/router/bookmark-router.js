const express = require('express');
const bookmarkRouter = express.Router();
const bookmarkController = require('../bookmark/bookmark-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validationMiddleware = require('../middleware/validation-middleware');

// 북마크 전체 조회 (유저)
bookmarkRouter.get(
  '/bookmarks/me',
  authMiddleware.isAuthenticated,
  bookmarkController.getBookmarksByUserId,
);

// 북마크 추가 (유저)
bookmarkRouter.post(
  '/bookmarks',
  authMiddleware.isAuthenticated,
  validationMiddleware.validateRequest,
  bookmarkController.postBookmark,
);

// 북마크 삭제 (유저)
bookmarkRouter.delete(
  '/bookmarks/:bookmarkId',
  authMiddleware.isAuthenticated,
  bookmarkController.deleteBookmark,
);

// 북마크 많은 순으로 정렬(장소)
bookmarkRouter.get('/bookmarks', bookmarkController.getMostBookmarkedPlaces);

// 북마크 확인 GET /bookmarks/check?placeId=value
bookmarkRouter.get(
  '/bookmarks/check',
  authMiddleware.isAuthenticated,
  bookmarkController.getBookmark,
);

module.exports = bookmarkRouter;
