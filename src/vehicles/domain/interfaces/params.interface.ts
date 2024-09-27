import { IFilter } from "./filter.interface";

export interface IParams extends IFilter {
    take: number;
    skip: number;
}