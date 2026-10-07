/**
 * @file cloudinary.ts
 * @description cloudinary config
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October
 */

import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
