import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";

export const imageValidations = new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
        new FileTypeValidator({fileType: '.(png|jpg|jpeg)'}),
    ]
});