import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadStream, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

import { Image } from 'src/modules/vehicles/entities/image.entity';

@Injectable()
export class CloudinaryService {

    public async uploadFiles(files: Express.Multer.File[]): Promise<Image[]> {
        if (!files) throw new BadRequestException('Images are required');

        const uploadPromises: Promise<Image>[] = files.map(file => {
            return new Promise<Image>((resolve, reject) => {
                const uploadStream: UploadStream = cloudinary.uploader.upload_stream((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        const image: Image = {
                            id: res.public_id,
                            url: res.url
                        };
                        
                        resolve(image);
                    }
                });

                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        });

        return await Promise.all(uploadPromises);
    }

    public async deleteFile(imageId: string): Promise<void> {
        cloudinary.uploader.destroy(imageId).then()
    }
}
