import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

import { IVehicle } from "src/common/interfaces";
import { Seller } from ".";

@Entity('vehicles')
export class Vehicle implements IVehicle {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    portrait: string;

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

    @Column()
    images: string[];
}