import { Column } from "typeorm";

export class Image {
    @Column()
    id: string;

    @Column()
    url: string;
}