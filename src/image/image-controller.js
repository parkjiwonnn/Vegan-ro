const imageService = require('./image-service');
const errors = require('../errors/responseFormat');


const imageController = {

// 이미지 추가
  async postImage(req, res, next) {
    try {
        const { name, url } = req.body;
        const newImage = await imageService.createImage({ name, url });
      res.json(errors.buildResponse(newImage));
    } catch (error) {
      next(error);
    }
  },
  // 이미지 수정
  async putImage(req, res, next) {
    try {
        const { imageId } = req.params;
        const image = req.body;
        const updatedImage = await imageService.updateImage(imageId, image);
      res.json(errors.buildResponse(updatedImage));
    } catch (error) {
      next(error);
    }
  },

 // 이미지 삭제
  async deleteImage(req, res, next) {
    try {
      const { imageId } = req.params;
      const deletedImage = await imageService.deleteImage(imageId);
      res.json(errors.buildResponse(deletedImage));
    } catch (error) {
      next(error);
    }
  },
  // 이미지 전체 조회
async getImages(req, res, next) {
    try {
      const images = await imageService.getImages();
      res.json(errors.buildResponse(images));
    } catch (error) {
      next(error);
    }
  },
    // 이미지 id로 조회
async getImageById(req, res, next) {
  try {
    const { imageId } = req.params;
    const imageinfo = await imageService.getImageById(imageId);
    res.json(errors.buildResponse(imageinfo));
  } catch (error) {
    next(error);
  }
  },





};

  
module.exports = imageController;