const bookmarkRepository = require('./bookmark-repository');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');

const bookmarkService = {
    // 북마크 전체 조회 (유저)
    async getBookmarksByUserId(userId, pageNumber, pageSize) {
        const bookmarks = await bookmarkRepository.getBookmarksByUserId(userId, pageNumber, pageSize);
        if (bookmarks.length === 0) {
            throw new AppError(
              commonErrors.resourceNotFoundError,
              '해당 조건을 만족하는 북마크가 존재하지 않습니다',
              400,
            );
          }
          return bookmarks;
        },
    
    // 북마크 추가 (유저) 
      async createBookmark({user_id,place_id}) {
        const existingBookmark = await bookmarkRepository.getBookmarkByUserIdAndPlaceId({ user_id, place_id });

        if (existingBookmark) {
            throw new AppError(
                commonErrors.objectCreationError,
                '이미 북마크한 장소입니다.',
                400,
            );
        }
          const newBookmark = await bookmarkRepository.createBookmark({user_id,place_id });
        if (newBookmark === null) {
          throw new AppError(
            commonErrors.objectCreationError,
            '북마크 등록에 실패하였습니다.',
            400,
          );
        }
        return { message: '정상적으로 등록되었습니다.', newBookmark };
      },
    
     // 북마크 삭제 (유저)
      async deleteBookmark(id) {
         const deletedBookmark = await bookmarkRepository.deleteBookmark(id);
         if (!deletedBookmark) {
            throw new AppError(
              commonErrors.resourceNotFoundError,
              '해당 북마크가 존재하지 않습니다',
              404,
            );
          }
      
          return { message: '북마크정보가 성공적으로 삭제되었습니다.', deletedBookmark };
        },
    
    // 북마크 많은 순으로 정렬(장소)
    async getMostBookmarkedPlaces() {
        const mostBookmarkedPlaces = await bookmarkRepository.getMostBookmarkedPlaces();
        
        if (mostBookmarkedPlaces.length === 0) {
            throw new AppError(
                commonErrors.resourceNotFoundError,
                '해당 조건을 만족하는 장소가 존재하지 않습니다',
                400,
            );
        }
        
        return mostBookmarkedPlaces;
    },
};
    
      
module.exports = bookmarkService;