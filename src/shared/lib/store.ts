/**
 * @file store.ts
 * @description file upload configuration
 * @author Mohammad-Jafiruzzaman
 * @date 7th October 2026
 */

import { env } from "@/config/env";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const storage = new S3Client({
  region: env.AWS_REGION,
  endpoint: env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const uploadFileToStorage = async ({
  buffer,
  content_type,
  key,
}: {
  buffer: Buffer;
  key: string;
  content_type: string;
}) => {
  await storage.send(
    new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: content_type,
    })
  );
  return { key };
};

const deleteFileFromStorage = async (key: string) => {
  await storage.send(
    new DeleteObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
    })
  );
};

const getSignedUrlFromStorage = async ({
  key,
  expires_in,
}: {
  key: string;
  expires_in?: number;
}) => {
  const command = new GetObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: key,
  });
  const signedUrl = await getSignedUrl(storage, command, {
    expiresIn: expires_in,
  });
  return signedUrl;
};

export { uploadFileToStorage, deleteFileFromStorage, getSignedUrlFromStorage };
