const express = require('express');
const imageRouter = express.Router();
const imageController = require('../image/image-controller');
const userMiddleware = require('../user/user-middleware');


//admin 경로에 미들웨어 적용
imageRouter.use('/admin', userMiddleware.isAuthenticated, userMiddleware.isAdmin);

// 이미지 추가
imageRouter.post('/admin', imageController.postImage);

// 이미지 수정
imageRouter.put('/admin/images/:imageId', imageController.putImage);

// 이미지 삭제
imageRouter.delete('/admin/images/:imageId', imageController.deleteImage);

// 이미지 전체 조회
imageRouter.get('/admin/images', imageController.getImages);




module.exports = imageRouter;
