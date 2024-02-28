import { Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Base {
    @ObjectIdColumn()
    _id: ObjectId;
}