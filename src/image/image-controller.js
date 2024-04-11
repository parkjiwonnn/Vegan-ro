const imageService = require('./image-service');
const responseFormat = require('../errors/responseFormat');


const imageController = {

// 이미지 추가
  async postImage(req, res, next) {
    try {
        const { name, url } = req.body;
        const newImage = await imageService.createImage({ name, url });
      res.json(responseFormat.buildResponse(newImage));
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
      res.json(responseFormat.buildResponse(updatedImage));
    } catch (error) {
      next(error);
    }
  },

 // 이미지 삭제
  async deleteImage(req, res, next) {
    try {
      const { imageId } = req.params;
      const deletedImage = await imageService.deleteImage(imageId);
      res.json(responseFormat.buildResponse(deletedImage));
    } catch (error) {
      next(error);
    }
  },
  // 이미지 전체 조회
async getImages(req, res, next) {
    try {
      const { name } = req.query;

        let images;
        if (name) {
            // 이름을 기반으로 이미지를 조회
            images = await imageService.getImageByName(name);
        } else {
            // 전체 이미지 조회
            images = await imageService.getImages(req.query);
        }

      res.json(responseFormat.buildResponse(images));
    } catch (error) {
      next(error);
    }
  },
    // 이미지 id로 조회
async getImageById(req, res, next) {
  try {
    const { imageId } = req.params;
    const imageinfo = await imageService.getImageById(imageId);
    res.json(responseFormat.buildResponse(imageinfo));
  } catch (error) {
    next(error);
  }
  },
  //  이름으로 이미지 조회
async getImageByName(req, res, next) {
  try {
    const { name } = req.query;
    const imageinfo1 = await imageService.getImageByName(name);
    res.json(responseFormat.buildResponse(imageinfo1));
  } catch (error) {
    next(error);
  }
}





};

  
module.exports = imageController;