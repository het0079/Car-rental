const multer = require("multer");
const path = require("path");

// Tell multer where and how to store files
const storage = multer.diskStorage({
  destination: "uploads/",    // folder where images will be saved
  filename: (req, file, cb) => {
    // give file a unique name using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// create upload middleware
const upload = multer({ storage });

module.exports = upload;
