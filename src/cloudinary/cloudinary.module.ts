import { Module } from '@nestjs/common';

import { CloudinaryService } from './application/services/cloudinary.service';
import { CloudinaryProvider } from './application/providers/cloudinary.provider';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService]
})
export class CloudinaryModule {}
