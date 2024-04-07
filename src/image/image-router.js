const express = require('express');
const imageRouter = express.Router();
const imageService = require('./image-service');
const Image = require('./image-schema');

// 전체 이미지 조회
imageRouter.get(
  '/',
  async (req, res, next) => {
    try {
      const images = await imageService.getAll();
      res.status(200).json({
        status: 200,
        message: '전체 이미지 목록 조회 성공',
        data: images,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = imageRouter;
