const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const multer_decode = function () {
  return upload.any();
};

module.exports = multer_decode;
