import { ValidationPipeOptions } from "@nestjs/common";

export const validationConfig: ValidationPipeOptions = {
    enableDebugMessages: true,
    whitelist: true,
    transformOptions: {
        enableImplicitConversion: true
    }
};