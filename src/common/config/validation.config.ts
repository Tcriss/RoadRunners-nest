import { ValidationPipeOptions } from "@nestjs/common";

export const validationConfig: ValidationPipeOptions = {
    skipMissingProperties: true,
    enableDebugMessages: true,
    whitelist: true,
    transformOptions: {
        enableImplicitConversion: true
    }
};