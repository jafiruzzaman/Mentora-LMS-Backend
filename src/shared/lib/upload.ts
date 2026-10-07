/**
 * @file upload.ts
 * @description upload files on cloudinary
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October
 */

import { cloudinary } from "@/config/cloudinary";

const uploadFileOnCloudinary = async ({
  buffer,
  folder,
  resource_type = "auto",
}: {
  buffer: Buffer;
  folder: string;
  resource_type?: "image" | "video" | "raw" | "auto";
}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        type: "upload",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

const deleteFileFromCloudinary = async ({
  public_id,
  resource_type = "video",
}: {
  public_id: string;
  resource_type?: "image" | "video" | "raw";
}) => {
  const result = await cloudinary.uploader.destroy(public_id, {
    resource_type,
    type: "upload",
  });
  return result;
};

export { uploadFileOnCloudinary, deleteFileFromCloudinary };
