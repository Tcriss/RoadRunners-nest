import { Column } from "typeorm";
import { Base } from "src/common/entities/base.entity";
import { ISeller } from "src/common/interfaces";

export class Seller extends Base implements ISeller {
    @Column()
    picture: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    whatsapp?: string;

    @Column({nullable: true})
    telegram?: string;
}