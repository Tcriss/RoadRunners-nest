import { Column } from "typeorm";
import { Base } from "src/common/entities/base.entity";
import { IImage } from "src/common/interfaces";

export class Image extends Base implements IImage {
    @Column()
    data: Buffer;

    @Column()
    contentType: string;
}