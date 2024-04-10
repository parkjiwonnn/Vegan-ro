const Image = require('./image-schema');

const imageRepository = {

// 이미지 추가
async createImage({ name, url }) {
    const newImage = new Image({
      name,
      url,
    });
    await newImage.save();
    return newImage.toObject();
  },

  // 이미지 수정
  async updateImage(id, image) {
    const updatedImage = await Image.findByIdAndUpdate(id, image, { new: true });
    return updatedImage;
  },

  // 이미지 삭제
  async deleteImage(id) {
    const deletedImage = await Image.findByIdAndDelete(id).lean();
    return deletedImage;
  },

  // 전체 이미지 조회
  async getImages() {
    const images = await Image.find({}).lean();
    return images;
  },

  //이미지 id로 조회
  async getImageById(id) {
    const imageinfo = await Image.findById(id).lean();
    return imageinfo;
},
//이름으로 이미지 조회
async getImageByName(name) {
  const imageinfo1 = await Image.findOne({ name: name });
  return imageinfo1;
}
};




module.exports = imageRepository;
