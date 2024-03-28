import { Column } from "typeorm";

import { IImage } from "../interfaces";

export class Image implements IImage {
    @Column()
    id: string;

    @Column()
    url: string;
}