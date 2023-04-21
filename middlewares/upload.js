const multer = require("multer");

function upload(type) {
  const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
      const unique = `${Date.now()}-${Math.random() + 1e9}`;

      const ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );

      cb(null, `upload-${unique + ext}`);
    },
  });

  return multer({
    storage: fileStorage,

    fileFilter: function (req, file, cb) {
      if (
        type === "image" &&
        (file.mimetype === "image/jpeg" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/png")
      ) {
        cb(null, true);
      } else {
        cb(new Error("invalid file type"));
      }
    },
  });
}

module.exports = {
  upload,
};
