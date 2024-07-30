import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

interface FileUploadOptions {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

@Injectable()
export class FileUploadService {
  constructor({ cloudName, apiKey, apiSecret }: FileUploadOptions) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadFile(urlFile: string, folder: string) {
    const result = await cloudinary.uploader.upload(urlFile, { folder });

    return result;
  }
}
