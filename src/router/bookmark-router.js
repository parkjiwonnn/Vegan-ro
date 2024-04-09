const express = require("express");
const bookmarkRouter = express.Router();
const bookmarkController = require('../bookmark/bookmark-controller');
const userMiddleware = require('../middleware/user-middleware');


// 북마크 전체 조회 (유저)
bookmarkRouter.get('/bookmarks/users',userMiddleware.isAuthenticated, bookmarkController.getBookmarksByUserId);

// 북마크 추가 (유저)
bookmarkRouter.post('/bookmarks',userMiddleware.isAuthenticated, bookmarkController.postBookmark);

// 북마크 삭제 (유저)
bookmarkRouter.delete('/bookmarks/:bookmarkId',userMiddleware.isAuthenticated, bookmarkController.deleteBookmark);

// 북마크 많은 순으로 정렬(장소)
bookmarkRouter.get('/bookmarks', bookmarkController.getMostBookmarkedPlaces);


module.exports = bookmarkRouter;