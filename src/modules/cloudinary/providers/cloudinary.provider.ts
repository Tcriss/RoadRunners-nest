import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider: Provider = {
    provide: 'CLOUDINARY',
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        return cloudinary.config({
            cloud_name: config.get('CLOUD'),
            api_key: config.get('KEY'),
            api_secret: config.get('SECRET')
        });
    }
}