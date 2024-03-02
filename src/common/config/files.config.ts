import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { memoryStorage } from "multer";

export const filesConfig: MulterOptions = {
    storage: memoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
}