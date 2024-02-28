import { Column, Entity } from "typeorm";
import { Base } from "src/common/entities/base.entity";
import { IVehicle } from "src/common/interfaces";
import { Image, Seller } from ".";

@Entity('vehicles')
export class Vehicle extends Base implements IVehicle {
    @Column((type) => Image)
    portrait: Image;

    @Column()
    owner: string;

    @Column()
    location: string;

    @Column()
    brand: string;

    @Column()
    type: string;

    @Column()
    model: string;

    @Column()
    condition: string;

    @Column()
    fuel: string;

    @Column()
    year: string;

    @Column()
    price: number;

    @Column((type) => Seller)
    seller: Seller;

    @Column((type) => Image)
    images: Image[];
}