const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createUpload(folderName) {
  const uploadPath = path.join(__dirname, '../uploads', folderName);

  // Ensure directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueName = folderName + '-' + Date.now() + path.extname(file.originalname);
      cb(null, uniqueName);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed!'));
  };

  return multer({ storage, fileFilter });
}

module.exports = createUpload;
