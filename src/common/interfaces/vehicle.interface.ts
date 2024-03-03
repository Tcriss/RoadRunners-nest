import { IImage, ISeller } from "./";

export interface IVehicle {
    portrait: IImage,
    owner: string,
    location: string,
    brand: string,
    type: string,
    model: string,
    condition: string,
    fuel: string,
    year: string,
    price: number,
    seller: ISeller,
    images: IImage[]
}