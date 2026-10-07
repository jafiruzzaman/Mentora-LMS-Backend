/**
 * @file multer.middleware.ts
 * @description multer middleware
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October
 */

import multer from "multer";

const storage = multer.memoryStorage();

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const allowedVideoTypes = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.fieldname === "video") {
      if (!allowedVideoTypes.has(file.mimetype)) {
        callback(
          new Error("Invalid video format. Only MP4, WebM and MOV are allowed.")
        );
        return;
      }
    }
    if (file.fieldname === "thumbnail") {
      if (!allowedImageTypes.has(file.mimetype)) {
        callback(
          new Error(
            "Invalid thumbnail format. Only JPEG, PNG and WebP are allowed."
          )
        );
        return;
      }
      callback(null, true);
      return;
    }
    callback(new Error(`Unexpected file field ${file.fieldname}`));
  },
});

export { upload };
