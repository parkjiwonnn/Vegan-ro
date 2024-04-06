const express = require('express');
const viewRouter = express.Router();
const path = require('path');
require('dotenv').config(); // .env 파일에서 환경변수 로드

viewRouter.get('/', servestatic('login'));

function servestatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = {
    index: `${resource.includes('admin') ? resource.split('/')[1] : resource}.html`,
  };
  return express.static(resourcePath, option);
}
module.exports = viewRouter;
