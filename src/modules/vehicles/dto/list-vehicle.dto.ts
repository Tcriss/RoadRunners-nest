import { IImage, ISeller } from "src/common/interfaces"

export class ListVehiclesDto {
    portrait: IImage;
    owner: string;
    location: string;
    brand: string;
    type: string;
    model: string;
    condition: string;
    fuel: string;
    year: string;
    price: number;
    seller: ISeller;
}