const express = require('express');
const imageRouter = express.Router();
const imageController = require('../image/image-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validationMiddleware = require('../middleware/validation-middleware');

//admin 경로에 미들웨어 적용
imageRouter.use(
  '/admin',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
);

// 이미지 추가
imageRouter.post(
  '/admin',
  validationMiddleware.validateRequest,
  imageController.postImage,
);

// 이미지 수정
imageRouter.put(
  '/admin/images/:imageId',
  validationMiddleware.validateRequest,
  imageController.putImage,
);

// 이미지 삭제
imageRouter.delete('/admin/images/:imageId', imageController.deleteImage);

// 이미지 전체 조회(이름 쿼리)
imageRouter.get('/admin/images', imageController.getImages);

// 이미지 id로 조회
imageRouter.get('/admin/images/:imageId', imageController.getImageById);

module.exports = imageRouter;
