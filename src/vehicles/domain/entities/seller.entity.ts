import { Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

import { ISeller } from "../interfaces";

export class Seller implements ISeller {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    picture: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    whatsapp?: string;

    @Column({nullable: true})
    telegram?: string;
}