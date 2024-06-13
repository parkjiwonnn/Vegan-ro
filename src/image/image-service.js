const imageRepository = require('./image-repository.js');
const AppError = require('../errors/AppError.js');
const commonErrors = require('../errors/commonErrors.js');

const ImageService = {
  // 이미지 추가
  async createImage({ name, url }) {
    const newImage = await imageRepository.createImage({ name, url });
    if (newImage === null) {
      throw new AppError(
        commonErrors.objectCreationError,
        '이미지 등록에 실패하였습니다.',
        400,
      );
    }
    return { message: '정상적으로 등록되었습니다.', newImage };
  },

  // 이미지 수정
  async updateImage(imageId, image) {
    const updatedImage = await imageRepository.updateImage(imageId, image);

    if (updatedImage === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 id를 갖는 이미지가 없습니다.',
        400,
      );
    }
    return { message: '정상적으로 수정되었습니다.', updatedImage };
  },
  // 이미지 삭제
  async deleteImage(id) {
    const deletedImage = await imageRepository.deleteImage(id);
    if (!deletedImage) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 이미지가 존재하지 않습니다',
        404,
      );
    }

    return { message: '이미지가 성공적으로 삭제되었습니다.', deletedImage };
  },
  // 이미지 전체 조회
  async getImages() {
    const images = await imageRepository.getImages();
    if (!images.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '이미지가 존재하지 않습니다',
        400,
      );
    }
    return images;
  },

  //이미지 id로 조회
  async getImageById(id) {
    const imageinfo = await imageRepository.getImageById(id);
    if (!imageinfo) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '이미지를 찾을 수 없습니다.',
        404,
      );
    }
    return imageinfo;
  },
  // 이름으로 이미지 조회
  async getImageByName(name) {
    const imageinfo1 = await imageRepository.getImageByName(name);
    if (!imageinfo1) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 이미지가 존재하지 않습니다',
        404,
      );
    }
    return imageinfo1;
  },
};

module.exports = ImageService;
