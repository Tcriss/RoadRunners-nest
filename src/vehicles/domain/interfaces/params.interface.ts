import { IFilter } from "./filter.interface";

export interface IParams extends IFilter {
    page: number;
    limit?: number;
}