const Image = require('./image-schema');

class ImageService {
  constructor() {}

  // 전체 이미지 조회
  async getAll() {
    return await Image.find({});
  }
}

module.exports = new ImageService();
