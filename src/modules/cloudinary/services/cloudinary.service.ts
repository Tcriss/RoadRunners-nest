import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadStream, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

import { CloudinaryResponse } from 'src/common/types/cloudinary.type';

@Injectable()
export class CloudinaryService {

    constructor() {}

    public async uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse> {
        if (!files) throw new BadRequestException('Images are required');

        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream: UploadStream = cloudinary.uploader.upload_stream((err, res) => {
                if (err) return reject(err);

                resolve(res);
            });

            for (let i: number = 0; files.length > i; i++) {
                streamifier.createReadStream(files[i].buffer).pipe(uploadStream);
            }
        });
    }

    public async findAllFiles() {}
}
