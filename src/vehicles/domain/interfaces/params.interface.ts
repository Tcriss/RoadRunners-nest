import { IFilter } from "./filter.interface";

export interface IParams extends Partial<IFilter> {
    page: number;
    limit?: number;
}