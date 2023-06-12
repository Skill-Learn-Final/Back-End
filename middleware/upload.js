const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, "./videos/");
    } else {
      cb(null, "./public/uploads/");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "coursePoster" || file.fieldname === "thumbnail") {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "png" ||
      file.mimetype.split("/")[1] === "jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
  } else if (file.fieldname === "video") {
    if (file.mimetype.split("/")[1] === "mp4") {
      cb(null, true);
    } else {
      cb(new Error("Video uploaded is not of type mp4"), false);
    }
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
