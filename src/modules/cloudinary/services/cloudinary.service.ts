import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadStream, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

import { CloudinaryResponse } from 'src/common/types/cloudinary.type';

@Injectable()
export class CloudinaryService {

    constructor() { }

    public async uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
        if (!files) throw new BadRequestException('Images are required');

        const uploadPromises: Promise<CloudinaryResponse>[] = files.map((file) => {
            return new Promise<CloudinaryResponse>((resolve, reject) => {
                const uploadStream: UploadStream = cloudinary.uploader.upload_stream((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });

                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        });

        return await Promise.all(uploadPromises);
    }

    public async findAllFiles() { }

    public async deleteFile() { }
}
